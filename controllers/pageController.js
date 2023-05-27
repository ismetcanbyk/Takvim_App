import User from "../models/User.js";
import ToDo from "../models/ToDo.js";

const getIndexPage = async (req, res) => {
    try {
        const query = req.query.search;

        const user = await User.findById(req.session.userID).populate('toDo');
        const users = await User.find({});
        let toDo = await ToDo.find({ user: req.session.userID }).sort('theTime');

        let filter = {};
        if (query) {
            filter = { theTime: new Date(query) }
            toDo = await ToDo.find({
                theTime: { $gte: new Date(query) }
            }).limit(1).populate('user');
        };

        res.status(200).render('index', {
            page_name: "index",
            user,
            toDo,
            users
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error
        });
    };
};

const getCalendarPage = (req, res) => {
    res.status(200).render('takvim', {
        page_name: "calendar"
    });
};

const getToDoPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate('toDo');
    const toDo = await ToDo.find({ user: req.session.userID }).sort('theTime');
    res.status(200).render('toDo', {
        page_name: "toDo",
        toDo
    });
};


const getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: "login"
    });
};

const getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: "register"
    });
};


export { getIndexPage, getLoginPage, getRegisterPage, getCalendarPage, getToDoPage };