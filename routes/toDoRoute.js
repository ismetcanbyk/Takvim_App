import express from 'express';
import * as toDoController from '../controllers/toDoController.js';


const router = express.Router();

router.route('/')
    .post(toDoController.createToDo);

router.route('/:id')
    .delete(toDoController.deleteToDo);

router.route('/update/:id')
    .get(toDoController.getUpdateToDo)
    .post(toDoController.updateTodo);



export default router;