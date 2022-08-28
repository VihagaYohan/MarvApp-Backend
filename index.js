const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import route files
const auth = require('./controllers/Authentication')

// initiate controllers
app.use('/api/auth/',auth)

app.get('/', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: "Hello"
        })
    } catch (e) {
        console.log(e)
    }
})

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})