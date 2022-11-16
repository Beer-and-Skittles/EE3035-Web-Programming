import mongoose from 'mongoose';
const Schema = mongoose.Schema

// creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    body: {
        type: String,
        required: [true, 'Body field is required.']
    }
})

// creating a table within daatabase with the defined schema
const Message = mongoose.model('message', MessageSchema)

// exporting table for quering and mutating
export default Message;