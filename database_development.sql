-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development
-- ------------------------------------------------------
-- Server version	8.0.28

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `bio` mediumtext,
  `user_name` varchar(45) NOT NULL DEFAULT 'New user',
  `moderated` tinyint NOT NULL DEFAULT '0',
  `role` tinyint NOT NULL DEFAULT '1' COMMENT '1 = basic 2 = admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idusers_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(45) NOT NULL DEFAULT 'New topic',
  `content` varchar(1000) NOT NULL,
  `attachement` varchar(120) DEFAULT NULL,
  `moderated` tinyint NOT NULL DEFAULT '0',
  `likes` int NOT NULL DEFAULT '0',
  `creator_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_posts_users1_idx` (`creator_id`),
  CONSTRAINT `fk_posts_users1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `posts_id` int NOT NULL,
  `users_id` int NOT NULL,
  `moderated` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_comments_posts1_idx` (`posts_id`),
  KEY `fk_comments_users1_idx` (`users_id`),
  CONSTRAINT `fk_comments_posts1` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (19,'tida@free.fr','$2b$10$GPChg3VR0ypK8fp3lFi0ru4iG4CAZTx9PF44WZK74lIRq62fVYqH6','bonjour cest moi','Astrid',1,2),(60,'lucien@gmail.com','$2b$10$0BMeJvF0KmVdrRxEZtzbXupAeDshZRllM6PqrN2FB2Rb/iqeM9Tf6',NULL,'Lucien EDT',1,1),(61,'Admin@groupomania.fr','$2b$10$SAkcQc87L4JaMSVquLvDY.YMGptxTfwU2hm6bIgi1uTAApz0PDJEm',NULL,'Compte Administrateur principal',1,2);
UNLOCK TABLES;

LOCK TABLES `posts` WRITE;
INSERT INTO `posts` VALUES (1,'Premier article Groupomania','Bonjour et bienvenue à tous,\nici vous pouvez écrire vos article et partager avec vos collègues vos envies.',NULL,1,0,19),(2,'Je veux être validé','Ceci est un exemple d\'article écrit par un employé en attente de validation',NULL,0,0,19),(3,'Présentation','Je profite de ce message pour vous souhaiter à toutes et tous la bienvenue sur notre espace entreprise.\nEn espérant que celui-ci vous plaira, nous attendons de vous lire vos messages avec impatience.\n',NULL,1,0,60);
UNLOCK TABLES;

LOCK TABLES `comments` WRITE;
INSERT INTO `comments` VALUES (1,'Ainsi que commenter ces articles.',1,19,1),(2,'Je pense que vous allez apprécier cet outil',1,19,1),(20,'je commente dans l\'espace commentaire',1,19,1),(21,'Je suis un commentaire en attente de modération',1,19,0);
UNLOCK TABLES;

