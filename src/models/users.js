const dbpool = require('../config/database');
const bcrypt = require('bcryptjs');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';

    return dbpool.execute(SQLQuery);
}

const getUserById = (idUser) => {
    const SQLQuery = `SELECT * FROM users WHERE id=${idUser}`;
    return dbpool.execute(SQLQuery);
}

const findUserByUsername = (username) => {
    const SQLQuery = `SELECT * FROM users WHERE username = '${username}'`;
    return dbpool.execute(SQLQuery);
}


const createNewUser = async (body) => {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const SQLQuery = `INSERT INTO users (name, username, password, role, email, address)
                      VALUES ('${body.name}', '${body.username}', '${hashedPassword}', '${body.role}', '${body.email}', '${body.address}')`;

    return dbpool.execute(SQLQuery);
}

const updateUser = (body, idUser) => {
    const SQLQuery = `UPDATE users
                      SET name='${body.name}', username='${body.username}', password='${hashedPassword}', role='${body.role}', email='${body.email}', address='${body.address}'
                      WHERE id=${idUser}`;

    return dbpool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;

    return dbpool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    findUserByUsername, 
}