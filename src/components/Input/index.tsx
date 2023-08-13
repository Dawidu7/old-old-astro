"use client"

import clsx from "clsx"
import { forwardRef, useState } from "react"
import type { ComponentProps } from "react"
import { useFocusWithin } from "react-aria"
import { twMerge } from "tailwind-merge"
import type { DOMAttributes, FocusableElement } from "@react-types/shared"
import Number from "./Number"
import Text from "./Text"
import TextArea from "./TextArea"

export type InputPropsProps = {
  isFocused: boolean
  focusWithinProps: DOMAttributes<FocusableElement>
  labelClass: string
  inputClass: string
}

type InputProps = {
  label: React.ReactNode
  className?: string
  groupstyle?: string
} & (
  | ({ type: "number" } & Omit<
      ComponentProps<typeof Number>,
      keyof InputPropsProps
    >)
  | ({ type: "textarea" } & Omit<
      ComponentProps<typeof TextArea>,
      keyof InputPropsProps
    >)
  | Omit<ComponentProps<typeof Text>, keyof InputPropsProps>
)

export default forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input(
    { className, groupstyle, type = "text", ...props },
    forwardedRef,
  ) {
    const [isFocused, setFocus] = useState(false)
    const { focusWithinProps } = useFocusWithin({
      onFocusWithinChange: isFocusWithin => setFocus(isFocusWithin),
    })

    const labelClass = clsx(
      "absolute left-0 top-1 -z-10 -translate-y-5 text-sm transition-all duration-300",
      "peer-data-[focused]:-translate-y-5 peer-data-[focused]:text-sm",
      "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg",
      props.errorMessage
        ? "text-red-600"
        : "text-zinc-400 peer-data-[focused]:text-white",
    )

    const inputClass = twMerge(
      clsx(
        "peer py-0.5 w-full border-b bg-inherit outline-none text-white transition duration-300",
        props.errorMessage
          ? "border-red-600"
          : "border-zinc-400 data-[focused]:border-white",
        className,
      ),
    )

    const Component =
      type === "number" ? Number : type === "textarea" ? TextArea : Text

    return (
      <div className={twMerge(clsx("relative z-10 mt-4 w-full", groupstyle))}>
        <Component
          {...props}
          isFocused={isFocused}
          focusWithinProps={focusWithinProps}
          labelClass={labelClass}
          inputClass={inputClass}
          // @ts-expect-error
          ref={forwardedRef}
          type={type}
        />
      </div>
    )
  },
)
