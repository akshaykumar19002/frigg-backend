CREATE TABLE `fridge_item_list` (
  `id` int NOT NULL,
  `fridge_id` int NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `qty` int NOT NULL,
  `expiry_date` bigint NOT NULL,
  `purchase_date` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fridge_id_idx` (`fridge_id`),
  CONSTRAINT `fridge_id` FOREIGN KEY (`fridge_id`) REFERENCES `fridge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
