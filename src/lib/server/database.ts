import Database from 'better-sqlite3';
import { hashSync } from 'bcryptjs';

const db = new Database('salon.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pendapatan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE NOT NULL,
    kategori TEXT NOT NULL,
    deskripsi TEXT,
    jumlah REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pengeluaran (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE NOT NULL,
    kategori TEXT NOT NULL,
    deskripsi TEXT,
    jumlah REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS beban_operasional (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE NOT NULL,
    kategori TEXT NOT NULL,
    deskripsi TEXT,
    jumlah REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS beban_penyusutan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE NOT NULL,
    nama_aset TEXT NOT NULL,
    nilai_aset REAL NOT NULL,
    umur_ekonomis INTEGER NOT NULL,
    nilai_penyusutan REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create default admin user if not exists
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
if (userCount.count === 0) {
  const hashedPassword = hashSync('admin123', 10);
  db.prepare(`
    INSERT INTO users (username, password, full_name)
    VALUES (?, ?, ?)
  `).run('admin', hashedPassword, 'Administrator');
  console.log('Default admin user created (username: admin, password: admin123)');
}

export default db;
