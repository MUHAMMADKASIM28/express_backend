const ProductModel = require('../models/product')

const getAllProduct = async (req, res) => {
    try {
        const [data] = await ProductModel.getAllProduct();

        res.json({
            message: 'GET all product succes',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const [data] = await ProductModel.getProductById(productId);

        if (data.length === 0) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.json({
            message: 'GET product success',
            data: data[0]
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const createNewProduct = async (req, res) => {
    const {body} = req;

    try {
        await ProductModel.createNewProduct(body);
        res.status(201).json({
            message: 'CREATE new product succes',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const updateProduct = async (req, res) => {
    const {productId} = req.params
    const {body} = req;
    try {
        await ProductModel.updateProduct(body, productId);
        res.status(201).json({
            message: 'UPDATE product succes',
            data: {
                id: productId, 
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

const deleteProduct = async (req, res) => {
    const {productId} = req.params;
    try {
        await ProductModel.deleteProduct(productId);   
        res.json({
            message: 'DELETE product succes',
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
    getAllProduct,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
}
