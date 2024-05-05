const pool = require('./db');

class Student {
  static async getAllStudents(req, res) {
    try {
      const students = await pool.query('SELECT * FROM students');
      res.json(students.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getStudentsByTutor(req, res) {
    const { tutorId } = req.params;
    try {
      const students = await pool.query('SELECT * FROM students WHERE tutor_id = $1', [tutorId]);
      res.json(students.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createStudent(req, res) {
    const { name, registration, tutorId } = req.body;
    try {
      const newStudent = await pool.query('INSERT INTO students (name, registration, tutor_id) VALUES ($1, $2, $3) RETURNING *', [name, registration, tutorId]);
      res.json(newStudent.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSubjectsByStudent(req, res) {
    const { studentId } = req.params;
    try {
      const subjects = await pool.query('SELECT * FROM subjects WHERE student_id = $1', [studentId]);
      res.json(subjects.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = Student;
