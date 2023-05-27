import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import methodOverride from 'method-override';
import pageRouter from './routes/pageRoute.js';
import userRouter from './routes/userRoute.js';
import toDoRoute from './routes/toDoRoute.js';

const app = express();
const port = 3000;


//Connect DB

mongoose.connect('mongodb://localhost/calendar-db')
    .then(() => {
        console.log("DB Connect Successfuly");
    })
    .catch((err) => {
        console.log(err);
    });


//Template Engine 
app.set("view engine", "ejs");

//Global Veriables
global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'my keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/calendar-db' })
}));
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

-
    //Routes
    app.use('*', (req, res, next) => {
        userIN = req.session.userID;
        next();
    });
app.use('/', pageRouter);
app.use('/users', userRouter);
app.use('/toDo', toDoRoute);


app.listen(port, () => {
    console.log(`App started on port ${port}.`)
});