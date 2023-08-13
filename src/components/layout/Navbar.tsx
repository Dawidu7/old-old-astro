"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx"
import ResizeObserver from "resize-observer-polyfill"
import { Button, Link } from ".."
import { useNavbar } from "~/hooks"

export default function Navbar({
  isAuthenticated,
}: {
  isAuthenticated: boolean
}) {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)
  const [isOpen, setOpen] = useState(false)
  const { setVisible } = useNavbar()

  useEffect(() => {
    const nav = ref.current

    if (!nav) return

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    })

    const resizeObserber = new ResizeObserver(() => {
      if (nav.clientWidth >= 768) {
        setOpen(false)
      }
    })

    intersectionObserver.observe(nav)
    resizeObserber.observe(nav)

    return () => {
      intersectionObserver.disconnect()
      resizeObserber.disconnect()
    }
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const links = [
    { route: "/calculator", text: "Calculator" },
    { route: "/generator", text: "Generator" },
    { route: "/planner", text: "Planner" },
    { route: isAuthenticated ? "/dashboard" : "/login", text: "Admin" },
    isAuthenticated ? { route: "/logout", text: "Logout" } : null,
  ]

  function List() {
    return links.map(
      link =>
        link && (
          <li key={link.route}>
            <Link
              className={
                pathname.startsWith(link.route)
                  ? "font-semibold text-white"
                  : undefined
              }
              href={link.route}
            >
              {link.text}
            </Link>
          </li>
        ),
    )
  }

  return (
    <nav
      className="flex items-center justify-between bg-zinc-900 p-4 shadow-md shadow-black"
      ref={ref}
    >
      <Link href="/" className="text-2xl font-semibold text-white">
        Astrophotography by Patryk Tomalik
      </Link>
      <Button
        className="text-3xl text-zinc-400 data-[hovered]:text-white md:hidden"
        onPress={() => setOpen(true)}
        plain
      >
        <RxHamburgerMenu />
      </Button>
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-black/80 transition-opacity duration-200",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <ul
        className={clsx(
          "fixed right-0 top-0 z-30 h-full space-y-4 bg-zinc-800 pl-20 pr-8 pt-6 text-right text-3xl transition duration-300 ease-in-out md:hidden",
          !isOpen && "translate-x-full",
        )}
      >
        <Button
          className="text-zinc-400 data-[hovered]:text-white md:hidden"
          onPress={() => setOpen(false)}
          plain
        >
          <RxCross1 />
        </Button>
        <List />
      </ul>
      <ul className="hidden gap-2 text-base md:flex">
        <List />
      </ul>
    </nav>
  )
}
