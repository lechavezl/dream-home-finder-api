const { json } = require("body-parser");

const mongodb = require('../db/database');
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Properties']

  try {
    const result = await mongodb.getDatabase().db().collection("properties").find();

    // Convert the result to an array
    const properties = await result.toArray();

    // Set the response header to indicate JSON content
    res.setHeader('Content-Type', 'application/json');
    
    // Send the response with the retrieved properties array
    res.status(200).json(properties);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getSingle = async (req, res) => {
  //#swagger.tags=['Properties']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid property ID.");
    return;
  }

  const propertiesId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDatabase().db().collection("properties").find({ _id: propertiesId });

    // Convert the result to an array
    const properties = await result.toArray();

    if (properties.length === 0) {
      // If no matching property found, send a 404 Not Found response
      res.status(404).json({ message: "property not found" });
      return;
    }

    // Set the response header to indicate JSON content
    res.setHeader("Content-Type", "application/json");
    
    // Send the response with the retrieved property
    res.status(200).json(properties[0]);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createProperty = async (req, res) => {
  //#swagger.tags=['Properties']
  const property = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    status: req.body.status,
    realtorId: req.body.realtorId,
    
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .insertOne(property);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the property");
  }
};

const updateProperty = async (req, res) => {
  //#swagger.tags=['Properties']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid property ID.");
  }
  const propertiesId = new ObjectId(req.params.id);
  const property = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    status: req.body.status,
    realtorId: req.body.realtorId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .replaceOne({ _id: propertiesId }, property);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the property");
  }
};

const deleteProperty = async (req, res) => {
  //#swagger.tags=['Properties']
  const propertiesId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .deleteOne({ _id: propertiesId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the property.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createProperty,
  updateProperty,
  deleteProperty,
};
