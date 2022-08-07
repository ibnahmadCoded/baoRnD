const asyncHandler = require('express-async-handler')

const Reaction = require('../models/commentreactionModel')
const Comment = require('../models/updatecommentModel')

// desc:    Get all reactions on a comment. 
// route:   GET /api/commentreactions
// access:  Private 
// dev:     Aliyu A.   
const getReactions = asyncHandler(async (req, res) => {
    if(!req.body.comment){
        res.status(400)
        throw new Error('Please provide comment')
    }

    const comment = await Comment.findOne({ _id: req.body.comment })
    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
    }

    // get all reactions on the comment
    const reactions = await Reaction.find({ comment: req.body.comment })

    res.status(200).json(reactions)
    
})

// desc:    Add a reaction on a comment. 
// route:   POST /api/commentreactions
// access:  Private 
// dev:     Aliyu A.   
const addReaction = asyncHandler(async (req, res) => {
    if(!req.body.comment){
        res.status(400)
        throw new Error('Please provide comment')
    }

    if(!req.body.reaction){
        res.status(400)
        throw new Error('Please provide reaction')
    }

    // you cannot react to an inexistent comment
    const comment = await Comment.findOne({ _id: req.body.comment })
    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
    }
    
    // get reaction of comment to check if it already exists. We dont want to duplicate reactions in this collection
    const r = await Reaction.findOne({ comment: req.body.comment, user: req.user.id })
    
    if (r){
        // if the comment already exists with its reactions by the current user in the collection, just update it with the additional reaction
        const reaction = await Reaction.findByIdAndUpdate(r._id, {$addToSet: {reactions: req.body.reaction}}, {
            new: true,
        })

        res.status(200).json(reaction)
    }
    else
    {
        // else we create a new reaction entry for the comment with the user, in the collection
        const reaction = await Reaction.create({
            comment: req.body.comment,
            reactions: req.body.reaction,
            user: req.user.id
        })

        res.status(200).json(reaction)
    }
})

// desc:    Delete a reaction on a comment. Only the user who made it can delete
// route:   DELETE /api/commentreactions
// access:  Private
// dev:     Aliyu A.   
const deleteReaction = asyncHandler(async (req, res) => {
    if(!req.body.comment){
        res.status(400)
        throw new Error('Please provide comment')
    }

    if(!req.body.reaction){
        res.status(400)
        throw new Error('Please provide the reaction')
    }

    const comment = await Comment.findOne({ _id: req.body.comment })
    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
    }

    // get reaction of update to check if it already exists. We dont want to duplicate reactions in this collection
    const r = await Reaction.findOne({ update: req.body.comment, user: req.user.id })
    
    if (r && r.reactions.includes(req.body.reaction)){
        // if the update already exists with the reaction to be removed in it, remove the item from the array of reactions for the update
        const reaction = await Reaction.findByIdAndUpdate(r._id, {$pull: {reactions: req.body.reaction}}, {
            new: true,
        })

        // remove data entirely if there is no reaction left for user+update combo
        if (reaction.reactions.length === 0){
            await reaction.remove()

            res.status(200).json("All reactions removed from comment")
        }
        else{
            res.status(200).json(`The ${req.body.reaction} reaction removed from comment. Current reactions: ${reaction.reactions}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Comment or reaction does not exist')
    }
})


module.exports = {
    addReaction,
    getReactions,
    deleteReaction
}