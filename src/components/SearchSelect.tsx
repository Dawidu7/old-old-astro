"use client"

import clsx from "clsx"
import { useState } from "react"
import type { ComponentProps } from "react"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { twMerge } from "tailwind-merge"
import { Combobox, Transition } from "@headlessui/react"

type SearchSelectProps<T> = ComponentProps<typeof Combobox> & {
  label: React.ReactNode
  options: T[]
  defaultValue?: T
  errorMessage?: React.ReactNode
}

export default function SearchSelect<T extends { id: number; name: string }>({
  defaultValue,
  errorMessage,
  label,
  options,
  ...props
}: SearchSelectProps<T>) {
  const [selected, setSelected] = useState<T | null>(null)
  const [query, setQuery] = useState("")

  const filteredOptions =
    query !== ""
      ? options.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase()),
        )
      : options

  return (
    <div className="relative mt-5">
      <Combobox value={selected} onChange={setSelected} {...props}>
        {({ open }) => (
          <>
            <Combobox.Button className="w-full">
              <Combobox.Input
                className={twMerge(
                  clsx(
                    "ui-focus-visible:text-white peer w-full border-b bg-inherit outline-none transition duration-300",
                    errorMessage
                      ? "border-red-600 text-red-600"
                      : "ui-focus-visible:border-white border-zinc-400",
                  ),
                )}
                displayValue={(option: typeof selected) => option?.name || ""}
                onChange={e => setQuery(e.currentTarget.value)}
                placeholder=" "
              />
              <Combobox.Label
                className={twMerge(
                  clsx(
                    "absolute left-0 -z-10 -translate-y-5 text-sm transition-all duration-300",
                    "peer-focus-visible:-translate-y-5 peer-focus-visible:text-sm",
                    "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg",
                    errorMessage
                      ? "text-red-600"
                      : "text-zinc-400 peer-focus-visible:text-white",
                  ),
                )}
              >
                {label}
              </Combobox.Label>
              <span
                className={twMerge(
                  clsx(
                    "absolute bottom-1 right-0 transition duration-300",
                    open ? "text-white" : "text-zinc-400",
                  ),
                )}
              >
                {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
              </span>
            </Combobox.Button>
            <Transition
              className="relative z-50"
              enter="transition ease-in duration-200"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-1"
              leave="transition ease-out duration-200"
              leaveFrom="opacity-1"
              leaveTo="opacity-0 -translate-y-2"
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-y-scroll rounded bg-stone-800 shadow-md shadow-black outline-none">
                {filteredOptions.map(option => (
                  <Combobox.Option
                    className="ui-selected:bg-stone-900 ui-selected:font-semibold ui-active:bg-stone-900 ui-not-selected:ui-active:cursor-pointer px-1.5"
                    key={option.id}
                    value={option}
                  >
                    {option.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  )
}
