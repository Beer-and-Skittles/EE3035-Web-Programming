// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    // console.log(req.query)
    /*******    NOTE: DO NOT MODIFY   *******/
    // const priceFilter = req.query.priceFilter
    // const mealFilter  = req.query.mealFilter
    // const typeFilter  = req.query.typeFilter
    // const sortBy      = req.query.sortBy
    /****************************************/
    const rests = await Info.find();
    console.log(rests.length);
    console.log(rests[0].id);
    
    let data = []
    for(let i=0; i<rests.length; i++){
        let element = {
            id: rests[i].id,
            name: rests[i].name,
            img: rests[i].img,
            time: rests[i].time,
            distance: rests[i].distance,
            price: rests[i].price
        };
        data.push(element);
    }

    if(rests){
        res.status(200).send({message: 'success', contents:data});
    }else{
        res.status(403).send({message: 'error', contents: null});
    }

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    console.log('GetSearch');


    // console.log(priceFilter, mealFilter, typeFilter, sortBy);
    // res.status(200).sned({message:'success', contents:'something'});
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    console.log('GetInfo')
    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}