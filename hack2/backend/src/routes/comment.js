// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant
    const cmnts = await Comment.find({restaurantId: id});

    if(!cmnts){
        res.status(403).send({message: 'error', contents: null});
    }else{
        res.status(200).send({message: 'success', contents: cmnts});
    }


    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
}

exports.CreateComment = async (req, res) => {
    console.log('CreateComment')
    console.log(req.body);
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    console.log(body.restaurantId, body.name, body.rating, body.content)
    const newComment = new Comment({
        restaurantId: body.restaurantId,
        name: body.name,
        rating: body.rating,
        content: body.content
    })
    try { 
        await newComment.save();
        console.log('COMMENT SAVED')
    }
    catch (e) {throw new Error('fail to save message')}
    
}
