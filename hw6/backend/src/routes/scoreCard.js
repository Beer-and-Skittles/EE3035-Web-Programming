import {Router} from "express";
import {ScoreCard} from "../models/ScoreCard.js";
import mongoose from "mongoose";




const ScoreCardRouter = Router();
ScoreCardRouter.delete('/cards', async (req,res) => {
    await ScoreCard.deleteMany({});
    res.json({message: "Database deleted"})
    return;
});
ScoreCardRouter.post('/card', async (req,res) => {
    const name = req.body.name;
    const score = req.body.score;
    const subject = req.body.subject;

    const exist = await ScoreCard.findOne({Name: name, Subject: subject});
    if(exist){
        ScoreCard.updateOne({Name: name, Subject: subject}, {$set: {Score: score}});
        res.json({message: `updating (${name},${subject}, ${score})`})
    }else{
        const newScoreCard = new ScoreCard({Name: name, Score: score, Subject: subject});
        newScoreCard.save();
        res.json({message: `adding   (${name}, ${subject}, ${score})`})
    }
    return
});
ScoreCardRouter.get('/cards', async (req,res) => {
    const type = req.query.type;
    const string = req.query.queryString;
    let results = [];

    if(type === 'name'){
        const existName = await ScoreCard.find({Name: string});
        for(let i=0; i<existName.length; i++){
            results.push(`Found card with name: (${existName[i].Name}, ${existName[i].Subject}, ${existName[i].Score})`);
        }

        if(existName.length === 0){
            results.push(`Name ${string} not found`);
        }
        

    }else{
        const existSub = await ScoreCard.find({Subject: string});
        for(let i=0; i<existSub.length; i++){
            results.push(`Found card with subject: (${existSub[i].Name}, ${existSub[i].Subject}, ${existSub[i].Score})`);
        }
        
        if(existSub.length === 0){
            results.push(`Subject ${string} not found`);
        }
        
    }

    res.json({messages:results});
    return;
});


export {ScoreCardRouter};