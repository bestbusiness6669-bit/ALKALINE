# WEALTH VEDA - Hostinger Deployment Guide

This guide details how to deploy **WEALTH VEDA** on Hostinger (cPanel Web Hosting or Hostinger VPS / Node.js App Service).

---

## Method A: Hostinger Node.js Application Setup (Recommended)

### Step 1: Create MySQL Database in Hostinger cPanel
1. Log into your **Hostinger hPanel**.
2. Go to **Databases -> MySQL Databases**.
3. Create a new Database name (e.g., `u123456_wealthveda`) and User (e.g., `u123456_admin`) with a strong password.
4. Click **phpMyAdmin** next to the newly created database.
5. Click **Import** and select the exported `wealth_veda.sql` file.

### Step 2: Set Up Node.js Application in hPanel
1. In Hostinger hPanel, search for **Setup Node.js App**.
2. Click **Create Application**:
   * **Node.js version**: 18.x or 20.x
   * **Application Mode**: Production
   * **Application Root**: `wealthveda`
   * **Application URL**: `https://yourdomain.com`
   * **Application Startup File**: `dist/server.cjs`
3. Click **Create**.

### Step 3: Upload & Build Project Files
1. Build the production package locally or on your CI/CD pipeline:
   ```bash
   npm run build
   ```
2. Compress `dist/`, `package.json`, `.env`, and `public/` into a `.zip` archive.
3. Use Hostinger **File Manager** to upload and extract the files inside your Node.js application folder (`/public_html/wealthveda`).
4. In Hostinger hPanel Node.js section, click **Run NPM Install**.
5. Restart the Application.

---

## Method B: Automation Cron Jobs Setup for ROI & Binary Pair Matching

In Hostinger hPanel, go to **Advanced -> Cron Jobs** and add two scheduled tasks:

1. **Daily ROI Cron (Monday to Friday at 00:05 AM IST)**:
   ```bash
   0 0 * * 1-5 curl -s https://yourdomain.com/api/cron/roi > /dev/null
   ```

2. **Midnight Binary Pair Engine Cron (Every night at 11:59 PM IST)**:
   ```bash
   59 23 * * * curl -s https://yourdomain.com/api/cron/pair-matching > /dev/null
   ```
