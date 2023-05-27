import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;

mongoose.set('strictQuery', false);

const ToDoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    theTime: {
        type: Date,
        required: true
    },
    finishTime: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});




const ToDo = mongoose.model('ToDo', ToDoSchema);

export default ToDo;
