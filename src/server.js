const express = require('express');

const app = express();

app.use(express.json());

students = []
tutors = ["Carlos Alberto Díaz Hernandez", "Jorge Luis García", "Miguel Angel Sánchez"]
subject = ["SOA", "ENGIX", "MobileDevII", "InfoSec", "DM", "SPM", "OWEII"]


// Tutors management guidelines

// Create a tutor
app.post('/api/v1/tutors', (req, res) => {
    res.send('Hola mundo');
});

// Get all tutors
app.get('/api/v1/tutors', (req, res) => {
    res.send(tutors);
});

// Get all students of a tutor
app.get('/api/v1/tutors/:tutor/students', (req, res) => {
    res.send('Hola mundo');
});


// Students management guidelines

// Create a student
app.post('/api/v1/students', (req, res) => {
    res.send('Hola mundo');
});

// Get all students
app.get('/api/v1/students', (req, res) => {
    res.send('Hola mundo');
});

// Get all subjects of a student
app.get('/api/v1/students/:student/subjects', (req, res) => {
    res.send('Hola mundo');
});


// Subjects management guidelines

// Create a subject
app.post('/api/v1/subjects', (req, res) => {
    res.send('Hola mundo');
});

// Assign a student to a tutor
app.post('/api/v1/tutors/:tutor/students/:student', (req, res) => {
    res.send('Hola mundo');
});

// Assign a subject to a student
app.post('/api/v1/students/:student/subjects/:subject', (req, res) => {
    res.send('Hola mundo');
});


app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000/');
});

