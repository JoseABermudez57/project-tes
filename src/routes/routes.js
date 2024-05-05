const express = require('express');
const Tutor = require('../models/TutorModel');
const Student = require('../models/StudentModel');
const Subject = require('../models/SubjectModel');

const router = express.Router();

// Tutors management routes
router.post('/tutors', Tutor.createTutor);
router.get('/tutors', Tutor.getAllTutors);
router.post('/tutors/:tutorId/students', Tutor.assignStudents);
router.get('/tutors/:tutorId/students', Tutor.getAllStudentsByTutor);

// Students management routes
router.post('/students', Student.createStudent);
router.get('/students', Student.getAllStudents);
router.post('/students/:studentId/subjects', Student.assignSubjectsToStudent);
router.get('/students/:studentId/subjects', Student.getSubjectsByStudent);

// Subjects management routes
router.post('/subjects', Subject.createSubject);

module.exports = router;
