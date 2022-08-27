const express = require('express');

const app = express();

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})