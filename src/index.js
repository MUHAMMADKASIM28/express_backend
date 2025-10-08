require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT;
const usersRoute = require('./routes/users.js');
const middlewareLogRequest = require('./middleware/logs.js');

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoute);











app.listen(port, () => {
  console.log(`Berhasil Berjalan di Port ${port}`)
})

