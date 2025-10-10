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

const getUserById = async (req, res) => {
    const { idUser } = req.params;
    try {
        const [data] = await UserModel.getUserById(idUser);

        if (data.length === 0) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        res.json({
            message: 'GET user success',
            data: data[0]
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

    if (!body.username || !body.password || !body.email) {
        return res.status(400).json({
            message: 'Username, password, and email are required'
        });
    }

    try {
        const [existingUsername] = await UserModel.findUserByUsername(body.username);
        if (existingUsername.length > 0) {
            return res.status(409).json({
                message: 'Username is already taken. Please use another username.'
            });
        }

        const [existingEmail] = await UserModel.findUserByEmail(body.email);
        if (existingEmail.length > 0) {
            return res.status(409).json({
                message: 'Email is already registered. Please use another email.'
            });
        }

        await UserModel.createNewUser(body);
        res.status(201).json({
            message: 'CREATE new user succes',
            data: {
                username: body.username,
                email: body.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
}

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

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role.trim() }, process.env.JWT_SECRET, {
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

const logout = (req, res) => {
    res.status(200).json({
        message: 'Logout successful. Please clear the token on the client-side.'
    });
};

const updateUser = async (req, res) => {
    const { idUser } = req.params;
    const { body } = req;

    try {
        if (body.password) {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            body.password = hashedPassword;
        }
        await UserModel.updateUser(body, idUser);

        const responseData = { ...body };
        delete responseData.password;

        res.status(201).json({
            message: 'UPDATE user success',
            data: {
                id: idUser,
                ...responseData
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
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
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    register,
    login,
    logout,
}