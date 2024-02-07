const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    try {
        const result = await mongodb.getDatabase().db().collection("properties").find();
        result.toArray().then((properties) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(properties)
        });
    } catch (error) {
        console.error("ERROR: ", error)
        res.status(500).json({ error: "An error ocurred. Please, try again. "});
    }
}

module.exports = { getAll };