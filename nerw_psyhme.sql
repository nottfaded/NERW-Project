/*
 Navicat Premium Data Transfer

 Source Server         : MySql
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : nerw_psyhme

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 12/03/2024 21:19:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for __efmigrationshistory
-- ----------------------------
DROP TABLE IF EXISTS `__efmigrationshistory`;
CREATE TABLE `__efmigrationshistory`  (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of __efmigrationshistory
-- ----------------------------

-- ----------------------------
-- Table structure for accounts
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `repairCode` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdCode` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
  `bill` int NOT NULL DEFAULT 0,
  `referralCode` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `countReferralAplied` int NOT NULL DEFAULT 0,
  `notifySettings` json NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account_email_unique`(`email` ASC) USING BTREE,
  UNIQUE INDEX `account_phone_unique`(`phone` ASC) USING BTREE,
  INDEX `account_role_fk`(`roleId` ASC) USING BTREE,
  CONSTRAINT `account_role_fk` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of accounts
-- ----------------------------
INSERT INTO `accounts` VALUES (21, 3, 'p@p.p', '$2a$12$V.O4mtxIkOzCVzqNqXw6vOLrtG4KQ45csBkj8CU/ixEixKJb2Z71G', 'Психолог', '', '+380000000000', NULL, '0001-01-01 00:00:00', 0, '', 0, '[{\"Mail\": true, \"Name\": \"SessionNotPaid\", \"Site\": false, \"Telegram\": false}, {\"Mail\": false, \"Name\": \"SessionTransfer\", \"Site\": false, \"Telegram\": true}, {\"Mail\": false, \"Name\": \"SessionCancellation\", \"Site\": false, \"Telegram\": false}, {\"Mail\": false, \"Name\": \"TaskReminders\", \"Site\": false, \"Telegram\": false}, {\"Mail\": true, \"Name\": \"OneHoureBefore\", \"Site\": true, \"Telegram\": false}]');
INSERT INTO `accounts` VALUES (22, 2, 'a@a.a', '$2a$12$V.O4mtxIkOzCVzqNqXw6vOLrtG4KQ45csBkj8CU/ixEixKJb2Z71G', 'sd', NULL, '+380505050505', NULL, '0001-01-01 00:00:00', 0, '0', 0, '[{\"Mail\": true, \"Name\": \"SessionNotPaid\", \"Site\": false, \"Telegram\": false}, {\"Mail\": false, \"Name\": \"SessionTransfer\", \"Site\": false, \"Telegram\": true}, {\"Mail\": false, \"Name\": \"SessionCancellation\", \"Site\": false, \"Telegram\": false}, {\"Mail\": false, \"Name\": \"TaskReminders\", \"Site\": false, \"Telegram\": false}, {\"Mail\": false, \"Name\": \"OneHoureBefore\", \"Site\": false, \"Telegram\": false}]');

-- ----------------------------
-- Table structure for educations
-- ----------------------------
DROP TABLE IF EXISTS `educations`;
CREATE TABLE `educations`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `psychId` int NOT NULL,
  `university` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `faculty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_education_psych`(`psychId` ASC) USING BTREE,
  CONSTRAINT `fk_education_psych` FOREIGN KEY (`psychId`) REFERENCES `psychologistinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of educations
-- ----------------------------

-- ----------------------------
-- Table structure for psychologistinfo
-- ----------------------------
DROP TABLE IF EXISTS `psychologistinfo`;
CREATE TABLE `psychologistinfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountId` int NOT NULL,
  `allCountSession` int NOT NULL DEFAULT 0,
  `year` int NULL DEFAULT NULL,
  `intramuralMeet` tinyint(1) NOT NULL DEFAULT 0,
  `onlineMeet` tinyint(1) NOT NULL DEFAULT 0,
  `city` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `personalPrice` int NOT NULL DEFAULT 250,
  `personalSalary` int NOT NULL DEFAULT 0,
  `familyPrice` int NOT NULL DEFAULT 250,
  `familySalary` int NOT NULL DEFAULT 0,
  `childrenPrice` int NOT NULL DEFAULT 250,
  `childrenSalary` int NOT NULL DEFAULT 0,
  `languages` json NOT NULL,
  `personalTherapy` tinyint(1) NOT NULL DEFAULT 0,
  `familyTherapy` tinyint(1) NOT NULL DEFAULT 0,
  `childrenTherapy` tinyint(1) NOT NULL DEFAULT 0,
  `activated` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_psychInfo_account`(`accountId` ASC) USING BTREE,
  CONSTRAINT `fk_psychInfo_account` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of psychologistinfo
-- ----------------------------
INSERT INTO `psychologistinfo` VALUES (1, 21, 0, 22, 0, 0, 'Kharkiv', 'Тест', 250, 0, 250, 0, 250, 0, '[]', 1, 0, 0, 0);

-- ----------------------------
-- Table structure for psychologistinfo_specialization
-- ----------------------------
DROP TABLE IF EXISTS `psychologistinfo_specialization`;
CREATE TABLE `psychologistinfo_specialization`  (
  `psychId` int NOT NULL,
  `specializationId` int NOT NULL,
  PRIMARY KEY (`psychId`, `specializationId`) USING BTREE,
  INDEX `fk_specialization_psych`(`specializationId` ASC) USING BTREE,
  CONSTRAINT `fk_psych_specialization` FOREIGN KEY (`psychId`) REFERENCES `psychologistinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_specialization_psych` FOREIGN KEY (`specializationId`) REFERENCES `specializations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of psychologistinfo_specialization
-- ----------------------------

-- ----------------------------
-- Table structure for psychologistinfo_typeoftherapy
-- ----------------------------
DROP TABLE IF EXISTS `psychologistinfo_typeoftherapy`;
CREATE TABLE `psychologistinfo_typeoftherapy`  (
  `psychId` int NOT NULL,
  `typeTherapyId` int NOT NULL,
  PRIMARY KEY (`psychId`, `typeTherapyId`) USING BTREE,
  INDEX `fk_typeOfTherapy_psych`(`typeTherapyId` ASC) USING BTREE,
  CONSTRAINT `fk_psych_typeOfTherapy` FOREIGN KEY (`psychId`) REFERENCES `psychologistinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_typeOfTherapy_psych` FOREIGN KEY (`typeTherapyId`) REFERENCES `typesoftherapy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of psychologistinfo_typeoftherapy
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_name_UNIQUE`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (4, 'Admin');
INSERT INTO `role` VALUES (1, 'Client');
INSERT INTO `role` VALUES (2, 'Partner');
INSERT INTO `role` VALUES (3, 'Psychologist');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientId` int NOT NULL,
  `psychoId` int NOT NULL,
  `clientPhone` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` datetime NOT NULL,
  `countMinutes` int NOT NULL,
  `city` varchar(168) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `street` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` enum('NotPayed','Payed','Completed','Declined') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NotPayed',
  `rating` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `session_client_fk`(`clientId` ASC) USING BTREE,
  UNIQUE INDEX `session_psycho_fk`(`psychoId` ASC) USING BTREE,
  CONSTRAINT `session_client_fk` FOREIGN KEY (`clientId`) REFERENCES `accounts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `session_psycho_fk` FOREIGN KEY (`psychoId`) REFERENCES `accounts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for specializations
-- ----------------------------
DROP TABLE IF EXISTS `specializations`;
CREATE TABLE `specializations`  (
  `id` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `specialization_type_UNIQUE`(`type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of specializations
-- ----------------------------
INSERT INTO `specializations` VALUES (6, 'Клінічний психолог');
INSERT INTO `specializations` VALUES (4, 'Коуч');
INSERT INTO `specializations` VALUES (7, 'Невролог');
INSERT INTO `specializations` VALUES (5, 'Психіатр');
INSERT INTO `specializations` VALUES (1, 'Психолог');
INSERT INTO `specializations` VALUES (2, 'Психотерапевт');
INSERT INTO `specializations` VALUES (3, 'Сексолог');

-- ----------------------------
-- Table structure for typesoftherapy
-- ----------------------------
DROP TABLE IF EXISTS `typesoftherapy`;
CREATE TABLE `typesoftherapy`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `language_name_UNIQUE`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of typesoftherapy
-- ----------------------------
INSERT INTO `typesoftherapy` VALUES (22, 'Адаптація, еміграція');
INSERT INTO `typesoftherapy` VALUES (8, 'Втома');
INSERT INTO `typesoftherapy` VALUES (21, 'Втрата та горе');
INSERT INTO `typesoftherapy` VALUES (1, 'Депресивні стани');
INSERT INTO `typesoftherapy` VALUES (2, 'Дратівливість');
INSERT INTO `typesoftherapy` VALUES (18, 'Емоційне вигорання');
INSERT INTO `typesoftherapy` VALUES (17, 'Емоційне насилля');
INSERT INTO `typesoftherapy` VALUES (15, 'Інтим та сексуальність');
INSERT INTO `typesoftherapy` VALUES (9, 'Навʼязливі думки');
INSERT INTO `typesoftherapy` VALUES (23, 'Народження дитини');
INSERT INTO `typesoftherapy` VALUES (3, 'Панічні атаки');
INSERT INTO `typesoftherapy` VALUES (20, 'Прокрастинація');
INSERT INTO `typesoftherapy` VALUES (11, 'Психосоматика');
INSERT INTO `typesoftherapy` VALUES (24, 'ПТСР');
INSERT INTO `typesoftherapy` VALUES (14, 'Романтичні стосунки');
INSERT INTO `typesoftherapy` VALUES (6, 'Самооцінка та цінність');
INSERT INTO `typesoftherapy` VALUES (4, 'Самотність');
INSERT INTO `typesoftherapy` VALUES (13, 'Сімейні стосунки');
INSERT INTO `typesoftherapy` VALUES (16, 'Співзалежність');
INSERT INTO `typesoftherapy` VALUES (5, 'Спроби самогубства');
INSERT INTO `typesoftherapy` VALUES (19, 'Ставлення до грошей');
INSERT INTO `typesoftherapy` VALUES (12, 'Ставлення до їжі');
INSERT INTO `typesoftherapy` VALUES (7, 'Тривожні стани');
INSERT INTO `typesoftherapy` VALUES (10, 'Хімічні залежності');

-- ----------------------------
-- Triggers structure for table accounts
-- ----------------------------
DROP TRIGGER IF EXISTS `add_psychologist_info_after_insert`;
delimiter ;;
CREATE TRIGGER `add_psychologist_info_after_insert` AFTER INSERT ON `accounts` FOR EACH ROW BEGIN
    DECLARE psycho_role INT;

    SELECT id INTO psycho_role FROM role WHERE name = 'Psychologist';

    IF NEW.roleId = psycho_role THEN
        INSERT INTO psychologistInfo (accountId) VALUES (NEW.id);
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table sessions
-- ----------------------------
DROP TRIGGER IF EXISTS `check_roles_before_insert`;
delimiter ;;
CREATE TRIGGER `check_roles_before_insert` BEFORE INSERT ON `sessions` FOR EACH ROW BEGIN
    DECLARE client_role INT;
		DECLARE psycho_role INT;

		SELECT a.roleId INTO client_role
		FROM accounts a
		WHERE a.id = NEW.clientId;

		SELECT a.roleId INTO psycho_role
		FROM accounts a
		WHERE a.id = NEW.psychoId;


    IF client_role IS NULL OR client_role != 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'fk_client does not have a client role';
    END IF;

    IF psycho_role IS NULL OR psycho_role != 3 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'fk_psycho does not have a psychologist role';
    END IF;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
