const { json } = require("body-parser");

const mongodb = require('../db/database');
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Realtor']

  try {
    const result = await mongodb.getDatabase().db().collection("realtors").find();

    // Convert the result to an array
    const realtors = await result.toArray();

    // Set the response header to indicate JSON content
    res.setHeader('Content-Type', 'application/json');
    
    // Send the response with the retrieved realtors array
    res.status(200).json(realtors);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getSingle = async (req, res) => {
  //#swagger.tags=['Realtor']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid realtor ID.");
    return;
  }

  const realtorsId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDatabase().db().collection("realtors").find({ _id: realtorsId });

    // Convert the result to an array
    const realtors = await result.toArray();

    if (realtors.length === 0) {
      // If no matching realtor found, send a 404 Not Found response
      res.status(404).json({ message: "realtor not found" });
      return;
    }

    // Set the response header to indicate JSON content
    res.setHeader("Content-Type", "application/json");
    
    // Send the response with the retrieved realtor
    res.status(200).json(realtors[0]);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createRealtor = async (req, res) => {
  //#swagger.tags=['Realtor']
  const realtor = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    realtorlicenseId: req.body.realtorlicenseId,
    
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("realtors")
    .insertOne(realtor);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the realtor");
  }
};

const updateRealtor = async (req, res) => {
  //#swagger.tags=['Realtor']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid realtor ID.");
  }
  const realtorsId = new ObjectId(req.params.id);
  const realtor = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    realtorlicenseId: req.body.realtorlicenseId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("realtors")
    .replaceOne({ _id: realtorsId }, realtor);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the realtor");
  }
};

const deleteRealtor = async (req, res) => {
  //#swagger.tags=['Realtor']
  const realtorsId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("realtors")
    .deleteOne({ _id: realtorsId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the realtor.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createRealtor,
  updateRealtor,
  deleteRealtor,
};
