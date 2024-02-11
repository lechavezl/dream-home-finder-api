const { json } = require("body-parser");

const mongodb = require('../db/database');
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Favorites']

  try {
    const result = await mongodb.getDatabase().db().collection("favorites").find();

    // Convert the result to an array
    const favorites = await result.toArray();

    // Set the response header to indicate JSON content
    res.setHeader('Content-Type', 'application/json');
    
    // Send the response with the retrieved favorites array
    res.status(200).json(favorites);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getSingle = async (req, res) => {
  //#swagger.tags=['Favorites']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid favorite ID.");
    return;
  }

  const favoritesId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDatabase().db().collection("favorites").find({ _id: favoritesId });

    // Convert the result to an array
    const favorites = await result.toArray();

    if (favorites.length === 0) {
      // If no matching favorite found, send a 404 Not Found response
      res.status(404).json({ message: "favorite not found" });
      return;
    }

    // Set the response header to indicate JSON content
    res.setHeader("Content-Type", "application/json");
    
    // Send the response with the retrieved favorite
    res.status(200).json(favorites[0]);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createFavorite = async (req, res) => {
  //#swagger.tags=['Favorites']
  const favorite = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("favorites")
    .insertOne(favorite);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the favorite");
  }
};

const updateFavorite = async (req, res) => {
  //#swagger.tags=['Favorites']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid favorite ID.");
  }
  const favoritesId = new ObjectId(req.params.id);
  const favorite = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("favorites")
    .replaceOne({ _id: favoritesId }, favorite);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the favorite");
  }
};

const deleteFavorite = async (req, res) => {
  //#swagger.tags=['Favorites']
  const favoritesId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("favorites")
    .deleteOne({ _id: favoritesId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the favorite.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createFavorite,
  updateFavorite,
  deleteFavorite,
};
