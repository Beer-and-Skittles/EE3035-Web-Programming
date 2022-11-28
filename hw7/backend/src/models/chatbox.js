import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    sender: {type: String, required: [true, 'Sender (String) is required.']},
    to: {type: String, required: [true, 'To (String) is required.']},
    body: {type: String, required: [true, 'Body (String) is required.']},
});
const MessageModel = mongoose.model('Message', MessageSchema);

const ChatBoxSchema = new Schema({
    name: {type: String, required: [true, 'Name (String) is required.']},
    messages: [{type: mongoose.Types.ObjectId, ref: 'Message'}],
});
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

export {MessageModel, ChatBoxModel};

