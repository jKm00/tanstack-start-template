import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../db/lib/schema";

export const todo = pgTable("todo", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").default(""),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
