import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    sender: {
        type: String, 
        required: [true, 'Name (String) is required.']
    },
    body: {
        type: String, 
        required: [true, 'Name (String) is required.']
    },
});
const MessageModel = mongoose.model('Message', MessageSchema);
module.exports = MessageModel;
