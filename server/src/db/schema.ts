import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status_enum", ["incomplete", "complete"]);

export const taskTable = table("tasks", {
  id: t.uuid().defaultRandom().primaryKey(), 
  title: t.text().notNull(), 
  status: statusEnum().default("incomplete"), 
  description: t.text().notNull(), 
})