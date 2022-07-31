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

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))