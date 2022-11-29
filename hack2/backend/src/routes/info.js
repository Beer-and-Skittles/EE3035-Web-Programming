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

    // console.log(req);

    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    const all_price = [1,2,3];
    const all_meal = ['Breakfast','Lunch','Dinner'];
    const all_type = ['Chinese', 'American','Italian','Japanese','Korean','Thai','Breakfast','Lunch','Dinner'];

    let pf = (priceFilter === undefined) ? all_price : priceFilter.map(x => x.length);
    let mf = (mealFilter === undefined) ? all_meal : mealFilter;
    let tf = (typeFilter === undefined) ? all_type : typeFilter;

    let rests = await Info.find({
        $and: [
            {price: {$in: pf}},
            {tag: {$in: mf}},
            {tag: {$in: tf}}
        ]
        
    })

    // console.log('type filtered',data.length);
    console.log('with filters: ',pf, mf, tf, ', data has length: ',rests.length);

    if (sortBy === 'distance'){
        rests.sort( (a,b) => {return a.distance - b.distance} )
    }else if (sortBy === 'price'){
        rests.sort( (a,b) => {return a.price - b.price})
    }

    if(rests){
        res.status(200).send({message: 'success', contents: rests});
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
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    const rest = await Info.findOne({id: id});

    if (rest){
        const data = {
            name: rest.name,
            tag: rest.tag,
            time: rest.time,
            distance: rest.distance,
            price: rest.price
        };
        res.status(200).send({message: 'success', contents: data});
    }else{
        console.log('dne');
        res.status(403).send({message:' error', contents: null});
    }

    

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