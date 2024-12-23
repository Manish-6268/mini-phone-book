const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//  connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'phonebook'
});

// database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

//  add a contact
app.post('/add_contact', (req, res) => {
    const { name, phone_number, address } = req.body;
    const query = 'INSERT INTO contacts (name, phone_number, address) VALUES (?, ?, ?)';
    db.query(query, [name, phone_number, address], (err, result) => {
        if (err) throw err;
        res.send('Contact added successfully');
    });
});

// Route 
app.get('/contacts', (req, res) => {
    const query = 'SELECT * FROM contacts';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
