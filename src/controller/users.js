const UserModel = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UserModel.getAllUsers();

        res.json({
            message: 'GET all user succes',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const createNewUser = async (req, res) => {
    res.status(404).json({
        message: 'Please use /register to create a new user'
    });
}

const register = async (req, res) => {
    const { body } = req;

    if (!body.username || !body.password) {
        return res.status(400).json({
            message: 'Username and password are required'
        })
    }

    try {
        await UserModel.createNewUser(body);
        res.status(201).json({
            message: 'CREATE new user succes',
            data: {
                username: body.username,
                email: body.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        })
    }
}

// Fungsi Login
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await UserModel.findUserByUsername(username);
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = users[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        })
    }
}


const updateUser = async (req, res) => {
    const { idUser } = req.params
    const { body } = req;
    try {
        await UserModel.updateUser(body, idUser);
        res.status(201).json({
            message: 'UPDATE user succes',
            data: {
                id: idUser,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const deleteUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        await UserModel.deleteUser(idUser);
        res.json({
            message: 'DELETE user succes',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }

}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    register,
    login,
}