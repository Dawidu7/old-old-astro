"use client"

import { forwardRef, useRef } from "react"
import { mergeProps, useLocale, useNumberField } from "react-aria"
import type { AriaNumberFieldProps } from "react-aria"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { useNumberFieldState } from "react-stately"
import { Button } from ".."
import { InputPropsProps } from "."
import { mergeRefs } from "~/lib/utils"

type NumberProps = AriaNumberFieldProps & InputPropsProps

export default forwardRef<HTMLInputElement, NumberProps>(function Number(
  { isFocused, focusWithinProps, labelClass, inputClass, ...props },
  forwardedRef,
) {
  const { errorMessage, label } = props
  const ref = useRef<HTMLInputElement>(null)
  const { locale } = useLocale()
  const state = useNumberFieldState({ ...props, locale })
  const {
    decrementButtonProps,
    errorMessageProps,
    groupProps,
    incrementButtonProps,
    inputProps,
    labelProps,
  } = useNumberField({ ...props, placeholder: " " }, state, ref)

  return (
    <div className="relative" {...groupProps}>
      <input
        className={inputClass}
        data-focused={isFocused || undefined}
        ref={mergeRefs(forwardedRef, ref)}
        {...mergeProps(focusWithinProps, inputProps)}
      />
      <div className="absolute right-0 top-1 flex flex-col">
        <Button
          className="text-sm text-zinc-400 data-[hovered]:text-white"
          plain
          {...incrementButtonProps}
        >
          <AiFillCaretUp />
        </Button>
        <Button
          className="text-sm text-zinc-400 data-[hovered]:text-white"
          plain
          {...decrementButtonProps}
        >
          <AiFillCaretDown />
        </Button>
      </div>
      <label className={labelClass} {...labelProps}>
        {label}
      </label>
      {errorMessage && (
        <p className="text-sm text-red-500" {...errorMessageProps}>
          {errorMessage}
        </p>
      )}
    </div>
  )
})
