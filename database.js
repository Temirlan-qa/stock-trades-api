// database.js
const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "trades.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT, 
            user_id INTEGER, 
            symbol TEXT, 
            shares INTEGER, 
            price INTEGER, 
            timestamp INTEGER
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created
                }
            },
        );
    }
},
);

module.exports = db;
