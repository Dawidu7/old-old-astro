CREATE TABLE `catalog` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`value` varchar(8) NOT NULL,
	CONSTRAINT `catalog_id` PRIMARY KEY(`id`),
	CONSTRAINT `catalog_name_unique` UNIQUE(`name`),
	CONSTRAINT `catalog_value_unique` UNIQUE(`value`)
);
--> statement-breakpoint
CREATE TABLE `flattReduc` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`times` float NOT NULL,
	CONSTRAINT `flattReduc_id` PRIMARY KEY(`id`),
	CONSTRAINT `flattReduc_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `option` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`enum` enum('angle','camera','catalog','constellation','filter','telescope'),
	CONSTRAINT `option_id` PRIMARY KEY(`id`),
	CONSTRAINT `option_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `telescope` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`focalLength` int,
	`diameter` int,
	`focalRatio` float,
	CONSTRAINT `telescope_id` PRIMARY KEY(`id`),
	CONSTRAINT `telescope_name_unique` UNIQUE(`name`)
);
