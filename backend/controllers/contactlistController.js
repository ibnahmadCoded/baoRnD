const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactlistModel')
const Notification = require('../models/notificationModel')
const User = require('../models/userModel')

// desc:  Get all contacts of a user. Current user
// route: GET /api/contacts
// access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts =  await Contact.find({ user: req.user.id })

    res.status(200).json(contacts)
})

// desc:  Add a contact for a user, as request.
// route: POST /api/contacts
// access Private
const addContact = asyncHandler(async (req, res) => {
    if(!req.body.contact){
        res.status(400)
        throw new Error('Please provide the user you want to add to your contact')
    }

    const user = await User.findById(req.body.contact)

    // check that user exists
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    // check if contact already exists
    const contact = await Contact.findOne( {user: req.user.id, contact: req.body.contact} || {user: req.body.contact, contact: req.user.id} )
    
    if(contact){
        res.status(401)
        throw new Error('Contact exists')
    }

    const c = await Contact.create({
        user: req.user.id,
        contact: req.body.contact,
    })
    
    await Notification.create({
        user: req.body.contact,
        item: c._id,
        type: "ContactRequest",
        seen: false,
    })

    res.status(200).json(c)
})

// desc:  Accept for a user to add you to thier contact list
// route: PUT /api/contacts/:id
// access Private
const acceptContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)  

    if(!contact){
        res.status(400)
        throw new Error('Contact request does not exist')
    }

    const user = await User.findById(req.user.id)

    // check that user exists
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    // Check that the logged in user is the same as the contact request user (only the user sent a request can accept it)
    if(contact.contact.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    // update the contact
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {accepted: true}, {
        new: true,
    })

    // notify user about acceptance
    await Notification.create({
        user: updatedContact.user,
        item: updatedContact._id,
        type: "ContactRequestAccepted",
        seen: false,
    })

    // replicate the contact for the user who just accepted. The user`s contact list should also include the user who sent them the request
    const c = await Contact.create({
        user: req.user.id,
        contact: updatedContact.user,
        accepted: true,
    })
    
    await Notification.create({
        user: req.user.id,
        item: c._id,
        type: "ContactAdded",
        seen: false,
    })

    res.status(200).json(updatedContact)
})

// desc:    Delete a contact
// route:   DELETE /api/contacts/:id
// access:  Private
// dev:     Aliyu A.   
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(400)
        throw new Error('Contact does not exist')
    }

    await contact.remove()

    // the the contact of the other user who has the current user as their contact but was deleted by the current user
    const second_contact = await Contact.findOne({user: req.user.id} || {contact: req.user.id})

    await second_contact.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    addContact,
    getContacts,
    acceptContact,
    deleteContact
}