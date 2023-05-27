import bcrypt from 'bcrypt';
import User from "../models/User.js";

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    };
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        let same = await bcrypt.compare(password, user.password);
        if (same) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.status(200).redirect('/');

        } else {
            res.status(400).redirect('/login');
        };

    } catch (error) {
        res.status(400).redirect('/register');
    };
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.status(200).redirect('/');
    });
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);

        res.status(200).redirect('/');
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        });
    };
};


export { createUser, loginUser, logoutUser, deleteUser };