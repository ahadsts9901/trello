import { Schema, model } from "mongoose";
import { boardNameLength } from "../utils/core.mjs";

// {
//     "_id": "IbJLYuptc",
//     "name": "new",
//     "dateCreated": "9/27/2024, 5:26:39 PM",
//     "createdBy": "7iXaRpAeS",
//     "backgroundImage": "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTg1MDd8MHwxfHNlYXJjaHwzfHxuYXR1cmV8ZW58MHwwfHx8MTcyNzQ0MDcyOXww&ixlib=rb-4.0.3&q=80&w=1080",
//     "users": []
//   }

let boardSchema = new Schema({
    boardName: {
        type: String,
        maxlength: boardNameLength,
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