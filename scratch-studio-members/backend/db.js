const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'studios.db');
const DATA_DIR = path.dirname(DB_PATH);

let db;

const initialize = () => {
  // Create data directory if not exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initialize database
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS studios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studio_id TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studio_id TEXT NOT NULL,
      username TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      avatar_url TEXT,
      profile_url TEXT,
      fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studio_id) REFERENCES studios(studio_id),
      UNIQUE(studio_id, username, role)
    );

    CREATE TABLE IF NOT EXISTS fetch_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studio_id TEXT NOT NULL,
      status TEXT,
      error_message TEXT,
      fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studio_id) REFERENCES studios(studio_id)
    );
  `);

  console.log('Database initialized successfully');
};

const getStudio = (studioId) => {
  const stmt = db.prepare('SELECT * FROM studios WHERE studio_id = ?');
  return stmt.get(studioId);
};

const getAllStudios = () => {
  const stmt = db.prepare('SELECT * FROM studios ORDER BY created_at DESC');
  return stmt.all();
};

const addStudio = (studioId, name = null) => {
  const stmt = db.prepare(
    'INSERT INTO studios (studio_id, name) VALUES (?, ?)'
  );
  const result = stmt.run(studioId, name);
  return result;
};

const deleteStudio = (studioId) => {
  const stmt = db.prepare('DELETE FROM studios WHERE studio_id = ?');
  const result = stmt.run(studioId);
  // Also delete associated members
  const deleteMembers = db.prepare('DELETE FROM members WHERE studio_id = ?');
  deleteMembers.run(studioId);
  return result;
};

const addMembers = (studioId, members, role) => {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO members (studio_id, username, user_id, role, avatar_url, profile_url, fetched_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  const insertMany = db.transaction((members) => {
    for (const member of members) {
      stmt.run(
        studioId,
        member.username,
        member.id,
        role,
        `https://uploads.scratch.mit.edu/users/avatars/${member.id}.png`,
        `https://scratch.mit.edu/users/${member.username}/`
      );
    }
  });
  insertMany(members);
};

const getMembers = (studioId) => {
  const stmt = db.prepare(`
    SELECT * FROM members
    WHERE studio_id = ?
    ORDER BY role DESC, username ASC
  `);
  return stmt.all(studioId);
};

const clearMembers = (studioId) => {
  const stmt = db.prepare('DELETE FROM members WHERE studio_id = ?');
  return stmt.run(studioId);
};

const addFetchLog = (studioId, status, errorMessage = null) => {
  const stmt = db.prepare(
    'INSERT INTO fetch_logs (studio_id, status, error_message) VALUES (?, ?, ?)'
  );
  return stmt.run(studioId, status, errorMessage);
};

module.exports = {
  initialize,
  getStudio,
  getAllStudios,
  addStudio,
  deleteStudio,
  addMembers,
  getMembers,
  clearMembers,
  addFetchLog,
};
