-- HIREX – AI Interview Platform
-- MySQL Database Schema
-- Run: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS hirex_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hirex_db;

-- ─────────────────────────────────────────────────────────────
-- Users
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(100) NOT NULL,
    email            VARCHAR(255) NOT NULL UNIQUE,
    hashed_password  VARCHAR(255) NOT NULL,
    role             ENUM('candidate','hr','admin') DEFAULT 'candidate',
    is_verified      BOOLEAN DEFAULT FALSE,
    is_active        BOOLEAN DEFAULT TRUE,
    otp_code         VARCHAR(6),
    otp_expires_at   DATETIME,
    profile_pic      VARCHAR(500),
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role  (role)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Candidate Profiles
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS candidate_profiles (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    user_id          INT NOT NULL UNIQUE,
    phone            VARCHAR(20),
    city             VARCHAR(100),
    resume_url       VARCHAR(500),
    resume_text      TEXT,
    skills           TEXT,
    experience_years DECIMAL(4,1) DEFAULT 0,
    education        TEXT,
    linkedin_url     VARCHAR(500),
    github_url       VARCHAR(500),
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- HR Profiles
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hr_profiles (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL UNIQUE,
    company_name VARCHAR(200),
    department   VARCHAR(100),
    phone        VARCHAR(20),
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Jobs
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    created_by       INT NOT NULL,
    title            VARCHAR(200) NOT NULL,
    description      TEXT,
    requirements     TEXT,
    location         VARCHAR(200),
    job_type         VARCHAR(50) DEFAULT 'full_time',
    salary_min       DECIMAL(12,2),
    salary_max       DECIMAL(12,2),
    status           ENUM('active','closed','draft') DEFAULT 'active',
    min_match_score  DECIMAL(5,2) DEFAULT 60.00,
    deadline         DATETIME,
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_created_by (created_by)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Job Test Rounds
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_test_rounds (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    job_id               INT NOT NULL,
    round_type           VARCHAR(50) NOT NULL,
    round_order          INT NOT NULL,
    is_required          BOOLEAN DEFAULT TRUE,
    time_limit_minutes   INT DEFAULT 60,
    pass_score           DECIMAL(5,2) DEFAULT 60.00,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    INDEX idx_job_id (job_id)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Applications
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    job_id             INT NOT NULL,
    candidate_id       INT NOT NULL,
    resume_match_score DECIMAL(5,2),
    is_eligible        BOOLEAN DEFAULT TRUE,
    is_shortlisted     BOOLEAN DEFAULT FALSE,
    current_round      INT DEFAULT 1,
    overall_score      DECIMAL(5,2),
    status             VARCHAR(50) DEFAULT 'applied',
    applied_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at         DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_application (job_id, candidate_id),
    FOREIGN KEY (job_id)          REFERENCES jobs(id)  ON DELETE CASCADE,
    FOREIGN KEY (candidate_id)    REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_candidate    (candidate_id),
    INDEX idx_shortlisted  (is_shortlisted),
    INDEX idx_overall      (overall_score)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Test Results (per round, per application)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS test_results (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    application_id      INT NOT NULL,
    round_type          VARCHAR(50) NOT NULL,
    round_number        INT NOT NULL,
    score               DECIMAL(5,2),
    max_score           DECIMAL(5,2) DEFAULT 100.00,
    status              ENUM('pending','in_progress','completed','skipped') DEFAULT 'pending',
    started_at          DATETIME,
    completed_at        DATETIME,
    time_taken_seconds  INT,
    cheat_score         DECIMAL(5,2) DEFAULT 0.00,
    tab_switches        INT DEFAULT 0,
    face_detected       BOOLEAN DEFAULT TRUE,
    answers_data        JSON,
    ai_feedback         TEXT,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application (application_id),
    INDEX idx_round_type  (round_type)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Questions Bank
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS questions (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    round_type    VARCHAR(50) NOT NULL,
    question_text TEXT NOT NULL,
    options       JSON,
    correct_index INT,
    difficulty    ENUM('easy','medium','hard') DEFAULT 'medium',
    topic         VARCHAR(100),
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_round_type (round_type),
    INDEX idx_difficulty (difficulty)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Notifications
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    title      VARCHAR(200) NOT NULL,
    message    TEXT,
    type       VARCHAR(50) DEFAULT 'info',
    is_read    BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_unread (user_id, is_read)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Seed: default admin user (password: Admin@123)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO users (name, email, hashed_password, role, is_verified, is_active)
VALUES (
    'Super Admin',
    'admin@hirex.com',
    '$2b$12$exampleHashedPasswordChangeThis',
    'admin',
    TRUE,
    TRUE
);

-- Seed: sample job rounds config
INSERT IGNORE INTO job_test_rounds (job_id, round_type, round_order, time_limit_minutes, pass_score)
VALUES
    (1, 'aptitude',         1, 60,  60),
    (1, 'reasoning',        2, 60,  60),
    (1, 'coding',           3, 90,  60),
    (1, 'typing',           4, 10,  50),
    (1, 'group_discussion', 5, 30,  60),
    (1, 'ai_interview',     6, 40,  60);
