const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

const store = new KnexSessionStore({
    knex: knex,
    tablename: 'sessions', 
});

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true 
    }
});

module.exports = sessionConfig;