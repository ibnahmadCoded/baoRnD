const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel')
const User = require('../models/userModel')
const Project = require('../models/projectModel')

// desc:    Get all categories for a user.  
// route:   GET /api/categories
// access:  Private 
// dev:     Aliyu A.   
const getCategories = asyncHandler(async (req, res) => {
    if(!req.params.user){
        res.status(400)
        throw new Error('Please provide the user')
    }

    const categories = await Category.find({ user: req.params.user })

    res.status(200).json(categories)
})

// desc:    Add a category to a project/user.  
// route:   POST /api/categories
// access:  Private 
// dev:     Aliyu A.   
const addCategory = asyncHandler(async (req, res) => {
    if(!req.body.category){
        res.status(400)
        throw new Error('Please provide the category')
    }

    if(!req.body.user){
        res.status(400)
        throw new Error('Please provide the user')
    }
    
    const cat = await Category.findOne({ user: req.body.user })

        user = await User.findOne({ _id: req.body.user})

        if(!user){
            res.status(400)
            throw new Error('User does not exist')
        }

        // Other users cannot add or change categories of other users
        if(user._id.toString() !== req.user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        if (cat){
            // if the project already exists with its categories in the collection, just update it with the additional category
            const category = await Category.findByIdAndUpdate(cat._id, {$addToSet: {category: req.body.category}}, {
                new: true,
            })

            res.status(200).json(category)
        }
        else
        {
            // else we create a new category entry for the project, in the collection
            const category = await Category.create({
                user: req.body.user,
                category: req.body.category
            })
            res.status(200).json(category)
        }
})

// desc:    Delete a category from a project/user.  
// route:   DELETE /api/categories/:id
// access:  Private 
// dev:     Aliyu A.   
const removeCategory = asyncHandler(async (req, res) => {
    if(!req.body.user){
        res.status(400)
        throw new Error('Please provide the user')
    }

    if(!req.body.category){
        res.status(400)
        throw new Error('Please provide the category')
    }

    const cat = await Category.findOne({ user: req.body.user })

    const user = await User.findOne({ _id: req.body.user})

    if(!user){
        res.status(400)
        throw new Error('User does not exist')
    }

    // Other users cannot add or change categories of other users
    if(user._id.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (cat && cat.category.includes(req.body.category)){
        // if the project already exists with its categories in the collection, just update it with the additional category
        const category = await Category.findByIdAndUpdate(cat._id, {$pull: {category: req.body.category}}, {
            new: true,
        })

        // remove data entirely if there is no stakeholder status left for user
        if (category.category.length === 0){
            await category.remove()

            res.status(200).json({id: category.id})
        }
        else{
            res.status(200).json(category)
        }
        }
    else
    {
        // else we create a new category entry for the project, in the collection
        res.status(400)
        throw new Error('User or category does not exist')
    }
})

module.exports = {
    getCategories,
    addCategory,
    removeCategory,
}