const { pool } = require("../database/connection");

async function getItems(req, res) {
    try {
        const [products] = await pool.query(`SELECT * FROM produtos;`);
        return res.status(200).json(products);
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting products"
        });
    };
};

async function getItemById(req, res) {
    const { id } = req.params;

    if(!id || id <= 0) {
        return res.status(400).json({
            error: "Invalid ID"
        });
    };

    try {
        const [product] = await pool.query(`SELECT * FROM produtos WHERE id = ?;`, [id])
        return res.status(200).json(product[0]);    
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting product"
        });
    };
};

async function createItem(req, res) {
    const { nome, descricao, preco, estoque } = req.body;

    try {
        const [result] = await pool.query(`INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?);`, [nome, descricao, preco, estoque]);
        return res.status(201).json({
            message: "Product successfully created",
            id: result.insertId
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating product"
        });
    };
};

async function updateItem(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    try {
        const [result] = await pool.query(`UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?;`, [nome, descricao, preco, estoque, id]);
        return res.status(201).json({
            message: "Product successfully updated"
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating product"
        });
    };
};

async function deleteItem(req, res) {
    const { id } = req.params;

    try {
        const [result] = await pool.query(`DELETE FROM produtos WHERE id = ?`, [id]);
        return res.status(200).json({
            message: "Product successfully deleted"
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error: "Error deleting product"
        });
    };
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};