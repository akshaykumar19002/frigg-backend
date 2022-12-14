CREATE TABLE `grocery_lists` (
  `id` int NOT NULL,
  `fridge_id` int NOT NULL,
  `food_item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fridge_id_gl_idx` (`fridge_id`),
  CONSTRAINT `fridge_id_gl` FOREIGN KEY (`fridge_id`) REFERENCES `fridge` (`id`),
  CONSTRAINT `food_item_id_gl` FOREIGN KEY (`food_item_id`) REFERENCES `food_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
