CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`accessTokenExpiresAt` text DEFAULT '(CURRENT_TIMESTAMP)',
	`refreshTokenExpiresAt` text DEFAULT '(CURRENT_TIMESTAMP)',
	`scope` text,
	`idToken` text,
	`password` text,
	`createdAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL,
	`updatedAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`token` text NOT NULL,
	`expiresAt` text NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`createdAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL,
	`updatedAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer NOT NULL,
	`image` text,
	`createdAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL,
	`updatedAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` text NOT NULL,
	`createdAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL,
	`updatedAt` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL
);
