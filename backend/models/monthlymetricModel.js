const mongoose = require('mongoose')

const metricSchema = mongoose.Schema({
    metrics: {
        // daily metrics are stored at the end of the month every month (e.g. Wednessday 31 august 2022, at 23:59). Done from frontend
        // we call the metrics API and store the response in this collection
        type: Object,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Monthlymetric', metricSchema)