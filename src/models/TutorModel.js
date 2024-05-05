const pool = require('../config/db');

class Tutor {
  static async getAllTutors(req, res) {
    try {
      const tutors = await pool.query('SELECT * FROM tutors');
      res.json(tutors.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createTutor(req, res) {
    const { name } = req.body;
    try {
      const newTutor = await pool.query('INSERT INTO tutors (name) VALUES ($1) RETURNING *', [name]);
      res.json(newTutor.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = Tutor;