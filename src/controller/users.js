const UserModel = require('../models/users')

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
    const {body} = req;

    try {
        await UserModel.createNewUser(body);
        res.json({
            message: 'CREATE new user succes',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const updateUser = async (req, res) => {
    const {idUser} = req.params
    const {body} = req;
    try {
        await UserModel.updateUser(body, idUser);
        res.json({
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
    const {idUser} = req.params;
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
}
