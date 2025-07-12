import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: varchar("ipAddress", { length: 255 }),
  userAgent: varchar("userAgent", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id),
  accountId: varchar("accountId", { length: 255 }).notNull(),
  providerId: varchar("providerId", { length: 255 }).notNull(),
  accessToken: varchar("accessToken", { length: 255 }),
  refreshToken: varchar("refreshToken", { length: 255 }),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: varchar("scope", { length: 255 }),
  idToken: varchar("idToken", { length: 255 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
