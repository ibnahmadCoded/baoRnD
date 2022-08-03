const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/stakeholders', require('./routes/stakeholderRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/fields', require('./routes/fieldRoutes'))
app.use('/api/tags', require('./routes/tagRoutes'))
app.use('/api/feedbacks', require('./routes/feedbackRoutes'))
app.use('/api/newslettersignups', require('./routes/newslettersignupRoutes'))
app.use('/api/projectmaterials', require('./routes/projectmaterialRoutes'))
app.use('/api/projectmilestones', require('./routes/projectmilestoneRoutes'))
app.use('/api/referrals', require('./routes/referralRoutes'))
app.use('/api/waitlist', require('./routes/waitlistRoutes'))
app.use('/api/earlyaccess', require('./routes/earlyaccessRoutes'))
app.use('/api/investments', require('./routes/investmentRoutes'))
app.use('/api/projectapplications', require('./routes/projectapplicationRoutes'))
app.use('/api/projectupdates', require('./routes/projectupdateRoutes'))
app.use('/api/updatecomments', require('./routes/updatecommentRoutes'))
app.use('/api/updatereactions', require('./routes/updatereactionRoutes'))
app.use('/api/commentreactions', require('./routes/commentreactionRoutes'))
app.use('/api/notifications', require('./routes/notificationRoutes'))
app.use('/api/metrics', require('./routes/metricRoutes'))
app.use('/api/dailymetrics', require('./routes/dailymetricRoutes'))
app.use('/api/monthlymetrics', require('./routes/monthlymetricRoutes'))
app.use('/api/yearlymetrics', require('./routes/yearlymetricRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))