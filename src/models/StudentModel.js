const pool = require("../config/db");

class Student {
  
  // Create a student
  static async createStudent(req, res) {
    const { name, registration, tutorId } = req.body;
    try {
      const newStudent = await pool.query(
        "INSERT INTO students (name, registration, tutor_id) VALUES ($1, $2, $3) RETURNING *",
        [name, registration, tutorId]
      );
      res.json(newStudent.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  // Get all students
  static async getAllStudents(req, res) {
    try {
      const students = await pool.query("SELECT * FROM students");
      res.json(students.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Assign subjects to a student
  static async assignSubjectsToStudent(req, res) {
    const { studentId } = req.params;
    const { subjects } = req.body; // Suponiendo que se pasa una lista de IDs de materias
    try {
      const assignments = subjects.map(async (subjectId) => {
        await pool.query('INSERT INTO student_subjects (student_id, subject_id) VALUES ($1, $2)', [studentId, subjectId]);
      });

      await Promise.all(assignments);
      
      res.json({ message: 'Materias asignadas correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get all subjects by student
  static async getSubjectsByStudent(req, res) {
    const { studentId } = req.params;
    try {
      const subjects = await pool.query(
        "SELECT * FROM subjects WHERE student_id = $1",
        [studentId]
      );
      res.json(subjects.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = Student;
