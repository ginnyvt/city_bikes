-- CreateTable
CREATE TABLE `journeys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `depart_station_id` INTEGER NOT NULL,
    `depart_time` DATETIME(0) NOT NULL,
    `return_station_id` INTEGER NOT NULL,
    `return_time` DATETIME(0) NOT NULL,
    `distance` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,

    UNIQUE INDEX `journeys_depart_station_id_key`(`depart_station_id`),
    UNIQUE INDEX `journeys_return_station_id_key`(`return_station_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stations` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `operator` VARCHAR(50) NOT NULL,
    `capacities` INTEGER NOT NULL,
    `lng` DECIMAL(11, 8) NOT NULL,
    `lat` DECIMAL(11, 8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `journeys` ADD CONSTRAINT `journeys_depart_station_id_fkey` FOREIGN KEY (`depart_station_id`) REFERENCES `stations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `journeys` ADD CONSTRAINT `journeys_return_station_id_fkey` FOREIGN KEY (`return_station_id`) REFERENCES `stations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
