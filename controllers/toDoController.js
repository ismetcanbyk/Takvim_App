import ToDo from "../models/ToDo.js";

const createToDo = async (req, res) => {
    try {
        const todo = await ToDo.create({
            title: req.body.title,
            description: req.body.description,
            theTime: req.body.theTime,
            finishTime: req.body.finishTime,
            user: req.session.userID
        });

        res.status(201).redirect('/toDo');


    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    };
};

const deleteToDo = async (req, res) => {
    try {
        const toDo = await ToDo.findOneAndRemove({ _id: req.params.id });
        res.status(200).redirect('/toDo')
    } catch (error) {
        res.status(400).json({
            error
        })
    }
};



const getUpdateToDo = async (req, res) => {
    const toDo = await ToDo.findOne({ _id: req.params.id });
    res.status(200).render('updateToDo', {
        page_name: "toDo",
        toDo
    });
};


const updateTodo = async (req, res) => {
    try {
        const toDo = await ToDo.findOne({ _id: req.params.id });
        toDo.title = req.body.title;
        toDo.description = req.body.description;
        toDo.theTime = req.body.theTime;
        toDo.finishTime = req.body.finishTime;

        toDo.save();
        res.status(200).redirect('/toDo');

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

export { createToDo, deleteToDo, getUpdateToDo, updateTodo };