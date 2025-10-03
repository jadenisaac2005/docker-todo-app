// Import required libraries
const express = require('express');
const { Pool } = require('pg');

// ---- 1. Configure Server and Database Connection ----
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Create a new pool of connections to the database
// It reads connection details from environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// ---- 2. Define API Routes ----

// Simple route for the homepage
app.get('/', (req, res) => {
    res.send('<h1>To-Do List Backend</h1><p>API is running...</p>');
});

// GET all todos
app.get('/todos', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM todos');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
        "INSERT INTO todos (description) VALUES($1) RETURNING *",
        [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// ---- 3. Start the Server ----
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
    // Let's also try to connect to the DB on startup to see if it works
    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
        console.error('Error connecting to the database:', err.stack);
        } else {
        console.log('Successfully connected to the database at:', res.rows[0].now);
        }
    });
});
