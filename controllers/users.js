const { json } = require("body-parser");

const mongodb = require('../db/database');
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']

  try {
    const result = await mongodb.getDatabase().db().collection("users").find();

    // Convert the result to an array
    const users = await result.toArray();

    // Set the response header to indicate JSON content
    res.setHeader('Content-Type', 'application/json');
    
    // Send the response with the retrieved users array
    res.status(200).json(users);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user ID.");
    return;
  }

  const usersId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDatabase().db().collection("users").find({ _id: usersId });

    // Convert the result to an array
    const users = await result.toArray();

    if (users.length === 0) {
      // If no matching user found, send a 404 Not Found response
      res.status(404).json({ message: "user not found" });
      return;
    }

    // Set the response header to indicate JSON content
    res.setHeader("Content-Type", "application/json");
    
    // Send the response with the retrieved user
    res.status(200).json(users[0]);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    
    userId: req.body.userId,
    
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the user");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user ID.");
  }
  const usersId = new ObjectId(req.params.id);
  const user = {
    title: req.body.title,
    description: req.body.description,
 
    userId: req.body.userId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: usersId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const usersId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .deleteOne({ _id: usersId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
