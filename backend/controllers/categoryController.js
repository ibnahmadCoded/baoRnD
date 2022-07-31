const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel')
const User = require('../models/userModel')
const Project = require('../models/projectModel')

// desc:    Get all categories for a project/user.  
// route:   GET /api/categories
// access:  Private 
// dev:     Aliyu A.   
const getCategories = asyncHandler(async (req, res) => {
    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide the category type')
    }

    // if the type of categories is project categories
    if(req.body.type === "Project"){
        const categories = await Category.find({ item: req.body.project, type: req.body.type })

        res.status(200).json(categories)
    }
    
    // if the type of categories is user categories
    if(req.body.type === "User"){
        const categories = await Category.find({ item: req.body.User, type: req.body.type })

        res.status(200).json(categories)
    }
})

// desc:    Add a category to a project/user.  
// route:   POST /api/categories
// access:  Private 
// dev:     Aliyu A.   
const addCategory = asyncHandler(async (req, res) => {
    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide the category type')
    }

    if(!req.body.category){
        res.status(400)
        throw new Error('Please provide the category')
    }

    // if the type of categories is in project categories
    if(req.body.type === "Project"){
        const cat = await Category.findOne({ item: req.body.item })

        project = await Project.findOne({ _id: req.body.item})

        if(!project){
            res.status(400)
            throw new Error('Project does not exist')
        }

        // Only the initiator of the project can add new categories to it
        if(project.user.toString() !== req.user.id){
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
                item: req.body.item,
                type: req.body.type,
                category: req.body.category
            })
            res.status(200).json(category)
        }
    }
    
    // if the type of categories is user categories
    if(req.body.type === "User"){
        const cat = await Category.findOne({ item: req.body.item })

        user = await User.findOne({ _id: req.body.item})

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
                item: req.body.item,
                type: req.body.type,
                category: req.body.category
            })
            res.status(200).json(category)
        }
    }
})

// desc:    Delete a category from a project/user.  
// route:   DELETE /api/categories/:id
// access:  Private 
// dev:     Aliyu A.   
const removeCategory = asyncHandler(async (req, res) => {
    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide the category type')
    }

    // if the type of categories is in project categories
    if(req.body.type === "Project"){
        const cat = await Category.findOne({ item: req.body.item })

        project = await Project.findOne({ _id: req.body.item})

        if(!project){
            res.status(400)
            throw new Error('Project does not exist')
        }

        // Only the initiator of the project can remove categories to it
        if(project.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User not authorized')
        }
        
        if (cat && cat.category.includes(req.body.category)){
            // if the project exists and the category to be removed is in it, then remove the item from the array of categories for the project
            const category = await Category.findByIdAndUpdate(cat._id, {$pull: {category: req.body.category}}, {
                new: true,
            })

            // remove data entirely if there is no stakeholder status left for user&project
            if (category.category.length === 0){
                await category.remove()

                res.status(200).json("All categories removed from project")
            }
            else{
                res.status(200).json(`The ${req.body.category} status removed from project. Current categories: ${category.category}`)
            }
        }
        else
        {
            res.status(400)
            throw new Error('Project or category does not exist')
        }
    }
    
    // if the type of categories is user categories
    if(req.body.type === "User"){
        const cat = await Category.findOne({ item: req.body.item })

        user = await User.findOne({ _id: req.body.item})

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

            // remove data entirely if there is no stakeholder status left for user&project
            if (category.category.length === 0){
                await category.remove()

                res.status(200).json("All categories removed from project")
            }
            else{
                res.status(200).json(`The ${req.body.category} status removed from project. Current categories: ${category.category}`)
            }
        }
        else
        {
            // else we create a new category entry for the project, in the collection
            res.status(400)
            throw new Error('User or category does not exist')
        }
    }
})

module.exports = {
    getCategories,
    addCategory,
    removeCategory,
}