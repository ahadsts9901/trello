import { Schema, model } from "mongoose";

let boardSchema = new Schema({
    boardName: {
        type: String,
        maxlength: 120,
        trim: true,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    backgroundImage: {
        type: String,
        maxlength: 1000,
        trim: true,
        required: true,
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: "users",
        default: [],
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

let boardModel;

try {
    boardModel = model('boards');
} catch (error) {
    boardModel = model('boards', boardSchema);
}

export { boardModel };