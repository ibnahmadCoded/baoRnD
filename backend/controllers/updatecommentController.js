const asyncHandler = require('express-async-handler')

const Comment = require('../models/updatecommentModel')
const Update = require('../models/projectupdateModel')

// desc:    Get all comments on an update. If you cant see an update, you shouldnt be able to see comments on it (to be done in frontend)
// route:   GET /api/updatecomments
// access:  Private 
// dev:     Aliyu A.   
const getComments = asyncHandler(async (req, res) => {
    if(!req.body.update){
        res.status(400)
        throw new Error('Please provide update')
    }

    if(!await Update.findById(req.body.update)){
        res.status(400)
        throw new Error('Update does not exist')
    }

    // get all comments on the update
    const comments = await Comment.find({ update: req.body.update })

    res.status(200).json(comments)
    
})

// desc:    Add a comment to an update. If you cant see an update, you shouldnt be able to comment on it (to be done in frontend)
// route:   POST /api/updatecomments
// access:  Private 
// dev:     Aliyu A.   
const addComment = asyncHandler(async (req, res) => {
    if(!req.body.update){
        res.status(400)
        throw new Error('Please provide update')
    }

    if(!req.body.comment){
        res.status(400)
        throw new Error('Please provide comment')
    }

    // you cannot comment on an inexistent update
    const update = await Update.findOne({ _id: req.body.update })
    if(!update){
        res.status(400)
        throw new Error('Update not found')
    }

    // we create the comment
    const comment = await Comment.create({
        user: req.user.id,
        update: req.body.update,
        comment: req.body.comment
    })

    res.status(200).json(comment)  
})

// desc:    Edit a comment. Only the user who made it can edit it.
// route:   PUT /api/updatecomments/:id
// access:  Private 
// dev:     Aliyu A.   
const editComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Comment does not exist')
    }
    
    // Only the commenter can edit it
    if(comment.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const editedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(editedComment) 
})

// desc:    Delete a comment to an update. Only the user who commented can delete it
// route:   DELETE /api/updatecomments/:id
// access:  Private
// dev:     Aliyu A.   
const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Comment does not exist')
    }

    // Only the user who made the comment can delete
    if(req.user.id !== comment.user.toString()){
        res.status(400)
        throw new Error('User not Authorized')
    }

    await comment.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    addComment,
    getComments,
    deleteComment,
    editComment
}