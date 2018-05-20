SET time_zone = "-04:00";

-- create the database
DROP DATABASE IF EXISTS andybao_db;
CREATE DATABASE andybao_db;

-- select the database
USE andybao_db;

-- create the table

CREATE TABLE faqs(
        id INT PRIMARY KEY AUTO_INCREMENT,
        faq_title TINYTEXT NOT NULL,
        faq_info TEXT NOT NULL,
        faq_time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

INSERT INTO `faqs` (`id`, `faq_title`, `faq_info`, `faq_time_stamp`) VALUES
    (1, 'What is the OSAP?', 'OSAP - The Ontario Student Assistance Program is a federally and provincially funded loan and grant program that provides financial assistance to eligible post-secondary students.', '2018-03-28 18:40:14');
INSERT INTO `faqs` (`id`, `faq_title`, `faq_info`, `faq_time_stamp`) VALUES
    (2, 'Are there college organizations that will help me find work, prepare a resume, etc.?', 'Humber Community Employment Services can assist you with your job search FREE of charge.', '2018-03-28 18:40:14');
