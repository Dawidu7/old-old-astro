import type { Config } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config
