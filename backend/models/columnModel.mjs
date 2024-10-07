import { Schema, model } from "mongoose";

// {
//     "_id": "w_9r0m0HJ",
//     "boardId": "IbJLYuptc",
//     "boardName": "new",
//     "columnName": "title 123",
//     "dateCreated": "9/27/2024, 5:29:52 PM",
//     "userId": "7iXaRpAeS",
//     "sequence": 1
//   }

let columnSchema = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: "boards",
        required: true,
    },
    boardName: {
        type: String,
        maxlength: 120,
        trim: true,
        required: true,
    },
    columnName: {
        type: String,
        maxlength: 120,
        trim: true,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    sequence: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

let columnModel;

try {
    columnModel = model('columns');
} catch (error) {
    columnModel = model('columns', columnSchema);
}

export { columnModel };