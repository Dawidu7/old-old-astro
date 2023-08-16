CREATE TABLE `camera` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`resolutionX` int NOT NULL,
	`matrixX` float NOT NULL,
	`matrixY` float NOT NULL,
	`pixelSize` float NOT NULL,
	CONSTRAINT `camera_id` PRIMARY KEY(`id`),
	CONSTRAINT `camera_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `admin` MODIFY COLUMN `password` varchar(60) NOT NULL;