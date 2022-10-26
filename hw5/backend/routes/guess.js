import express from 'express'
import {genNumber, getNumber} from '../core/getNumber'
const router = express.Router()


router.post('/start', (_, res) => {
    genNumber();
    res.json({msg: 'The game has started.'});
})

router.get('/guess', (req,res) => {
    const guess_str = req.query.number;
    
    // check if input is an integer
    const legal_chars = '0123456789';
    let zero_flag = true;
    for(let idx=0; idx<guess_str.length; idx++){
        if(guess_str[idx] === '0' && zero_flag){
            res.json({msg: `${guess_str} is not a valid number (1-100)`});
            return;
        }else{
            zero_flag = false;
        }
        if(! legal_chars.includes(guess_str[idx])){
            res.json({msg: `${guess_str} is not a valid number (1-100)`});
            return;
        }
    }

    const guess = +guess_str;
    if(guess < 1 || guess > 100){
        res.json({msg: `${guess_str} is not a valid number (1-100)`})
    }else{
        const correct = getNumber();
        if(guess < correct){
            res.json({msg: 'Larger'});
        }else if(guess > correct){
            res.json({msg: 'Smaller'});
        }else{
            res.json({msg: 'Equal'});
        }
    }
    
})

router.post('/restart', (_, res) => { 
    genNumber();
    res.json({ msg: 'The game has restarted.' })
})

export default router