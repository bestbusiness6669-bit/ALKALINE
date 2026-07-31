# WEALTH VEDA - Local & Production Installation Guide

Follow these step-by-step instructions to set up and run **WEALTH VEDA** locally or on your development server.

---

## 🛠️ Prerequisites
* **Node.js**: v18.x or v20.x installed
* **npm**: v9.x or later
* **MySQL Database**: MySQL 8.0+ or MariaDB 10.4+ (Optional for local mode, required for Hostinger production)

---

## 1. Local Setup Instructions

1. **Clone / Download the codebase** into your project directory.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Configuration**:
   Create a `.env` file based on `.env.example`:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password
   DB_NAME=wealth_veda_db
   JWT_SECRET=wealth_veda_super_secret_jwt_key_2026
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 2. MySQL Database Setup

1. Open **phpMyAdmin** or your MySQL command line client.
2. Create a new database named `wealth_veda_db`:
   ```sql
   CREATE DATABASE wealth_veda_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Import the generated SQL file:
   * Click **Export Database / SQL Dump** inside the Admin Panel -> Reports & Database tab.
   * Or use command line:
     ```bash
     mysql -u root -p wealth_veda_db < wealth_veda.sql
     ```
