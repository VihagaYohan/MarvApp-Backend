const express = require('express');
const dotenv = require('dotenv')
// import DB connection
const connectDB = require('./config/db')

// import route files
const auth = require('./routes/Authentication')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// load env files
dotenv.config({ path: './config/config.env' })

// connect to DB
connectDB();

// initiate controllers
app.use('/api/auth/',auth)


const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})