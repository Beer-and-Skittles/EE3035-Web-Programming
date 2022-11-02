import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
    Name: String,
    Score: Number,
    Subject: String
});
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);
export {ScoreCard};