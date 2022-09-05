-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 05 sep. 2022 à 11:08
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gemp`
--

-- --------------------------------------------------------

--
-- Structure de la table `bon`
--

DROP TABLE IF EXISTS `bon`;
CREATE TABLE IF NOT EXISTS `bon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_bon` varchar(50) NOT NULL,
  `date` varchar(30) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bon`
--

INSERT INTO `bon` (`id`, `type_bon`, `date`, `id_user`) VALUES
(26, 'reception', '4/9/2022', 1),
(27, 'reception', '4/9/2022', 1),
(28, 'reception', '4/9/2022', 1),
(29, 'reception', '4/9/2022', 1),
(30, 'reception', '4/9/2022', 1),
(31, 'reception', '4/9/2022', 1),
(32, 'reception', '4/9/2022', 1),
(33, 'reception', '4/9/2022', 1),
(34, 'reception', '4/9/2022', 1),
(35, 'reception', '4/9/2022', 1),
(36, 'reception', '4/9/2022', 1),
(37, 'reception', '4/9/2022', 1),
(38, 'reception', '4/9/2022', 1),
(39, 'reception', '4/9/2022', 1),
(40, 'reception', '4/9/2022', 1),
(41, 'reception', '4/9/2022', 1),
(42, 'reception', '4/9/2022', 1),
(43, 'reception', '4/9/2022', 1),
(44, 'reception', '4/9/2022', 1),
(45, 'reception', '4/9/2022', 1),
(46, 'reception', '4/9/2022', 1),
(47, 'reception', '4/9/2022', 1),
(48, 'reception', '4/9/2022', 1),
(49, 'reception', '4/9/2022', 1),
(50, 'reception', '4/9/2022', 1),
(51, 'reception', '4/9/2022', 1),
(52, 'trensfert', '4/9/2022', 1),
(53, 'trensfert', '4/9/2022', 1),
(54, 'trensfert', '5/9/2022', 1),
(55, 'trensfert', '5/9/2022', 1),
(56, 'trensfert', '5/9/2022', 1),
(57, 'trensfert', '5/9/2022', 1),
(58, 'trensfert', '5/9/2022', 1),
(59, 'trensfert', '5/9/2022', 1),
(60, 'trensfert', '5/9/2022', 1),
(61, 'trensfert', '5/9/2022', 1),
(62, 'trensfert', '5/9/2022', 1),
(63, 'trensfert', '5/9/2022', 1),
(64, 'trensfert', '5/9/2022', 1),
(65, 'trensfert', '5/9/2022', 1),
(66, 'trensfert', '5/9/2022', 1),
(67, 'trensfert', '5/9/2022', 1),
(68, 'trensfert', '5/9/2022', 1),
(69, 'trensfert', '5/9/2022', 1),
(70, 'trensfert', '5/9/2022', 1),
(71, 'trensfert', '5/9/2022', 1),
(72, 'trensfert', '5/9/2022', 1),
(73, 'trensfert', '5/9/2022', 1),
(74, 'trensfert', '5/9/2022', 1),
(75, 'trensfert', '5/9/2022', 1),
(76, 'trensfert', '5/9/2022', 1),
(77, 'trensfert', '5/9/2022', 1),
(78, 'trensfert', '5/9/2022', 1);

-- --------------------------------------------------------

--
-- Structure de la table `element`
--

DROP TABLE IF EXISTS `element`;
CREATE TABLE IF NOT EXISTS `element` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `quantity` int(30) NOT NULL,
  `id_bon` int(30) NOT NULL,
  `id_ingredient` int(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_bon` (`id_bon`),
  KEY `id_ingredient` (`id_ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `element`
--

INSERT INTO `element` (`id`, `quantity`, `id_bon`, `id_ingredient`) VALUES
(21, 2, 28, 1),
(22, 2, 29, 1),
(23, 2, 30, 1),
(24, 2, 31, 1),
(25, 2, 32, 1),
(26, 2, 33, 1),
(27, 2, 34, 1),
(28, 2, 35, 1),
(29, 2, 36, 1),
(30, 2, 37, 1),
(31, 2, 38, 1),
(32, 2, 39, 1),
(33, 2, 40, 1),
(34, 2, 41, 1),
(35, 2, 42, 1),
(36, 2, 43, 1),
(37, 2, 44, 1),
(38, 2, 45, 1),
(39, 2, 46, 1),
(40, 2, 47, 1),
(41, 2, 48, 1),
(42, 3, 49, 1),
(43, 3, 50, 1),
(44, 9, 51, 1),
(45, 9, 52, 1),
(46, 5, 53, 1),
(47, 5, 54, 1),
(48, 5, 55, 1),
(49, 5, 56, 1),
(50, 5, 57, 1),
(51, 5, 58, 1),
(52, 5, 59, 1),
(53, 5, 60, 1),
(54, 5, 61, 1),
(55, 5, 62, 1),
(56, 10, 63, 1),
(57, 10, 64, 1),
(58, 10, 65, 1),
(59, 20, 66, 1),
(60, 20, 67, 1),
(61, 20, 68, 1),
(62, 20, 69, 1),
(63, 20, 70, 1),
(64, 20, 71, 1),
(65, 20, 72, 1),
(66, 20, 73, 1),
(67, 20, 74, 1),
(68, 20, 75, 1),
(69, 20, 76, 1),
(70, 20, 77, 1),
(71, 20, 78, 1);

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `code_interne` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`code_interne`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ingredient`
--

INSERT INTO `ingredient` (`code_interne`, `description`) VALUES
(1, 'produit toxic');

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

DROP TABLE IF EXISTS `stock`;
CREATE TABLE IF NOT EXISTS `stock` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `adresse` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ingredient` (`id_ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `stock`
--

INSERT INTO `stock` (`id`, `adresse`, `quantity`, `id_ingredient`) VALUES
(3, 'akbou', 220, 1),
(4, 'setif', 180, 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `login` varchar(30) NOT NULL,
  `password` varchar(500) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `adresse` varchar(80) NOT NULL,
  `role` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `login`, `password`, `nom`, `prenom`, `adresse`, `role`) VALUES
(1, 'sab@gmail.com', '$2b$10$ZZRJN9Gj7V5zySRDetNcWOqzuCYoq.twpE6aRlOzfjvsFmOxusjCq', 'sab', 'ber', 'akbou', 'admin');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bon`
--
ALTER TABLE `bon`
  ADD CONSTRAINT `bon_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `element`
--
ALTER TABLE `element`
  ADD CONSTRAINT `element_ibfk_1` FOREIGN KEY (`id_bon`) REFERENCES `bon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredient` (`code_interne`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
