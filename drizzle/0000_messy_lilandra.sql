-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `analytics` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`picked` tinyint NOT NULL,
	CONSTRAINT `analytics_id` PRIMARY KEY(`id`),
	CONSTRAINT `analytics_id_key` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorite` (
	`id` int unsigned NOT NULL,
	`user` varchar(191) NOT NULL,
	CONSTRAINT `favorite_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `food` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`image` varchar(1000) NOT NULL DEFAULT '',
	`cheeseometer` int unsigned NOT NULL,
	`deliverable` tinyint NOT NULL,
	`tags` varchar(191),
	`effort` int unsigned NOT NULL,
	CONSTRAINT `food_id` PRIMARY KEY(`id`),
	CONSTRAINT `food_id_key` UNIQUE(`id`),
	CONSTRAINT `food_name_key` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE INDEX `user` ON `favorite` (`user`);
*/