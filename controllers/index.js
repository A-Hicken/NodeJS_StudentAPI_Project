const { mongo } = require("mongoose");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const awesomeFunction = (req, res, next) => {
  res.json("Hello World!");
};

const tooeleTechFunction = (req, res, next) => {
  res.json("Tooele Tech is Awesome!");
};

const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("Students").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET single contact
const getSingleStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("Students")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { awesomeFunction, tooeleTechFunction, getAllStudents };
