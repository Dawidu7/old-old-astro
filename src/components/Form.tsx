"use client"

import clsx from "clsx"
import { Children, cloneElement, isValidElement, useState } from "react"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { object, string, number, minValue, optional, safeParse } from "valibot"
import type { ObjectSchema } from "valibot"

type BaseFormData = {
  [key: string]: string | BaseFormData
}

export default function Form({
  children,
  className,
  ...props
}: ComponentProps<"form">) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { formChildren, schema } = useFormData(children, errors)

  async function action(formData: FormData) {
    const formattedFormData = Array.from(
      formData.entries(),
    ).reduce<BaseFormData>((data, [name, value]) => {
      if (name.startsWith("$ACTION_ID_")) return data

      function getValue() {
        if (/[^0-9.,]/.test(value as string)) return value as string

        const parsedValue = parseFloat((value as string).replace(",", ""))

        return isNaN(parsedValue) ? undefined : parsedValue
      }

      const matches = name.match(/(.+?)\[(.+?)\]/)

      if (!matches) {
        return { ...data, [name]: getValue() }
      }

      return {
        ...data,
        [matches[1]]: {
          // @ts-expect-error
          ...data[matches[1]],
          [matches[2]]: getValue(),
        },
      }
    }, {})

    const result = safeParse(schema, formattedFormData)

    if (!result.success) {
      setErrors(
        result.error.issues.reduce(
          (acc, issue) => ({
            ...acc,
            [issue.path![0].key]: issue.message,
          }),
          {},
        ),
      )
      return
    }

    console.log("SUCCESS")

    setErrors({})
  }

  return (
    <form
      action={action}
      className={twMerge(clsx("flex flex-col gap-4", className))}
      {...props}
    >
      {formChildren}
    </form>
  )
}

function useFormData(
  children: React.ReactNode,
  errors: Record<string, string>,
): {
  formChildren: React.ReactNode
  schema: ObjectSchema<{}>
  objSchema: Record<string, any>
} {
  let schema = {}

  const formChildren = Children.map(children, child => {
    if (!isValidElement || !child) return child

    const props = (child as JSX.Element).props

    if (props.name) {
      if (props.type === "number") {
        // @ts-expect-error
        schema[props.name] = number("Must be a valid number.")
      } else if (props.options) {
        // @ts-expect-error
        schema[props.name] = object(
          Object.entries(props.options[0]).reduce((acc, [key, value]) => {
            if (key === "id") {
              return {
                ...acc,
                [key]: optional(
                  typeof value === "number"
                    ? number("Must be a valid number.")
                    : string("Must be valid text."),
                ),
              }
            }

            return {
              ...acc,
              [key]:
                typeof value === "number"
                  ? number("Must be a valid number.")
                  : string("Must be valid text."),
            }
          }, {}),
        )
      } else {
        // @ts-expect-error
        schema[props.name] = string("Must be valid text.")
      }

      return cloneElement(child as JSX.Element, {
        errorMessage: errors[props.name] || undefined,
      })
    }

    if (props.role === "group") {
      const { formChildren, objSchema } = useFormData(props.children, errors)

      schema = {
        ...schema,
        ...objSchema,
      }

      return cloneElement(child as JSX.Element, { children: formChildren })
    }

    return child
  })

  return { formChildren, schema: object(schema), objSchema: schema }
}
