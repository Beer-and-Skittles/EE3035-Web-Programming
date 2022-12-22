import mongoose, { Schema } from "mongoose";

const ChatBoxSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Name (String) is required.']
    },
    messages: [{
        sender: { type: String},
        body: { type: String},
    }],
});
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);
module.exports = ChatBoxModel;
