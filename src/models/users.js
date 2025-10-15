const dbpool = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const getAllUsers = () => {
    const SQLQuery = 'SELECT id, name, username, password, email, role_id FROM users';
    return dbpool.execute(SQLQuery);
}

const findUserByUsername = (username) => {
    const SQLQuery = `
        SELECT 
            u.id, u.username, u.password,
            r.name as role,
            (SELECT GROUP_CONCAT(p.name) 
             FROM role_permissions rp 
             JOIN permissions p ON rp.permission_id = p.id 
             WHERE rp.role_id = u.role_id) as permissions
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.username = ?;
    `;
    return dbpool.execute(SQLQuery, [username]); 
}

const findUserByEmail = (email) => {
    const SQLQuery = `SELECT * FROM users WHERE email = '${email}'`;
    return dbpool.execute(SQLQuery);
}

const createNewUser = async (body) => {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const id = uuidv4(); 
    const SQLQuery = `INSERT INTO users (id, name, username, password, email, role_id)
                      VALUES ('${id}', '${body.name}', '${body.username}', '${hashedPassword}', '${body.email}', 2)`; 
    return dbpool.execute(SQLQuery);
}

const updateUser = (body, userId) => {
    let setClauses = [];
    if (body.name) setClauses.push(`name='${body.name}'`);
    if (body.username) setClauses.push(`username='${body.username}'`);
    if (body.email) setClauses.push(`email='${body.email}'`);
    // Hanya tambahkan password ke query jika memang ada
    if (body.password) setClauses.push(`password='${body.password}'`);

    const setQuery = setClauses.join(', ');

    if (setQuery.length === 0) {
        return Promise.resolve(); 
    }

    const SQLQuery = `UPDATE users 
                      SET ${setQuery}
                      WHERE id='${userId}'`;

    return dbpool.execute(SQLQuery);
}

const deleteUser = (userId) => {
    const SQLQuery = `DELETE FROM users WHERE id='${userId}'`; 

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