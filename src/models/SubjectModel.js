const pool = require("./db");

class Subject {
  static async createSubject(req, res) {
    const { name, studentId } = req.body;
    try {
      const newSubject = await pool.query(
        "INSERT INTO subjects (name, student_id) VALUES ($1, $2) RETURNING *",
        [name, studentId]
      );
      res.json(newSubject.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = Subject;
