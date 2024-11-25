CREATE TABLE `todo` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`completed` integer DEFAULT false,
	`created` text DEFAULT CURRENT_TIMESTAMP,
	`updated` text DEFAULT CURRENT_TIMESTAMP
);
