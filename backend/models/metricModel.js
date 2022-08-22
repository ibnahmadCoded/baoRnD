const mongoose = require('mongoose')

const metricSchema = mongoose.Schema({
    signups: {
        // count of signups
        type: Number,
    },
    logins: {
        // count of logins
        type: Number,
    },
    accounttypes: {
        // count of account types
        // takes the form: {Total: Number, Company: Number, Individual: Number}
        // e.g. {Total: 150, Company: 100, Individual: 50}
        type: Object,
    },
    projects: {
        // count of projects and its types
        // takes the form: {Total: Number, Public: Number, Private: Number}
        // e.g. {Total: 200, Public: 50, Private: 150}
        type: Object,
    },
    projectcategories: {
        // count of project categories
        // takes the form: {Total: Number, Fund: Number, Res: Number, Collab: Number, Basic: Number}
        // e.g. {Total: 1130, Fund: 10, Res: 20, Collab: 100, Basic: 1000}
        type: Object,
    },
    usercategories: {
        // count of user categories
        // takes the form: {Total: Number, Normal: Number, Investor: Number, Researcher: Number, Professor: Number}
        // e.g. {Total: 2700, Normal: 1400, Investor: 1000, Researcher: 200, Professor: 100}
        type: Object,
    },
    projectapplications: {
        // count of project applications. Total is total applications, others are applies as, e.g. Researcher means the user applied for a researcher position.
        // takes the form: {Total: Number, Collaborator: Number, Supervisor: Number, Researcher: Number, Developer: Number, Acceptances: Number, Rejections: Number, Pending: Number }
        // e.g. {Total: 400, Collaborator: 100, Supervisor: 100, Researcher: 100, Developer: 100, Acceptances: 200, Rejections: 150, Pending: 50 }
        type: Object,
    },
    stakeholders: {
        // count of stakeholders. 
        // takes the form: {Total: Number, Collaborator: Number, Supervisor: Number, Researcher: Number, Developer: Number, Initiator: Number, Follower: Number, Investor: Number }
        // e.g. {Total: 700, Collaborator: 100, Supervisor: 100, Researcher: 100, Developer: 100, Initiator: 100, Follower: 100, Investor: 100 }
        type: Object,
    },
    investments: {
        // investment metrics
        // takes the form: {TotalInventments: Number, TotalAmount: Number, MaxAmount: Number}
        // e.g. {TotalInventment: 100, TotalAmount: 1000000000, MaxAmount: 200000}
        type: Object,
    },
    projectupdates: {
        // Project update metrics. Helps track if functionality is being used, or should be removed
        // takes the form: {Total: Number, Hidden: Number, Note: Number, Normal: Number}
        // e.g. {Total: 300, Hidden: 200, Note: 50, Normal: 50}
        type: Object,
    },
    referrals: {
        // count of referrals. Total is total referrals, others are referred as, e.g. Researcher means the user referred to join as a researcher.
        // takes the form: {Total: Number, Collaborator: Number, Supervisor: Number, Researcher: Number, Developer: Number, Initiator: Number, Follower: Number, Investor: Number }
        // e.g. {Total: 700, Collaborator: 100, Supervisor: 100, Researcher: 100, Developer: 100, Initiator: 100, Follower: 100, Investor: 100 }
        type: Object,
    },
    earlyaccesssignups: {
        // count of signups for early access
        type: Number,
    },
    newslettersignups: {
        // count of signups for newsletter
        type: Number,
    },
    feedbacks: {
        // count of feedbacks given
        type: Number,
    },
    waitlistsignups: {
        // count of signups for waitlist
        type: Number,
    },
    projectmaterials: {
        // count of project materials added. Can be improved to include specific materials
        type: Number,
    },
    projectmilestones: {
        // count of project milestones added.
        type: Number,
    },
    comments: {
        // count of comments added.
        type: Number,
    },
    fields: {
        // count of fields added. Can be improved to include specific fields
        type: Number,
    },
    tags: {
        // count of tags added. Can be improved to include specific fields
        type: Number,
    },
    payments: {
        // count of payments
        type: Number,
    },
    paymentamount: {
        // total amount of payments
        type: Number,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Metric', metricSchema)