import express from 'express';
import { getAllStudents, addNewStudent, deleteStudent, getStudent, UpdateStudent, findStudent  } from '../controllers/studentController.js'; 

const router = express.Router();

router.route('/').get(getAllStudents).post(addNewStudent);
router.route('/search').get(findStudent); // Define search route separately
router.route('/:id')
  .delete(deleteStudent) // Delete student by ID
  .get(getStudent) // Get student by ID
  .put(UpdateStudent);


export default router;
