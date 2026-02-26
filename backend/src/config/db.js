const sqlite3 = require("sqlite3").verbose();

const path = require("path");
const dbPath = path.join(__dirname, '../databases/database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if(err) {
        console.error("FAILED TO CONNECT TO DATABASE", err);
    } 
    else {
        console.log("DATABASE CONNECTED SUCESSFULLY");
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('user','admin')),
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company_name TEXT NOT NULL,
        description TEXT NOT NULL,
        apply_link TEXT NOT NULL UNIQUE,
        category TEXT,
        location TEXT,
        posted_by INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
        admin_note TEXT,
        expiry_date DATETIME NOT NULL,
        is_deleted INTEGER NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(posted_by) REFERENCES users(id)
    )`);
});


module.exports = db;