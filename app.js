const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
})

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on PORT ${PORT}`);
});