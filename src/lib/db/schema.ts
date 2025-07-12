import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
	id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
	emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
	image: text("image"),
	createdAt: text("createdAt").notNull().default(`(CURRENT_TIMESTAMP)`),
	updatedAt: text("updatedAt").notNull().default(`(CURRENT_TIMESTAMP)`),
});

export const sessions = sqliteTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => users.id),
	token: text("token").notNull().unique(),
	expiresAt: text("expiresAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	createdAt: text("createdAt").notNull().default(`(CURRENT_TIMESTAMP)`),
	updatedAt: text("updatedAt").notNull().default(`(CURRENT_TIMESTAMP)`),
})

export const accounts = sqliteTable("account", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => users.id),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	accessTokenExpiresAt: text("accessTokenExpiresAt").default(`(CURRENT_TIMESTAMP)`),
	refreshTokenExpiresAt: text("refreshTokenExpiresAt").default(`(CURRENT_TIMESTAMP)`),
	scope: text("scope"),
	idToken: text("idToken"),
	password: text("password"),
	createdAt: text("createdAt").notNull().default(`(CURRENT_TIMESTAMP)`),
	updatedAt: text("updatedAt").notNull().default(`(CURRENT_TIMESTAMP)`),
})

export const verifications = sqliteTable("verification", {
	id: text("id").primaryKey().notNull(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: text("expiresAt").notNull(),
	createdAt: text("createdAt").notNull().default(`(CURRENT_TIMESTAMP)`),
	updatedAt: text("updatedAt").notNull().default(`(CURRENT_TIMESTAMP)`),
})