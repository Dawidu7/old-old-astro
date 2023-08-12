import { compare } from "bcrypt"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "~/db"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) return null

        const admin = await db.query.admin.findFirst()

        if (!admin) return null

        const isPasswordValid = await compare(
          credentials.password,
          admin.password,
        )

        if (!isPasswordValid) return null

        return { id: admin.id.toString() }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
