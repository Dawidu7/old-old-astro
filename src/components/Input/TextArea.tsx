"use client"

import { forwardRef, useRef } from "react"
import { mergeProps, useTextField } from "react-aria"
import type { AriaTextFieldProps } from "react-aria"
import { InputPropsProps } from "."
import { mergeRefs } from "~/lib/utils"

type TextAreaProps = AriaTextFieldProps & InputPropsProps

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { isFocused, focusWithinProps, labelClass, inputClass, ...props },
  forwardedRef,
) {
  const { errorMessage, label } = props
  const ref = useRef<HTMLTextAreaElement>(null)
  const { errorMessageProps, inputProps, labelProps } = useTextField(
    { ...props, placeholder: " ", inputElementType: "textarea" },
    ref,
  )

  return (
    <>
      <textarea
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
