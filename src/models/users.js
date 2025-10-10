const dbpool = require('../config/database');
const bcrypt = require('bcryptjs');

const getAllUsers = () => {
    // Hapus 'address' dari query SELECT
    const SQLQuery = 'SELECT id, name, username, password, role, email FROM users';
    return dbpool.execute(SQLQuery);
}

const findUserByUsername = (username) => {
    const SQLQuery = `SELECT * FROM users WHERE username = '${username}'`;
    return dbpool.execute(SQLQuery);
}

const findUserByEmail = (email) => {
    const SQLQuery = `SELECT * FROM users WHERE email = '${email}'`;
    return dbpool.execute(SQLQuery);
}

const createNewUser = async (body) => {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const SQLQuery = `INSERT INTO users (name, username, password, email) 
                      VALUES ('${body.name}', '${body.username}', '${hashedPassword}', '${body.email}')`;
    return dbpool.execute(SQLQuery);
}

const updateUser = (body, idUser) => {
    let setClauses = [];
    if (body.name) setClauses.push(`name='${body.name}'`);
    if (body.username) setClauses.push(`username='${body.username}'`);
    if (body.email) setClauses.push(`email='${body.email}'`);
    if (body.password) setClauses.push(`password='${body.password}'`); // 'password' di sini sudah di-hash dari controller

    const setQuery = setClauses.join(', ');

    if (setQuery.length === 0) {
        return Promise.resolve(); 
    }
    const SQLQuery = `UPDATE users 
                      SET ${setQuery}
                      WHERE id=${idUser}`;

    return dbpool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;
    return dbpool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    findUserByUsername,
    findUserByEmail,
    createNewUser,
    updateUser,
    deleteUser,
}