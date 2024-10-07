import { Schema, model } from "mongoose";

// {
//     "_id": "LuKGJ5FGN",
//     "boardId": "IbJLYuptc",
//     "columnId": "-P0ajeJQH",
//     "title": "qwe",
//     "type": ["bug", "feature", "performance", "information"],
//     "dateCreated": "9/27/2024, 5:30:53 PM",
//     "userId": "7iXaRpAeS",
//     "sequence": 1,
//     "description": ""
//   }

let cardSchema = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: "boards",
        required: true,
    },
    columnId: {
        type: Schema.Types.ObjectId,
        ref: "columns",
        required: true,
    },
    title: {
        type: String,
        maxlength: 120,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        maxlength: 420,
        trim: true,
        required: true,
    },
    typs: {
        type: String,
        trim: true,
        default: null,
        enum: ["BUG", "FEATURE", "PERFORMANCE", "INFORMATION"],
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

let cardModel;

try {
    cardModel = model('cards');
} catch (error) {
    cardModel = model('cards', cardSchema);
}

export { cardModel };