import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core"

export const admin = mysqlTable("admin", {
  id: serial("id").primaryKey(),
  password: varchar("password", { length: 60 }),
})
