import express from 'express';
import * as pageController from '../controllers/pageController.js';


const router = express.Router();

router.route('/')
    .get(pageController.getIndexPage);

router.route('/login')
    .get(pageController.getLoginPage);

router.route('/register')
    .get(pageController.getRegisterPage);

router.route('/takvim')
    .get(pageController.getCalendarPage);

router.route('/toDo')
    .get(pageController.getToDoPage);




export default router;

