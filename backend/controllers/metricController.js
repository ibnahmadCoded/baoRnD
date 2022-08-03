const asyncHandler = require('express-async-handler')
const Metric = require('../models/metricModel')

// desc:  this function gets allmetrics from the db
// route: GET /api/metrics
// access Private
const getMetrics = asyncHandler(async (req, res) => {
    const metrics =  await Metric.find()

    res.status(200).json(metrics)
})

// desc:  this function adds metrics to the db collection
// route: POST /api/metrics
// access Private
const updateMetrics = asyncHandler(async (req, res) => {
    if(!req.body.type){
        // ensure the metric type to be updated is supplied in the query
        res.status(400)
        throw new Error('Please add a metric type')
    } 

    // if the metric type to be updated is the signups metric,increase it by 1. call this API with Body of type = Signup everytime a user signs up
    if(req.body.type === "Signup"){
        // there is only 1 metric document in the collection. We update only that 1.
        const m = await Metric.findOne()          

        const metrics = await Metric.findByIdAndUpdate(m._id, {signups: m.signups + 1}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the logins metric, increase it by 1. call this API with Body of type = Login everytime a user logs in
    if(req.body.type === "Login"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {logins: m.logins + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the accounttypes metric (company), increase it and the total by 1. 
    // call this API with Body of type = AccountType.Company everytime a user creates an account ot type Company
    if(req.body.type === "AccountType.Company"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "accounttypes.Total": m.accounttypes.Total + 1,
            "accounttypes.Company": m.accounttypes.Company + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the accounttypes metric (individual), increase it and the total by 1. 
    // call this API with Body of type = AccountType.Individual everytime a user creates an account ot type Individual
    if(req.body.type === "AccountType.Individual"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "accounttypes.Total": m.accounttypes.Total + 1,
            "accounttypes.Individual": m.accounttypes.Individual + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project metric (public), increase it and the total by 1. 
    // call this API with Body of type = Project.Public everytime a user creates a project of type Public
    if(req.body.type === "Project.Public"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projects.Total": m.projects.Total + 1,
            "projects.Public": m.projects.Public + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project metric (private), increase it and the total by 1. 
    // call this API with Body of type = Project.Private everytime a user creates a project of type Private
    if(req.body.type === "Project.Private"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projects.Total": m.projects.Total + 1,
            "projects.Private": m.projects.Private + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project category metric (fund), increase it and the total by 1. 
    // call this API with Body of type = Projectcategory.Fund everytime a user creates a project of category Fund
    if(req.body.type === "Projectcategory.Fund"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectcategories.Total": m.projectcategories.Total + 1,
            "projectcategories.Fund": m.projectcategories.Fund + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project category metric (res), increase it and the total by 1. 
    // call this API with Body of type = Projectcategory.Res everytime a user creates a project of category Res
    if(req.body.type === "Projectcategory.Res"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectcategories.Total": m.projectcategories.Total + 1,
            "projectcategories.Res": m.projectcategories.Res + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project category metric (collab), increase it and the total by 1. 
    // call this API with Body of type = Projectcategory.Collab everytime a user creates a project of category Collab
    if(req.body.type === "Projectcategory.Collab"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectcategories.Total": m.projectcategories.Total + 1,
            "projectcategories.Collab": m.projectcategories.Collab + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project category metric (basic), increase it and the total by 1. 
    // call this API with Body of type = Projectcategory.Basic everytime a user creates a project of category Basic
    if(req.body.type === "Projectcategory.Basic"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectcategories.Total": m.projectcategories.Total + 1,
            "projectcategories.Basic": m.projectcategories.Basic + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the user category metric (normal), increase it and the total by 1. 
    // call this API with Body of type = Usercategory.Normal everytime a user adds a category, Normal
    if(req.body.type === "Usercategory.Normal"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "usercategories.Total": m.usercategories.Total + 1,
            "usercategories.Normal": m.usercategories.Normal + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the user category metric (investor), increase it and the total by 1. 
    // call this API with Body of type = Usercategory.Investor everytime a user adds a category, Investor
    if(req.body.type === "Usercategory.Investor"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "usercategories.Total": m.usercategories.Total + 1,
            "usercategories.Investor": m.usercategories.Investor + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the user category metric (researcher), increase it and the total by 1. 
    // call this API with Body of type = Usercategory.Researcher everytime a user adds a category, Researcher
    if(req.body.type === "Usercategory.Researcher"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "usercategories.Total": m.usercategories.Total + 1,
            "usercategories.Researcher": m.usercategories.Researcher + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the user category metric (professor), increase it and the total by 1. 
    // call this API with Body of type = Usercategory.Professor everytime a user adds a category, Professor
    if(req.body.type === "Usercategory.Professor"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "usercategories.Total": m.usercategories.Total + 1,
            "usercategories.Professor": m.usercategories.Professor + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project application metric (professor), increase it and the total by 1. Also, increase pending by 1
    // call this API with Body of type = Projectapplication.Collaborator everytime a user applies for a project, as a Collaborator
    if(req.body.type === "Projectapplication.Collaborator"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectapplications.Total": m.projectapplications.Total + 1,
            "projectapplications.Collaborator": m.projectapplications.Collaborator + 1,
            "projectapplications.Pending": m.projectapplications.Pending + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project application metric (supervisor), increase it and the total by 1. Also, increase pending by 1 
    // call this API with Body of type = Projectapplication.Supervisor everytime a user applies for a project, as a Supervisor
    if(req.body.type === "Projectapplication.Supervisor"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectapplications.Total": m.projectapplications.Total + 1,
            "projectapplications.Supervisor": m.projectapplications.Supervisor + 1,
            "projectapplications.Pending": m.projectapplications.Pending + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project application metric (researcher), increase it and the total by 1. Also, increase pending by 1
    // call this API with Body of type = Projectapplication.Researcher everytime a user applies for a project, as a Researcher
    if(req.body.type === "Projectapplication.Researcher"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectapplications.Total": m.projectapplications.Total + 1,
            "projectapplications.Researcher": m.projectapplications.Researcher + 1,
            "projectapplications.Pending": m.projectapplications.Pending + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project application metric (developer), increase it and the total by 1. Also, increase pending by 1
    // call this API with Body of type = Projectapplication.Developer everytime a user applies for a project, as a Developer
    if(req.body.type === "Projectapplication.Developer"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectapplications.Total": m.projectapplications.Total + 1,
            "projectapplications.Developer": m.projectapplications.Developer + 1,
            "projectapplications.Pending": m.projectapplications.Pending + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project application metric (acceptance), decrease pending it by 1. 
    // call this API with Body of type = Projectapplication.Acceptance everytime a project application is accepted
    if(req.body.type === "Projectapplication.Acceptance"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectapplications.Acceptances": m.projectapplications.Acceptances + 1,
            "projectapplications.Pending": m.projectapplications.Pending - 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project application metric (rejection), increase it and reduce pending by 1. 
    // call this API with Body of type = Projectapplication.Rejection everytime a project application is rejected
    if(req.body.type === "Projectapplication.Rejection"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectapplications.Rejections": m.projectapplications.Rejections + 1,
            "projectapplications.Pending": m.projectapplications.Pending - 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the stakeholder metric (collaborator), increase it and the total by 1. 
    // call this API with Body of type = Stakeholder.Collaborator everytime a a project stakeholder is added of type, Collaborator
    if(req.body.type === "Stakeholder.Collaborator"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "stakeholders.Total": m.stakeholders.Total + 1,
            "stakeholders.Collaborator": m.stakeholders.Collaborator + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the stakeholder metric (supervisor), increase it and the total by 1. 
    // call this API with Body of type = Stakeholder.Supervisor everytime a a project stakeholder is added of type, Supervisor
    if(req.body.type === "Stakeholder.Supervisor"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "stakeholders.Total": m.stakeholders.Total + 1,
            "stakeholders.Supervisor": m.stakeholders.Supervisor + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the stakeholder metric (researcher), increase it and the total by 1. 
    // call this API with Body of type = Stakeholder.Researcher everytime a a project stakeholder is added of type, Researcher
    if(req.body.type === "Stakeholder.Researcher"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "stakeholders.Total": m.stakeholders.Total + 1,
            "stakeholders.Researcher": m.stakeholders.Researcher + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the stakeholder metric (developer), increase it and the total by 1. 
    // call this API with Body of type = Stakeholder.Developer everytime a a project stakeholder is added of type, Developer
    if(req.body.type === "Stakeholder.Developer"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "stakeholders.Total": m.stakeholders.Total + 1,
            "stakeholders.Developer": m.stakeholders.Developer + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the stakeholder metric (initiator), increase it and the total by 1. 
    // call this API with Body of type = Stakeholder.Initiator everytime a a project stakeholder is added of type, Initiator
    if(req.body.type === "Stakeholder.Initiator"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "stakeholders.Total": m.stakeholders.Total + 1,
            "stakeholders.Initiator": m.stakeholders.Initiator + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the stakeholder metric (follower), increase it and the total by 1. 
    // call this API with Body of type = Stakeholder.Follower everytime a a project stakeholder is added of type, Follower
    if(req.body.type === "Stakeholder.Follower"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "stakeholders.Total": m.stakeholders.Total + 1,
            "stakeholders.Follower": m.stakeholders.Follower + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the stakeholder metric (investor), increase it and the total by 1. 
    // call this API with Body of type = Stakeholder.Investor everytime a a project stakeholder is added of type, Investor
    if(req.body.type === "Stakeholder.Investor"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "stakeholders.Total": m.stakeholders.Total + 1,
            "stakeholders.Investor": m.stakeholders.Investor + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the investment metric, increase it by 1. 
    // call this API with Body of type = Investment everytime an investment is made in a project
    if(req.body.type === "Investment"){
        // the investment amount also needs to be updated, therefore should be present in the query
        if(!req.body.amount){
            // ensure the investment amount to be updated is supplied in the query
            res.status(400)
            throw new Error('Please add the investment amount')
        } 

        const m = await Metric.findOne() 

        // set the new maximum investment amount
        max_amount = parseInt(m.investments.MaxAmount)
        
        if(max_amount < parseInt(req.body.amount)){
            max_amount = parseInt(req.body.amount)
        }
        
        console.log(max_amount)
        
        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "investments.TotalInventment": m.investments.TotalInventment + 1,
            "investments.TotalAmount": parseInt(m.investments.TotalAmount) + parseInt(req.body.amount), 
            "investments.MaxAmount": max_amount,}}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project updates metric (Normal), increase it and the total by 1. 
    // call this API with Body of type = Projectupdate.Normal everytime a normal project update is pushed
    if(req.body.type === "Projectupdate.Normal"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectupdates.Total": m.projectupdates.Total + 1,
            "projectupdates.Normal": m.projectupdates.Normal + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project updates metric (Hidden), increase it and the total by 1. 
    // call this API with Body of type = Projectupdate.Hidden everytime a hidden project update is pushed
    if(req.body.type === "Projectupdate.Hidden"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectupdates.Total": m.projectupdates.Total + 1,
            "projectupdates.Hidden": m.projectupdates.Hidden + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the project updates metric (Note), increase it and the total by 1. 
    // call this API with Body of type = Projectupdate.Note everytime a note project update is pushed
    if(req.body.type === "Projectupdate.Note"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "projectupdates.Total": m.projectupdates.Total + 1,
            "projectupdates.Note": m.projectupdates.Note + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the referral metric (Collaborator), increase it and the total by 1. 
    // call this API with Body of type = Referral.Collaborator everytime a referral is made
    if(req.body.type === "Referral.Collaborator"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "referrals.Total": m.referrals.Total + 1,
            "referrals.Collaborator": m.referrals.Collaborator + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the referral metric (Supervisor), increase it and the total by 1. 
    // call this API with Body of type = Referral.Supervisor everytime a referral is made
    if(req.body.type === "Referral.Supervisor"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "referrals.Total": m.referrals.Total + 1,
            "referrals.Supervisor": m.referrals.Supervisor + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the referral metric (Researcher), increase it and the total by 1. 
    // call this API with Body of type = Referral.Researcher everytime a referral is made
    if(req.body.type === "Referral.Researcher"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "referrals.Total": m.referrals.Total + 1,
            "referrals.Researcher": m.referrals.Researcher + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the referral metric (Developer), increase it and the total by 1. 
    // call this API with Body of type = Referral.Developer everytime a referral is made
    if(req.body.type === "Referral.Developer"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "referrals.Total": m.referrals.Total + 1,
            "referrals.Developer": m.referrals.Developer + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the referral metric (Initiator), increase it and the total by 1. 
    // call this API with Body of type = Referral.Initiator everytime a referral is made
    if(req.body.type === "Referral.Initiator"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "referrals.Total": m.referrals.Total + 1,
            "referrals.Initiator": m.referrals.Initiator + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the referral metric (Follower), increase it and the total by 1. 
    // call this API with Body of type = Referral.Follower everytime a referral is made
    if(req.body.type === "Referral.Follower"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "referrals.Total": m.referrals.Total + 1,
            "referrals.Follower": m.referrals.Follower + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the referral metric (Investor), increase it and the total by 1. 
    // call this API with Body of type = Referral.Investor everytime a referral is made
    if(req.body.type === "Referral.Investor"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {$set: {
            "referrals.Total": m.referrals.Total + 1,
            "referrals.Investor": m.referrals.Investor + 1, }}, {
            new: true,
        })

        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the earlyaccess metric, increase it by 1. call this API with Body of type = Earlyaccess everytime a user logs in
    if(req.body.type === "Earlyaccess"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {earlyaccesssignups: m.earlyaccesssignups + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the newslettersignups metric, increase it by 1. call this API with Body of type = Newsletter everytime a user logs in
    if(req.body.type === "Newsletter"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {newslettersignups: m.newslettersignups + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the newslettersignups metric, increase it by 1. call this API with Body of type = Feedback everytime a user logs in
    if(req.body.type === "Feedback"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {feedbacks: m.feedbacks + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the waitlistsignups metric, increase it by 1. call this API with Body of type = Waitlist everytime a user logs in
    if(req.body.type === "Waitlist"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {waitlistsignups: m.waitlistsignups + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the projectmaterials metric, increase it by 1. call this API with Body of type = ProjectMaterial everytime adds a project material
    if(req.body.type === "Projectmaterial"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {projectmaterials: m.projectmaterials + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the projectmaterials metric, increase it by 1. call this API with Body of type = ProjectMilestone everytime a user adds a project milestone
    if(req.body.type === "Projectmilestone"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {projectmilestones: m.projectmilestones + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the comments metric, increase it by 1. call this API with Body of type = Comment everytime a user comments on a project update
    if(req.body.type === "Comment"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {comments: m.comments + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the fields metric, increase it by 1. call this API with Body of type = Field everytime a adds a project field
    if(req.body.type === "Field"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {fields: m.fields + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    // if the metric type to be updated is the tags metric, increase it by 1. call this API with Body of type = Tag everytime a adds a project tag
    if(req.body.type === "Tag"){
        const m = await Metric.findOne() 

        const metrics = await Metric.findByIdAndUpdate(m._id, {tags: m.tags + 1}, {
            new: true,
        })
        
        res.status(200).json(metrics)
    }

    /*
    // Initialize 
    const m = await Metric.create({
        signups: 0,
        logins: 0,
        accounttypes: {Total: 0, Company: 0, Individual: 0},
        projects: {Total: 0, Public: 0, Private: 0},
        projectcategories: {Total: 0, Fund: 0, Res: 0, Collab: 0, Basic: 0},
        usercategories: {Total: 0, Normal: 0, Investor: 0, Researcher: 0, Professor: 0},
        projectapplications: {Total: 0, Collaborator: 0, Supervisor: 0, Researcher: 0, Developer: 0, Acceptances: 0, Rejections: 0, Pending: 0},
        stakeholders: {Total: 0, Collaborator: 0, Supervisor: 0, Researcher: 0, Developer: 0, Initiator: 0, Follower: 0, Investor: 0},
        investments: {TotalInventment: 0, TotalAmount: 0, MaxAmount: 0},
        projectupdates: {Total: 0, Hidden: 0, Note: 0, Normal: 0},
        referrals: {Total: 0, Collaborator: 0, Supervisor: 0, Researcher: 0, Developer: 0, Initiator: 0, Follower: 0, Investor: 0},
        earlyaccesssignups: 0,
        newslettersignups: 0,
        feedbacks: 0,
        waitlistsignups: 0,
        projectmaterials: 0,
        projectmilestones: 0,
        comments: 0,
        fields: 0,
        tags: 0
    })
    
    res.status(200).json(m)
    */
})

module.exports = {
    getMetrics,
    updateMetrics,
}