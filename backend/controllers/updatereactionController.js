const asyncHandler = require('express-async-handler')

const Reaction = require('../models/updatereactionModel')
const Update = require('../models/projectupdateModel')

// desc:    Get all reactions on an update. If you cant see an update, you shouldnt be able to see reactions on it (to be done in frontend)
// route:   GET /api/updatereactions
// access:  Private 
// dev:     Aliyu A.   
const getReactions = asyncHandler(async (req, res) => {
    if(!req.body.update){
        res.status(400)
        throw new Error('Please provide update')
    }

    // get all reactions on the update
    const reactions = await Reaction.find({ update: req.body.update })

    res.status(200).json(reactions)
    
})

// desc:    Add a reaction on an update. If you cant see an update, you shouldnt be able to react on it (to be done in frontend)
// route:   POST /api/updatereactions
// access:  Private 
// dev:     Aliyu A.   
const addReaction = asyncHandler(async (req, res) => {
    if(!req.body.update){
        res.status(400)
        throw new Error('Please provide update')
    }

    if(!req.body.reaction){
        res.status(400)
        throw new Error('Please provide reaction')
    }

    // you cannot react to an inexistent update
    const update = await Update.findOne({ _id: req.body.update })
    if(!update){
        res.status(400)
        throw new Error('Update not found')
    }
    
    // get reaction of update to check if it already exists. We dont want to duplicate reactions in this collection
    const r = await Reaction.findOne({ update: req.body.update, user: req.user.id })
    
    if (r){
        // if the update already exists with its reactions by the current user in the collection, just update it with the additional reaction
        const reaction = await Reaction.findByIdAndUpdate(r._id, {$addToSet: {reactions: req.body.reaction}}, {
            new: true,
        })

        res.status(200).json(reaction)
    }
    else
    {
        // else we create a new reaction entry for the update with the user, in the collection
        const reaction = await Reaction.create({
            update: req.body.update,
            reactions: req.body.reaction,
            user: req.user.id
        })

        res.status(200).json(reaction)
    }
})

// desc:    Delete a reaction on an update. Only the user who made it can delete
// route:   DELETE /api/updatereactions
// access:  Private
// dev:     Aliyu A.   
const deleteReaction = asyncHandler(async (req, res) => {
    if(!req.body.update){
        res.status(400)
        throw new Error('Please provide update')
    }

    if(!req.body.reaction){
        res.status(400)
        throw new Error('Please provide the reaction')
    }

    // get reaction of update to check if it already exists. We dont want to duplicate reactions in this collection
    const r = await Reaction.findOne({ update: req.body.update, user: req.user.id })
    
    if (r && r.reactions.includes(req.body.reaction)){
        // if the update already exists with the reaction to be removed in it, remove the item from the array of reactions for the update
        const reaction = await Reaction.findByIdAndUpdate(r._id, {$pull: {reactions: req.body.reaction}}, {
            new: true,
        })

        // remove data entirely if there is no reaction left for user+update combo
        if (reaction.reactions.length === 0){
            await reaction.remove()

            res.status(200).json("All reactions removed from update")
        }
        else{
            res.status(200).json(`The ${req.body.reaction} reaction removed from update. Current reactions: ${reaction.reactions}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Update or reaction does not exist')
    }
})


module.exports = {
    addReaction,
    getReactions,
    deleteReaction
}