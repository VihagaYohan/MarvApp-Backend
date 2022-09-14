const express = require('express');
const dotenv = require('dotenv')
const colors = require('colors')
const ErrorHandler = require('./middleware/Error')
const cors = require('cors')

/* const corsOptions = {
    origin: 'http://locatlhost:5000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
 */
// import DB connection
const connectDB = require('./config/db')

// import route files
const auth = require('./routes/Authentication')
const serviceCategory = require('./routes/Services')
const order = require('./routes/Orders')
const users= require('./routes/Users')
const extraService = require('./routes/ExtraService')

const app = express();
//app.use(cors())
app.use(ErrorHandler)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// load env files
dotenv.config({ path: './config/config.env' })

// connect to DB
connectDB();

// initiate controllers
app.use('/api/auth/', auth)
app.use('/api/services/',serviceCategory)
app.use('/api/orders/',order)
app.use('/api/users/',users)
app.use('/api/extraServices/',extraService)


const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})

// handle un-handled promise re-jections
process.on("unhandledRejection", (error, promise) => {
    console.log(`Error : ${error.message}`.red.bold);

    // close server and exit process
    //server.close(() => process.exit(1));
});