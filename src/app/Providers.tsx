"use client"

import { NavbarProvider } from "~/hooks/useNavbar"

export default function Providers({ children }: Children) {
  return <NavbarProvider>{children}</NavbarProvider>
}
