"use client"

import clsx from "clsx"
import { useParams } from "next/navigation"
import { Link } from "~/components"

export default function Tabs() {
  const { app } = useParams()

  return (
    <nav className="min-w-[95px]">
      <ul>
        {["calculator", "generator", "planner"].map(link => (
          <li key={link}>
            <Link
              className={clsx(
                "capitalize transition-all",
                app === link
                  ? "border-l pl-2 font-semibold text-white"
                  : "border-none",
              )}
              href={link === app ? "/dashboard" : `/dashboard/${link}`}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
