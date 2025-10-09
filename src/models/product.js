const dbpool = require('../config/database');

const getAllProduct = () => {
    const SQLQuery = 'SELECT * FROM product';

    return dbpool.execute(SQLQuery);
}

const getProductById = (idProduct) => {
    const SQLQuery = `SELECT * FROM product WHERE id=${idProduct}`;
    return dbpool.execute(SQLQuery);
}

const createNewProduct = async (body) => {
    const SQLQuery = `INSERT INTO product (name, price, description) 
                      VALUES ('${body.name}', ${body.price}, '${body.description}')`;

    return dbpool.execute(SQLQuery);
}

const updateProduct = (body, idProduct) => {
    const SQLQuery = `UPDATE product 
                      SET name='${body.name}', price=${body.price}, description='${body.description}'
                      WHERE id=${idProduct}`;

    return dbpool.execute(SQLQuery);
}

const deleteProduct = (idProduct) => {
    const SQLQuery = `DELETE FROM product WHERE id=${idProduct}`;

    return dbpool.execute(SQLQuery);
}

module.exports = {
    getAllProduct,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
}