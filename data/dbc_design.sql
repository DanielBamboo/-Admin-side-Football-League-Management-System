-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: dbc_design
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `dbc_design`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `dbc_design` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `dbc_design`;

--
-- Table structure for table `club_records`
--

DROP TABLE IF EXISTS `club_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club_records` (
  `club_name` varchar(20) NOT NULL,
  `season` varchar(30) NOT NULL,
  `league` varchar(30) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `wins` int(11) DEFAULT NULL,
  `draws` int(11) DEFAULT NULL,
  `loses` int(11) DEFAULT NULL,
  `goals` int(11) DEFAULT NULL,
  `lose_goals` int(11) DEFAULT NULL,
  `turns` int(11) DEFAULT NULL,
  PRIMARY KEY (`club_name`,`season`),
  KEY `fk_club_records_ref_seasons_on_season` (`season`),
  KEY `fk_club_records_ref_leagues_on_league` (`league`),
  CONSTRAINT `fk_club_records_ref_clubs_on_club_name` FOREIGN KEY (`club_name`) REFERENCES `clubs` (`club_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_club_records_ref_leagues_on_league` FOREIGN KEY (`league`) REFERENCES `leagues` (`league_name`) ON UPDATE CASCADE,
  CONSTRAINT `fk_club_records_ref_seasons_on_season` FOREIGN KEY (`season`) REFERENCES `seasons` (`season_name`) ON UPDATE CASCADE,
  CONSTRAINT `club_records_chk_7` CHECK ((`turns` >= 0)),
  CONSTRAINT `club_records_chk_8` CHECK ((`lose_goals` >= 0)),
  CONSTRAINT `club_records_chk_draws` CHECK ((`draws` >= 0)),
  CONSTRAINT `club_records_chk_goals` CHECK ((`goals` >= 0)),
  CONSTRAINT `club_records_chk_lose_goals` CHECK ((`lose_goals` >= 0)),
  CONSTRAINT `club_records_chk_loses` CHECK ((`loses` >= 0)),
  CONSTRAINT `club_records_chk_points` CHECK ((`points` >= 0)),
  CONSTRAINT `club_records_chk_wins` CHECK ((`wins` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_records`
--

LOCK TABLES `club_records` WRITE;
/*!40000 ALTER TABLE `club_records` DISABLE KEYS */;
INSERT INTO `club_records` VALUES ('Cardiff City','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,3),('Chelsea','Premier League 2019/2020','Premier League',0,0,0,0,0,0,5),('Derby County','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,6),('Fulham','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,2),('Inter Miami','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,5),('Leeds United','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,3),('Leicester City','Premier League 2019/2020','Premier League',0,0,0,0,0,0,5),('Liverpool','Premier League 2019/2020','Premier League',0,0,0,0,0,0,5),('Manchester City','Premier League 2019/2020','Premier League',0,0,0,1,1,2,6),('Manchester United','Premier League 2019/2020','Premier League',3,1,0,0,2,1,5),('New York City','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,3),('Stoke City','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,5),('Swansea City','EFL Championship 2019/2020','EFL Championship',0,0,0,0,0,0,3),('Tottenham Hotspot','Premier League 2019/2020','Premier League',0,0,0,0,0,0,5);
/*!40000 ALTER TABLE `club_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubs` (
  `club_name` varchar(20) NOT NULL,
  `league` varchar(30) NOT NULL,
  `chief_coach` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`club_name`),
  KEY `fk_clubs_ref_coaches_on_chief_coach` (`chief_coach`),
  KEY `fk_clubs_ref_leagues_on_league` (`league`),
  CONSTRAINT `fk_clubs_ref_coaches_on_chief_coach` FOREIGN KEY (`chief_coach`) REFERENCES `coaches` (`coach_name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_clubs_ref_leagues_on_league` FOREIGN KEY (`league`) REFERENCES `leagues` (`league_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES ('Cardiff City','EFL Championship','Harris'),('Chelsea','Premier League','Lampard'),('Derby County','EFL Championship','Cocu'),('Fulham','EFL Championship','Parker'),('Inter Miami','EFL Championship','Android'),('Leeds United','EFL Championship','Bielsa'),('Leicester City','Premier League','Rodgers'),('Liverpool','Premier League','Klopp'),('Manchester City','Premier League','Guardiola'),('Manchester United','Premier League','Ole'),('New York City','EFL Championship','Apple'),('Stoke City','EFL Championship','Micheal'),('Swansea City','EFL Championship','Cooper'),('Tottenham Hotspot','Premier League','Mourinho');
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coaches`
--

DROP TABLE IF EXISTS `coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coaches` (
  `coach_name` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  PRIMARY KEY (`coach_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coaches`
--

LOCK TABLES `coaches` WRITE;
/*!40000 ALTER TABLE `coaches` DISABLE KEYS */;
INSERT INTO `coaches` VALUES ('Android','America'),('Apple','America'),('Bielsa','Argentina'),('Cocu','Netherlands'),('Cooper','Wales'),('Guardiola','Spain'),('Harris','England'),('Klopp','German'),('Lampard','England'),('Micheal','Norhern Ireland'),('Mourinho','Portugal'),('Ole','Norway'),('Parker','England'),('Rodgers','England');
/*!40000 ALTER TABLE `coaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_records`
--

DROP TABLE IF EXISTS `game_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  `event` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `minutes` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_records_ref_games_on_game_id` (`game_id`),
  KEY `fk_game_records_ref_players_on_player_id` (`player_id`),
  CONSTRAINT `fk_game_records_ref_games_on_game_id` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_game_records_ref_players_on_player_id` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE SET NULL,
  CONSTRAINT `game_records_chk_1` CHECK ((`event` in (0,1,2,3)))
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_records`
--

LOCK TABLES `game_records` WRITE;
/*!40000 ALTER TABLE `game_records` DISABLE KEYS */;
INSERT INTO `game_records` VALUES (25,273,0,34,10),(26,273,0,46,30),(27,273,1,44,30),(28,273,0,36,95);
/*!40000 ALTER TABLE `game_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `season` varchar(30) NOT NULL,
  `league` varchar(30) NOT NULL,
  `turn` int(11) NOT NULL,
  `matchday` date NOT NULL,
  `home_team` varchar(20) NOT NULL,
  `away_team` varchar(20) NOT NULL,
  `home_team_goal` int(11) DEFAULT NULL,
  `away_team_goal` int(11) DEFAULT NULL,
  `game_result` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_games_ref_seasons_on_season` (`season`),
  KEY `fk_games_ref_leagues_on_league` (`league`),
  KEY `fk_games_ref_clubs_on_home_team` (`home_team`),
  KEY `fk_games_ref_clubs_on_away_team` (`away_team`),
  CONSTRAINT `fk_games_ref_clubs_on_away_team` FOREIGN KEY (`away_team`) REFERENCES `clubs` (`club_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_games_ref_clubs_on_home_team` FOREIGN KEY (`home_team`) REFERENCES `clubs` (`club_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_games_ref_leagues_on_league` FOREIGN KEY (`league`) REFERENCES `leagues` (`league_name`) ON UPDATE CASCADE,
  CONSTRAINT `fk_games_ref_seasons_on_season` FOREIGN KEY (`season`) REFERENCES `seasons` (`season_name`) ON UPDATE CASCADE,
  CONSTRAINT `games_chk_1` CHECK ((`game_result` in (0,1,2)))
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (211,'EFL Championship 2019/2020','EFL Championship',1,'2019-08-01','Leeds United','Derby County',NULL,NULL,NULL),(212,'EFL Championship 2019/2020','EFL Championship',1,'2019-08-01','Inter Miami','Cardiff City',NULL,NULL,NULL),(213,'EFL Championship 2019/2020','EFL Championship',1,'2019-08-01','Stoke City','Fulham',NULL,NULL,NULL),(214,'EFL Championship 2019/2020','EFL Championship',2,'2019-09-12','Fulham','Derby County',NULL,NULL,NULL),(215,'EFL Championship 2019/2020','EFL Championship',2,'2019-09-12','New York City','Leeds United',NULL,NULL,NULL),(216,'EFL Championship 2019/2020','EFL Championship',2,'2019-09-12','Swansea City','Stoke City',NULL,NULL,NULL),(217,'EFL Championship 2019/2020','EFL Championship',3,'2019-10-25','Inter Miami','Derby County',NULL,NULL,NULL),(218,'EFL Championship 2019/2020','EFL Championship',3,'2019-10-25','New York City','Cardiff City',NULL,NULL,NULL),(219,'EFL Championship 2019/2020','EFL Championship',3,'2019-10-25','Leeds United','Stoke City',NULL,NULL,NULL),(220,'EFL Championship 2019/2020','EFL Championship',4,'2019-12-06','Swansea City','New York City',NULL,NULL,NULL),(221,'EFL Championship 2019/2020','EFL Championship',4,'2019-12-06','Fulham','Inter Miami',NULL,NULL,NULL),(222,'EFL Championship 2019/2020','EFL Championship',4,'2019-12-07','Cardiff City','Leeds United',NULL,NULL,NULL),(223,'EFL Championship 2019/2020','EFL Championship',5,'2020-01-18','Stoke City','New York City',NULL,NULL,NULL),(224,'EFL Championship 2019/2020','EFL Championship',5,'2020-01-18','Swansea City','Inter Miami',NULL,NULL,NULL),(225,'EFL Championship 2019/2020','EFL Championship',5,'2020-01-18','Cardiff City','Derby County',NULL,NULL,NULL),(226,'EFL Championship 2019/2020','EFL Championship',6,'2020-02-29','New York City','Inter Miami',NULL,NULL,NULL),(227,'EFL Championship 2019/2020','EFL Championship',6,'2020-02-29','Cardiff City','Stoke City',NULL,NULL,NULL),(228,'EFL Championship 2019/2020','EFL Championship',6,'2020-02-29','Fulham','Swansea City',NULL,NULL,NULL),(229,'EFL Championship 2019/2020','EFL Championship',7,'2020-04-12','Inter Miami','Leeds United',NULL,NULL,NULL),(230,'EFL Championship 2019/2020','EFL Championship',7,'2020-04-13','Swansea City','Fulham',NULL,NULL,NULL),(231,'EFL Championship 2019/2020','EFL Championship',7,'2020-04-13','New York City','Stoke City',NULL,NULL,NULL),(232,'EFL Championship 2019/2020','EFL Championship',8,'2020-05-24','Fulham','Stoke City',NULL,NULL,NULL),(233,'EFL Championship 2019/2020','EFL Championship',8,'2020-05-24','Inter Miami','Swansea City',NULL,NULL,NULL),(234,'EFL Championship 2019/2020','EFL Championship',8,'2020-05-24','Derby County','New York City',NULL,NULL,NULL),(235,'EFL Championship 2019/2020','EFL Championship',9,'2020-07-06','Fulham','Cardiff City',NULL,NULL,NULL),(236,'EFL Championship 2019/2020','EFL Championship',9,'2020-07-06','Swansea City','Derby County',NULL,NULL,NULL),(237,'EFL Championship 2019/2020','EFL Championship',9,'2020-07-07','Stoke City','Inter Miami',NULL,NULL,NULL),(238,'EFL Championship 2019/2020','EFL Championship',10,'2020-08-18','Cardiff City','Swansea City',NULL,NULL,NULL),(239,'EFL Championship 2019/2020','EFL Championship',10,'2020-08-18','Stoke City','Derby County',NULL,NULL,NULL),(240,'EFL Championship 2019/2020','EFL Championship',10,'2020-08-18','Leeds United','Inter Miami',NULL,NULL,NULL),(271,'Premier League 2019/2020','Premier League',1,'2019-08-10','Liverpool','Leicester City',NULL,NULL,NULL),(272,'Premier League 2019/2020','Premier League',1,'2019-08-10','Tottenham Hotspot','Chelsea',NULL,NULL,NULL),(273,'Premier League 2019/2020','Premier League',1,'2019-08-10','Manchester City','Manchester United',1,2,1),(274,'Premier League 2019/2020','Premier League',2,'2019-09-18','Chelsea','Manchester United',NULL,NULL,NULL),(275,'Premier League 2019/2020','Premier League',2,'2019-09-18','Liverpool','Tottenham Hotspot',NULL,NULL,NULL),(276,'Premier League 2019/2020','Premier League',2,'2019-09-18','Leicester City','Manchester City',NULL,NULL,NULL),(277,'Premier League 2019/2020','Premier League',3,'2019-10-27','Tottenham Hotspot','Liverpool',NULL,NULL,NULL),(278,'Premier League 2019/2020','Premier League',3,'2019-10-28','Manchester United','Chelsea',NULL,NULL,NULL),(279,'Premier League 2019/2020','Premier League',3,'2019-10-28','Manchester City','Leicester City',NULL,NULL,NULL),(280,'Premier League 2019/2020','Premier League',4,'2019-12-05','Manchester City','Liverpool',NULL,NULL,NULL),(281,'Premier League 2019/2020','Premier League',4,'2019-12-06','Leicester City','Chelsea',NULL,NULL,NULL),(282,'Premier League 2019/2020','Premier League',4,'2019-12-06','Manchester United','Tottenham Hotspot',NULL,NULL,NULL),(283,'Premier League 2019/2020','Premier League',5,'2020-01-13','Tottenham Hotspot','Manchester United',NULL,NULL,NULL),(284,'Premier League 2019/2020','Premier League',5,'2020-01-14','Manchester United','Liverpool',NULL,NULL,NULL),(285,'Premier League 2019/2020','Premier League',5,'2020-01-14','Liverpool','Chelsea',NULL,NULL,NULL),(286,'Premier League 2019/2020','Premier League',6,'2020-02-21','Chelsea','Liverpool',NULL,NULL,NULL),(287,'Premier League 2019/2020','Premier League',6,'2020-02-21','Leicester City','Tottenham Hotspot',NULL,NULL,NULL),(288,'Premier League 2019/2020','Premier League',6,'2020-02-22','Manchester United','Manchester City',NULL,NULL,NULL),(289,'Premier League 2019/2020','Premier League',7,'2020-03-31','Leicester City','Manchester United',NULL,NULL,NULL),(290,'Premier League 2019/2020','Premier League',7,'2020-04-01','Chelsea','Manchester City',NULL,NULL,NULL),(291,'Premier League 2019/2020','Premier League',7,'2020-04-01','Chelsea','Tottenham Hotspot',NULL,NULL,NULL),(292,'Premier League 2019/2020','Premier League',8,'2020-05-09','Liverpool','Manchester City',NULL,NULL,NULL),(293,'Premier League 2019/2020','Premier League',8,'2020-05-10','Chelsea','Leicester City',NULL,NULL,NULL),(294,'Premier League 2019/2020','Premier League',8,'2020-05-10','Manchester City','Chelsea',NULL,NULL,NULL),(295,'Premier League 2019/2020','Premier League',9,'2020-06-17','Manchester United','Leicester City',NULL,NULL,NULL),(296,'Premier League 2019/2020','Premier League',9,'2020-06-17','Tottenham Hotspot','Manchester City',NULL,NULL,NULL),(297,'Premier League 2019/2020','Premier League',9,'2020-06-18','Manchester City','Tottenham Hotspot',NULL,NULL,NULL),(298,'Premier League 2019/2020','Premier League',10,'2020-07-27','Liverpool','Manchester United',NULL,NULL,NULL),(299,'Premier League 2019/2020','Premier League',10,'2020-07-27','Tottenham Hotspot','Leicester City',NULL,NULL,NULL),(300,'Premier League 2019/2020','Premier League',10,'2020-07-27','Leicester City','Liverpool',NULL,NULL,NULL);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leagues`
--

DROP TABLE IF EXISTS `leagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leagues` (
  `league_name` varchar(30) NOT NULL,
  `current_season` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`league_name`),
  KEY `fk_leagues_ref_seasons_on_current_season` (`current_season`),
  CONSTRAINT `fk_leagues_ref_seasons_on_current_season` FOREIGN KEY (`current_season`) REFERENCES `seasons` (`season_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leagues`
--

LOCK TABLES `leagues` WRITE;
/*!40000 ALTER TABLE `leagues` DISABLE KEYS */;
INSERT INTO `leagues` VALUES ('EFL Championship','EFL Championship 2019/2020'),('Premier League','Premier League 2019/2020');
/*!40000 ALTER TABLE `leagues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_records`
--

DROP TABLE IF EXISTS `player_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_records` (
  `player_id` int(11) NOT NULL,
  `season` varchar(30) NOT NULL,
  `goal` int(11) DEFAULT NULL,
  `assist` int(11) DEFAULT NULL,
  PRIMARY KEY (`player_id`,`season`),
  KEY `fk_player_records_ref_seasons_on_season` (`season`),
  CONSTRAINT `fk_player_records_ref_seasons_on_season` FOREIGN KEY (`season`) REFERENCES `seasons` (`season_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_records`
--

LOCK TABLES `player_records` WRITE;
/*!40000 ALTER TABLE `player_records` DISABLE KEYS */;
INSERT INTO `player_records` VALUES (32,'Premier League 2019/2020',1,0),(33,'Premier League 2019/2020',0,1),(34,'Premier League 2019/2020',1,0),(35,'Premier League 2019/2020',1,0),(36,'Premier League 2019/2020',1,0),(38,'Premier League 2019/2020',1,0),(39,'Premier League 2019/2020',0,1),(44,'Premier League 2019/2020',0,1),(45,'Premier League 2019/2020',0,1),(46,'Premier League 2019/2020',1,0),(47,'Premier League 2019/2020',1,0),(54,'Premier League 2019/2020',1,0),(62,'Premier League 2019/2020',1,1),(65,'Premier League 2019/2020',1,0),(92,'EFL Championship 2019/2020',1,0);
/*!40000 ALTER TABLE `player_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_name` varchar(20) NOT NULL,
  `shirt_number` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `preferred_foot` varchar(6) DEFAULT NULL,
  `position` varchar(20) DEFAULT NULL,
  `club` varchar(20) DEFAULT NULL,
  `country` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_players_ref_clubs_on_club` (`club`),
  CONSTRAINT `fk_players_ref_clubs_on_club` FOREIGN KEY (`club`) REFERENCES `clubs` (`club_name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `players_chk_1` CHECK ((`shirt_number` > 0)),
  CONSTRAINT `players_chk_2` CHECK ((`age` > 0)),
  CONSTRAINT `players_chk_3` CHECK ((`preferred_foot` in (_utf8mb3'left',_utf8mb3'right',_utf8mb3'both'))),
  CONSTRAINT `players_chk_4` CHECK ((`position` in (_utf8mb3'Attacker',_utf8mb3'Midfielder',_utf8mb3'Defender',_utf8mb3'Goalkeeper')))
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (32,'Greenwood',26,18,'left','Midfielder','Manchester United','England'),(33,'Martial',9,24,'right','Attacker','Manchester United','France'),(34,'McTominay',39,23,'right','Goalkeeper','Manchester United','Scotland'),(35,'Pogba',6,27,'right','Midfielder','Manchester United','France'),(36,'Maguire',5,27,'right','Defender','Manchester United','England'),(37,'De gea',1,29,'right','Goalkeeper','Manchester United','Spain'),(38,'Salah',11,28,'left','Attacker','Liverpool','Egypt'),(39,'Mane',10,28,'right','Attacker','Liverpool','Senegal'),(40,'Henderson',14,30,'right','Midfielder','Liverpool','England'),(41,'Fabinho',3,26,'right','Midfielder','Liverpool','Brazil'),(42,'Arnold',66,21,'right','Defender','Liverpool','England'),(43,'van Dijk',4,29,'right','Defender','Liverpool','Netherlands'),(44,'Aguero',10,32,'right','Attacker','Manchester City','Argentina'),(45,'Bernardo Silva',20,26,'left','Midfielder','Manchester City','Portugal'),(46,'De Bruyne',17,29,'right','Midfielder','Manchester City','Belgium'),(47,'Gundogan',8,29,'right','Midfielder','Manchester City','German'),(48,'Mendy',22,26,'left','Defender','Manchester City','France'),(49,'Ederson',31,27,'left','Goalkeeper','Manchester City','Brazil'),(50,'Giroud',18,33,'left','Attacker','Chelsea','France'),(51,'Abraham',9,22,'right','Attacker','Chelsea','England'),(52,'Mount',19,21,'right','Midfielder','Chelsea','England'),(53,'Barkley',8,26,'right','Midfielder','Chelsea','England'),(54,'Azpilicueta',28,31,'right','Defender','Chelsea','Spain'),(55,'Kepa',1,25,'right','Goalkeeper','Chelsea','Spain'),(56,'Kane',10,27,'right','Attacker','Tottenham Hotspot','England'),(57,'Heung-Min Son',7,28,'both','Attacker','Tottenham Hotspot','Korea'),(58,'Winks',8,24,'right','Midfielder','Tottenham Hotspot','England'),(59,'Lo Celso',18,24,'left','Midfielder','Tottenham Hotspot','Argentina'),(60,'Davies',33,27,'left','Defender','Tottenham Hotspot','Wales'),(61,'Lloris',1,33,'left','Goalkeeper','Tottenham Hotspot','France'),(62,'Perez',17,27,'right','Attacker','Leicester City','Spain'),(63,'Vardy',9,33,'right','Attacker','Leicester City','England'),(64,'Maddison',10,23,'right','Midfielder','Leicester City','England'),(65,'Ndidi',25,23,'right','Midfielder','Leicester City','Nigeria'),(66,'Evans',6,32,'both','Defender','Leicester City','Northern Ireland'),(67,'Schmeichel',1,33,'right','Goalkeeper','Leicester City','Denmark'),(68,'Murphy',11,25,'left','Attacker','Cardiff City','England'),(69,'Hoilett',33,30,'right','Attacker','Cardiff City','England'),(70,'Tomlin',17,31,'right','Midfielder','Cardiff City','England'),(71,'Pack',15,29,'right','Midfielder','Cardiff City','England'),(72,'Morrison',4,29,'right','Defender','Cardiff City','England'),(73,'Smithies',12,30,'right','Goalkeeper','Cardiff City','England'),(74,'Reid',14,27,'right','Attacker','Fulham','England'),(75,'Onomah',25,23,'right','Midfielder','Fulham','England'),(76,'Cairney',10,29,'left','Midfielder','Fulham','Scotland'),(77,'Reed',21,25,'right','Midfielder','Fulham','England'),(78,'Hector',3,28,'right','Defender','Fulham','Jamaica'),(79,'Rodak',12,23,'right','Goalkeeper','Fulham','Slovensko'),(80,'Campbell',26,20,'right','Attacker','Stoke City','England'),(81,'Vokes',9,30,'right','Attacker','Stoke City','Wales'),(82,'Clucas',22,29,'left','Midfielder','Stoke City','England'),(83,'Cousins',24,26,'right','Midfielder','Stoke City','England'),(84,'Chester',12,31,'right','Defender','Stoke City','Wales'),(85,'Butland',1,27,'right','Goalkeeper','Stoke City','England'),(86,'Brewster',19,20,'right','Attacker','Leeds United','England'),(87,'Ayew',22,30,'left','Attacker','Leeds United','Ghana'),(88,'Grimes',8,25,'left','Midfielder','Leeds United','England'),(89,'Fulton',6,27,'right','Midfielder','Leeds United','Scotland'),(90,'Cabango',44,20,'right','Defender','Leeds United','Wales'),(91,'Woodman',27,23,'right','Goalkeeper','Leeds United','England'),(92,'Bamford',9,26,'left','Attacker','Swansea City','England'),(93,'Roberts',11,21,'right','Midfielder','Swansea City','Wales'),(94,'Phillips',23,24,'right','Midfielder','Swansea City','England'),(95,'Cooper',6,28,'left','Defender','Swansea City','Scotland'),(96,'White',5,23,'right','Defender','Swansea City','England'),(97,'Meslier',1,20,'right','Goalkeeper','Swansea City','France'),(98,'Martin',19,31,'right','Attacker','Derby County','Scotland'),(99,'Knight',38,19,'right','Attacker','Derby County','Ireland'),(100,'Sibley',40,18,'right','Midfielder','Derby County','England'),(101,'Rooney',32,34,'right','Midfielder','Derby County','England'),(102,'Clarke',16,23,'left','Defender','Derby County','England'),(103,'Roos',21,28,'right','Goalkeeper','Derby County','Netherlands'),(104,'Android',9,2,'right','Midfielder','Derby County','America'),(105,'Adnroisd',8,1,'right','Attacker','Leicester City','asdasdasd'),(106,'Maguire',NULL,12,'right','Midfielder','Derby County','56'),(107,'Maguire',NULL,12,'right','Midfielder','Derby County','56'),(108,'Maguire',NULL,2,'right','Attacker','Derby County','2'),(109,'Android',8,2,'right','Midfielder','Fulham','America'),(110,'WJ',7,14,'right','Attacker','Manchester United','China');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seasons` (
  `season_name` varchar(30) NOT NULL,
  `beginAt` date DEFAULT NULL,
  `endAt` date DEFAULT NULL,
  `start` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`season_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES ('EFL Championship 2019/2020','2019-08-01','2020-08-18',1),('Premier League 2019/2020','2019-08-10','2020-07-27',1);
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `usrname` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`usrname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('123','123','cmder'),('456','456','view');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-14 11:39:02
