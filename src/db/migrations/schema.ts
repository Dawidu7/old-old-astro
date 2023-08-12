import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, serial, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const admin = mysqlTable("admin", {
	id: serial("id").notNull(),
	password: varchar("password", { length: 60 }),
},
(table) => {
	return {
		adminId: primaryKey(table.id)
	}
});