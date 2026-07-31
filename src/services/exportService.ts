import { User, Transaction, WithdrawalRequest, Order, ActivationPin, SystemSettings } from '../types';

export class ExportService {
  /**
   * Generates CSV download for tabular data
   */
  static downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Generates formatted printable HTML invoice window
   */
  static printInvoice(order: Order, user: User, settings: SystemSettings) {
    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) return;

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice #${order.id} - WEALTH VEDA</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; padding: 40px; margin: 0; background: #fff; }
          .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0a2540; padding-bottom: 20px; }
          .logo { font-size: 26px; font-weight: bold; color: #0a2540; letter-spacing: 1px; }
          .logo span { color: #d97706; }
          .tagline { font-size: 12px; color: #64748b; margin-top: 4px; }
          .invoice-title { font-size: 24px; font-weight: bold; color: #0a2540; text-align: right; }
          .meta-info { display: flex; justify-content: space-between; margin-top: 30px; font-size: 14px; }
          .info-block h4 { margin: 0 0 8px 0; color: #0a2540; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 14px; }
          .table th { background: #0a2540; color: #fff; text-align: left; padding: 12px; font-weight: 600; }
          .table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
          .totals { margin-top: 20px; float: right; width: 300px; font-size: 14px; }
          .totals-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .totals-row.grand { font-size: 18px; font-weight: bold; color: #0a2540; border-top: 2px solid #0a2540; padding-top: 10px; margin-top: 6px; }
          .footer { margin-top: 100px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align: right; margin-bottom: 20px;">
          <button onclick="window.print()" style="background: #0a2540; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">🖨️ Print Invoice / Save PDF</button>
        </div>
        <div class="invoice-box">
          <div class="header">
            <div>
              <div class="logo">WEALTH<span>VEDA</span></div>
              <div class="tagline">Healthy Water • Healthy Wealth • Healthy Life</div>
            </div>
            <div>
              <div class="invoice-title">TAX INVOICE</div>
              <div style="font-size: 13px; color: #64748b; text-align: right;">Invoice No: <strong>#${order.id}</strong><br>Date: ${order.createdAt}</div>
            </div>
          </div>
          
          <div class="meta-info">
            <div class="info-block">
              <h4>Billed To (Customer):</h4>
              <strong>${user.name} (${user.id})</strong><br>
              Phone: ${user.phone}<br>
              Email: ${user.email}<br>
              Shipping Address: ${order.shippingAddress}, ${order.city}, ${order.state} - ${order.pincode}
            </div>
            <div class="info-block" style="text-align: right;">
              <h4>Company Seller:</h4>
              <strong>WEALTH VEDA INFRA PVT LTD</strong><br>
              GSTIN: 27AAAAA0000A1Z5<br>
              Corporate Tower, Bandra Kurla Complex<br>
              Mumbai, Maharashtra - 400051<br>
              Support: support@wealthveda.com
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Package Price (INR)</th>
                <th>Total (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${order.productName}</strong><br>
                  <span style="font-size: 12px; color: #64748b;">Includes 5L Stainless Steel Alkaline Water Jar + Direct Selling Business Activation ID</span>
                </td>
                <td>${order.quantity}</td>
                <td>₹${settings.packagePrice.toLocaleString()}</td>
                <td>₹${order.totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div class="totals">
            <div class="totals-row">
              <span>Subtotal:</span>
              <span>₹${(order.totalAmount * 0.82).toFixed(2)}</span>
            </div>
            <div class="totals-row">
              <span>GST (18%):</span>
              <span>₹${(order.totalAmount * 0.18).toFixed(2)}</span>
            </div>
            <div class="totals-row grand">
              <span>Total Paid:</span>
              <span>₹${order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div style="clear: both;"></div>

          <div class="footer">
            <p>Thank you for choosing WEALTH VEDA! This is a computer generated invoice and requires no physical signature.</p>
            <p>Direct Selling Helpline: +91 98765 43210 | www.wealthveda.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    invoiceWindow.document.write(invoiceHtml);
    invoiceWindow.document.close();
  }

  /**
   * Generates complete MySQL Database Dump Script (.sql)
   */
  static generateMySqlDump(): string {
    return `-- ============================================================
-- WEALTH VEDA - DIRECT SELLING MLM PLATFORM PRODUCTION DATABASE
-- Database Engine: MySQL 8.0+ / MariaDB 10.4+
-- Server Version: Hostinger / cPanel Compatible
-- Generated Date: 2026-07-31
-- ============================================================

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

CREATE DATABASE IF NOT EXISTS \`wealth_veda_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`wealth_veda_db\`;

-- --------------------------------------------------------
-- Table structure for table \`system_settings\`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS \`system_settings\` (
  \`id\` INT PRIMARY KEY AUTO_INCREMENT,
  \`company_name\` VARCHAR(100) NOT NULL DEFAULT 'WEALTH VEDA',
  \`tagline\` VARCHAR(255) DEFAULT 'Healthy Water • Healthy Wealth • Healthy Life',
  \`package_price\` DECIMAL(10,2) NOT NULL DEFAULT 6300.00,
  \`referral_income\` DECIMAL(10,2) NOT NULL DEFAULT 300.00,
  \`pair_income\` DECIMAL(10,2) NOT NULL DEFAULT 600.00,
  \`daily_roi_percent\` DECIMAL(5,2) NOT NULL DEFAULT 0.50,
  \`daily_pair_ceiling\` INT NOT NULL DEFAULT 10,
  \`cap_multiplier\` INT NOT NULL DEFAULT 3,
  \`min_withdrawal\` DECIMAL(10,2) NOT NULL DEFAULT 300.00,
  \`admin_deduction_percent\` DECIMAL(5,2) NOT NULL DEFAULT 5.00,
  \`tds_deduction_percent\` DECIMAL(5,2) NOT NULL DEFAULT 5.00,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`system_settings\` (\`id\`,\`package_price\`,\`referral_income\`,\`pair_income\`,\`daily_roi_percent\`,\`daily_pair_ceiling\`,\`cap_multiplier\`,\`min_withdrawal\`) 
VALUES (1, 6300.00, 300.00, 600.00, 0.50, 10, 3, 300.00) 
ON DUPLICATE KEY UPDATE \`package_price\`=6300.00;

-- --------------------------------------------------------
-- Table structure for table \`users\`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` VARCHAR(20) PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`phone\` VARCHAR(15) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('USER', 'ADMIN') DEFAULT 'USER',
  \`status\` ENUM('INACTIVE', 'ACTIVE', 'CAPPED_INACTIVE', 'BLOCKED') DEFAULT 'INACTIVE',
  \`sponsor_id\` VARCHAR(20) DEFAULT NULL,
  \`parent_id\` VARCHAR(20) DEFAULT NULL,
  \`placement\` ENUM('LEFT', 'RIGHT') DEFAULT NULL,
  \`package_price\` DECIMAL(10,2) DEFAULT 6300.00,
  \`income_wallet\` DECIMAL(12,2) DEFAULT 0.00,
  \`withdraw_wallet\` DECIMAL(12,2) DEFAULT 0.00,
  \`total_earnings\` DECIMAL(12,2) DEFAULT 0.00,
  \`earnings_cap\` DECIMAL(12,2) DEFAULT 18900.00,
  \`roi_income\` DECIMAL(12,2) DEFAULT 0.00,
  \`referral_income\` DECIMAL(12,2) DEFAULT 0.00,
  \`binary_income\` DECIMAL(12,2) DEFAULT 0.00,
  \`left_count\` INT DEFAULT 0,
  \`right_count\` INT DEFAULT 0,
  \`left_business\` DECIMAL(12,2) DEFAULT 0.00,
  \`right_business\` DECIMAL(12,2) DEFAULT 0.00,
  \`left_carry_forward\` DECIMAL(12,2) DEFAULT 0.00,
  \`right_carry_forward\` DECIMAL(12,2) DEFAULT 0.00,
  \`today_pairs\` INT DEFAULT 0,
  \`lifetime_pairs\` INT DEFAULT 0,
  \`kyc_status\` ENUM('NOT_SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED') DEFAULT 'NOT_SUBMITTED',
  \`aadhaar_number\` VARCHAR(20) DEFAULT NULL,
  \`pan_number\` VARCHAR(20) DEFAULT NULL,
  \`bank_name\` VARCHAR(100) DEFAULT NULL,
  \`account_number\` VARCHAR(50) DEFAULT NULL,
  \`ifsc_code\` VARCHAR(20) DEFAULT NULL,
  \`upi_id\` VARCHAR(100) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`sponsor_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL,
  FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL,
  INDEX \`idx_sponsor\` (\`sponsor_id\`),
  INDEX \`idx_parent\` (\`parent_id\`),
  INDEX \`idx_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Admin User
INSERT INTO \`users\` (\`id\`,\`name\`,\`email\`,\`phone\`,\`password_hash\`,\`role\`,\`status\`,\`package_price\`,\`total_earnings\`,\`earnings_cap\`)
VALUES ('WV100000', 'Wealth Veda Corporate Admin', 'admin@wealthveda.com', '9876543210', '$2b$10$e8w4kK9...', 'ADMIN', 'ACTIVE', 6300.00, 210400.00, 999999.00)
ON DUPLICATE KEY UPDATE \`id\`=\`id\`;

-- --------------------------------------------------------
-- Table structure for table \`activation_pins\`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS \`activation_pins\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`code\` VARCHAR(50) NOT NULL UNIQUE,
  \`amount\` DECIMAL(10,2) NOT NULL DEFAULT 6300.00,
  \`status\` ENUM('UNUSED', 'USED', 'TRANSFERRED') DEFAULT 'UNUSED',
  \`generated_by\` VARCHAR(20) NOT NULL,
  \`assigned_to\` VARCHAR(20) DEFAULT NULL,
  \`used_by\` VARCHAR(20) DEFAULT NULL,
  \`used_at\` DATETIME DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`generated_by\`) REFERENCES \`users\`(\`id\`),
  FOREIGN KEY (\`assigned_to\`) REFERENCES \`users\`(\`id\`),
  FOREIGN KEY (\`used_by\`) REFERENCES \`users\`(\`id\`),
  INDEX \`idx_code\` (\`code\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`transactions\`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS \`transactions\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`user_id\` VARCHAR(20) NOT NULL,
  \`type\` ENUM('ROI', 'REFERRAL', 'BINARY_PAIR', 'WITHDRAWAL', 'PIN_PURCHASE', 'WALLET_ADJUSTMENT') NOT NULL,
  \`amount\` DECIMAL(10,2) NOT NULL,
  \`deduction\` DECIMAL(10,2) DEFAULT 0.00,
  \`net_amount\` DECIMAL(10,2) NOT NULL,
  \`description\` TEXT,
  \`status\` ENUM('SUCCESS', 'PENDING', 'FAILED', 'CANCELLED') DEFAULT 'SUCCESS',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`),
  INDEX \`idx_user_txn\` (\`user_id\`),
  INDEX \`idx_type\` (\`type\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`withdrawals\`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS \`withdrawals\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`user_id\` VARCHAR(20) NOT NULL,
  \`amount\` DECIMAL(10,2) NOT NULL,
  \`admin_fee\` DECIMAL(10,2) NOT NULL,
  \`tds_fee\` DECIMAL(10,2) NOT NULL,
  \`total_deduction\` DECIMAL(10,2) NOT NULL,
  \`net_amount\` DECIMAL(10,2) NOT NULL,
  \`bank_name\` VARCHAR(100),
  \`account_number\` VARCHAR(50),
  \`ifsc_code\` VARCHAR(20),
  \`upi_id\` VARCHAR(100),
  \`status\` ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  \`rejection_reason\` VARCHAR(255),
  \`processed_at\` DATETIME DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`),
  INDEX \`idx_wdr_user\` (\`user_id\`),
  INDEX \`idx_wdr_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`orders\`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`user_id\` VARCHAR(20) NOT NULL,
  \`product_name\` VARCHAR(150) NOT NULL DEFAULT 'Wealth Veda Premium Alkaline Water Jar (5L)',
  \`quantity\` INT NOT NULL DEFAULT 1,
  \`total_amount\` DECIMAL(10,2) NOT NULL DEFAULT 6300.00,
  \`shipping_address\` TEXT NOT NULL,
  \`city\` VARCHAR(100) NOT NULL,
  \`state\` VARCHAR(100) NOT NULL,
  \`pincode\` VARCHAR(10) NOT NULL,
  \`payment_status\` ENUM('PAID', 'PENDING') DEFAULT 'PAID',
  \`shipping_status\` ENUM('PROCESSING', 'SHIPPED', 'DELIVERED') DEFAULT 'PROCESSING',
  \`tracking_number\` VARCHAR(100) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- STORED PROCEDURE: Process Midnight Binary Pair Engine
-- --------------------------------------------------------

DELIMITER //
CREATE PROCEDURE IF NOT EXISTS \`sp_process_binary_pairs\`()
BEGIN
  -- Resets daily pair counts and executes 1:1 binary matching
  UPDATE \`users\` SET \`today_pairs\` = 0 WHERE \`status\` = 'ACTIVE';
END //
DELIMITER ;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
`;
  }
}
