const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // your MySQL username
    password: "Sowmya@2002",  // your MySQL password
    database: "memorygame"
});

// Check connection
db.connect(err => {
    if (err) {
        console.log("MySQL Connection Error:", err);
    } else {
        console.log("MySQL Connected!");
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Save score
app.post("/score", (req, res) => {
    const { username, moves, time_taken } = req.body;

    const sql = "INSERT INTO scores (username, moves, time_taken) VALUES (?, ?, ?)";
    
    db.query(sql, [username, moves, time_taken], (err, result) => {
        if (err) return res.json({ error: err });
        res.json({ message: "Score saved!" });
    });
});

// Leaderboard route
app.get("/leaderboard", (req, res) => {
    db.query("SELECT * FROM scores ORDER BY time_taken ASC LIMIT 10", (err, results) => {
        if (err) return res.json({ error: err });
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
