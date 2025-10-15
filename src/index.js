require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT;
const usersRoute = require('./routes/users.js');
const productRoute = require('./routes/product.js');
const authRoute = require('./routes/auth.js');
const middlewareLogRequest = require('./middleware/logs.js');
const sessionConfig = require('./config/session'); 

app.use(middlewareLogRequest);
app.use(express.json());

app.use(sessionConfig);
app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/product', productRoute);

app.listen(port, () => {
  console.log(`Berhasil Berjalan di Port ${port}`)
})

