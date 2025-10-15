const dbpool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const getAllProduct = () => {
    const SQLQuery = 'SELECT * FROM product';

    return dbpool.execute(SQLQuery);
}

const getProductById = (productId) => {
    const SQLQuery = `SELECT * FROM product WHERE id='${productId}'`; 
    return dbpool.execute(SQLQuery);
}

const createNewProduct = (body) => {
    const id = uuidv4(); 
    const SQLQuery = `INSERT INTO product (id, name, price, description) 
                      VALUES ('${id}', '${body.name}', ${body.price}, '${body.description}')`;
    return dbpool.execute(SQLQuery);
}

const updateProduct = (body, productId) => {
    const SQLQuery = `UPDATE product 
                      SET name='${body.name}', price=${body.price}, description='${body.description}'
                      WHERE id='${productId}'`; 
    return dbpool.execute(SQLQuery);
}

const deleteProduct = (productId) => {
    const SQLQuery = `DELETE FROM product WHERE id='${productId}'`; 
    return dbpool.execute(SQLQuery);
}

module.exports = {
    getAllProduct,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
}