-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2024 at 04:38 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursev_recipehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `inbox`
--

CREATE TABLE `inbox` (
  `id` int(11) NOT NULL,
  `userName` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `item` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_brand` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `serve_size` int(11) NOT NULL,
  `calories` int(11) NOT NULL,
  `calories_fat` int(11) NOT NULL,
  `total_fat` int(11) NOT NULL,
  `mono_fat` int(11) NOT NULL,
  `poly_fat` int(11) NOT NULL,
  `sat_fat` int(11) NOT NULL,
  `trans_fat` int(11) NOT NULL,
  `cholesterol` int(11) NOT NULL,
  `sodium` int(11) NOT NULL,
  `potassium` int(11) NOT NULL,
  `total_carb` int(11) NOT NULL,
  `diet_fiber` int(11) NOT NULL,
  `sugars` int(11) NOT NULL,
  `other_carb` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `vitamin_a` int(11) NOT NULL,
  `vitamin_c` int(11) NOT NULL,
  `calcium` int(11) NOT NULL,
  `iron` int(11) NOT NULL,
  `vitamin_d` int(11) NOT NULL,
  `vitamin_e` int(11) NOT NULL,
  `vitamin_k` int(11) NOT NULL,
  `thiamin` int(11) NOT NULL,
  `riboflavin` int(11) NOT NULL,
  `niacin` int(11) NOT NULL,
  `vitamin_b6` int(11) NOT NULL,
  `folicacid` int(11) NOT NULL,
  `vitamin_b12` int(11) NOT NULL,
  `biotin` int(11) NOT NULL,
  `pantothenic` int(11) NOT NULL,
  `phosphorus` int(11) NOT NULL,
  `iodine` int(11) NOT NULL,
  `magnesium` int(11) NOT NULL,
  `zinc` int(11) NOT NULL,
  `selenium` int(11) NOT NULL,
  `copper` int(11) NOT NULL,
  `manganese` int(11) NOT NULL,
  `chromium` int(11) NOT NULL,
  `molybdenum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `userName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipehouse`
--

CREATE TABLE `recipehouse` (
  `recipeName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipeCat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipeMethod` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipeInst` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipeTime` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipeServe` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing1_amount` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing1_prep` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing1_item` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing2_amount` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing2_prep` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing2_item` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing3_amount` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing3_prep` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing3_item` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing4_amount` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing4_prep` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ing4_item` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inbox`
--
ALTER TABLE `inbox`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inbox`
--
ALTER TABLE `inbox`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
