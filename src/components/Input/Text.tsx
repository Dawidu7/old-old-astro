"use client"

import { forwardRef, useRef } from "react"
import { mergeProps, useTextField } from "react-aria"
import type { AriaTextFieldProps } from "react-aria"
import type { InputPropsProps } from "."
import { mergeRefs } from "~/lib/utils"

type TextProps = AriaTextFieldProps & InputPropsProps

export default forwardRef<HTMLInputElement, TextProps>(function Text(
  { isFocused, focusWithinProps, labelClass, inputClass, ...props },
  forwardedRef,
) {
  const { errorMessage, label } = props
  const ref = useRef<HTMLInputElement>(null)
  const { errorMessageProps, inputProps, labelProps } = useTextField(
    { ...props, placeholder: " " },
    ref,
  )

  return (
    <>
      <input
        className={inputClass}
        data-focused={isFocused || undefined}
        ref={mergeRefs(forwardedRef, ref)}
        {...mergeProps(focusWithinProps, inputProps)}
      />
      <label className={labelClass} {...labelProps}>
        {label}
      </label>
      {errorMessage && (
        <p className="text-sm text-red-500" {...errorMessageProps}>
          {errorMessage}
        </p>
      )}
    </>
  )
})
