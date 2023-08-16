import {
  int,
  float,
  mysqlEnum,
  mysqlTable,
  serial,
  unique,
  varchar,
} from "drizzle-orm/mysql-core"

export const admin = mysqlTable("admin", {
  id: serial("id").primaryKey(),
  password: varchar("password", { length: 60 }).notNull(),
})

export const camera = mysqlTable("camera", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  resolutionX: int("resolutionX").notNull(),
  resolutionY: int("resolutionX").notNull(),
  matrixX: float("matrixX").notNull(),
  matrixY: float("matrixY").notNull(),
  pixelSize: float("pixelSize").notNull(),
})

export const catalog = mysqlTable("catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 32 }).notNull().unique(),
  value: varchar("value", { length: 8 }).notNull().unique(),
})

export const flattReduc = mysqlTable("flattReduc", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  times: float("times").notNull(),
})

export const option = mysqlTable(
  "option",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    type: mysqlEnum("enum", [
      "angle",
      "camera",
      "catalog",
      "constellation",
      "filter",
      "telescope",
    ]),
  },
  t => ({
    unq: unique("option_name_type").on(t.name, t.type),
  }),
)

export const telescope = mysqlTable("telescope", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  focalLength: int("focalLength"),
  diameter: int("diameter"),
  focalRatio: float("focalRatio"),
})
