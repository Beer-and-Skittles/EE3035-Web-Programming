import express from 'express'
import {genNumber, getNumber} from '../core/getNumber'
const router = express.Router()


router.post('/start', (_, res) => {
    genNumber();
    res.json({msg: 'The game has started.'});
})

router.get('/guess', (req,res) => {
    const guess = req.query.number;
    console.log('hi');

    if(guess.isInteger === false){

    }else if(guess < 1 || guess > 100){

    }else{
        const correct = getNumber();
        if(guess === correct){
            res.json({msg: 'Correct!'});
        }else if(guess < correct){
            res.json({msg: 'Too Small!'});
        }else if(guess > correct){
            res.json({msg: 'Too Large!'});
        }
    }

    res.status(406).send({msg: 'Not a legal number.'})
})

router.post('/restart', (_, res) => { 
    genNumber();
    res.json({ msg: 'The game has restarted.' })
})

export default router