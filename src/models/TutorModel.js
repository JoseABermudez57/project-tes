const pool = require("../config/db");

class Tutor {
  
  // Create a tutor
  static async createTutor(req, res) {
  const { name } = req.body;
  try {
    const newTutor = await pool.query('INSERT INTO Tutors (name) VALUES ($1) RETURNING *', [name]);
    res.json(newTutor.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  }

  // Get all tutors
  static async getAllTutors(req, res) {
  try {
    const tutors = await pool.query('SELECT * FROM Tutors');
    res.json(tutors.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  }
  
  // Assign a student to a tutor
  static async assignStudents(req, res) {
  const { tutorId } = req.params;
  const { registrationList } = req.body;

  try {
    const existingStudents = await pool.query('SELECT * FROM Students WHERE registration = ANY($1::bigint[])', [registrationList]);
    const existingRegistrations = existingStudents.rows.map(student => student.registration);

    const nonExistingRegistrations = registrationList.filter(registration => !existingRegistrations.includes(registration));

    if (nonExistingRegistrations.length > 0) {
    return res.status(404).json({ error: `Los siguientes registros no corresponden a ningún alumno: ${nonExistingRegistrations.join(', ')}` });
    }

    for (const registration of registrationList) {
    await pool.query('UPDATE Students SET tutor_id = $1 WHERE registration = $2', [tutorId, registration]);
    }

    res.json({ message: 'Alumnos asignados al tutor correctamente.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  }

  // Get all students of a tutor
  static async getAllStudentsByTutor(req, res) {
  const { tutorId } = req.params;

  try {
    const students = await pool.query('SELECT * FROM Students WHERE tutor_id = $1', [tutorId]);
    res.json(students.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  }
  
}

module.exports = Tutor;
