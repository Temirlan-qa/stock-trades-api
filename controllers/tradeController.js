const db = require('../database');

// @desc create trade
// @route POST /trades
// @access public
const createTrade = (req, res) => {
    const { type, user_id, symbol, shares, price, timestamp } = req.body;
    const query = `INSERT INTO trades (type, user_id, symbol, shares, price, timestamp) VALUES (?,?,?,?,?,?)`;

    db.run(query, [type, user_id, symbol, shares, price, timestamp], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            type,
            user_id,
            symbol,
            shares,
            price,
            timestamp
        });
    });
};

// @desc Get All trades
// @route GET /trades
// @access public
const getTrades = (req, res) => {
    let { type, user_id } = req.query;
    let query = `SELECT * FROM trades WHERE 1=1`;
    let params = [];

    if (type) {
        query += ` AND type = ?`;
        params.push(type);
    }

    if (user_id) {
        query += ` AND user_id = ?`;
        params.push(user_id);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
}

// @desc Get trade
// @route GET /trades/id
// @access public
const getTradeDetail = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM trades WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "ID not found" });
        }
        res.status(200).json(row);
    });
}

// @desc Method not allowed
// @route DELETE , PUT , PATCH /trades:id
// @access public
const notAllowedMethod = (req,res) => {
    res.status(405).send();
};


module.exports = {createTrade,getTrades,getTradeDetail, notAllowedMethod};