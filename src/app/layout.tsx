import type { Metadata } from "next"
import "~/globals.css"

export const metadata: Metadata = {
  title: "Astrophotography by Patryk Tomalik",
}

export default function RootLayout({ children }: Children) {
  return (
    <html>
      <body className="bg-zinc-800 text-lg text-white">
        <main>{children}</main>
      </body>
    </html>
  )
}
