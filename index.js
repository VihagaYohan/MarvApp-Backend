const express = require('express');
const app = express();

// import DB connection
const connectDB = require('./config/db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import route files
const auth = require('./controllers/Authentication')

// initiate controllers
app.use('/api/auth/',auth)

// connect to DB
connectDB();


const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})