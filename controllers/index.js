const { mongo } = require("mongoose");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const awesomeFunction = (req, res, next) => {
  res.json("Hello World!");
};

const tooeleTechFunction = (req, res, next) => {
  res.json("Tooele Tech is Awesome!");
};

// GET all Students
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

// GET single Student
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

// CREATE Student
const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("Students")
      .insertOne(student);
    if (response.acknowleged) {
      res.status(201).json(repsonse);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while creating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// UPDATE one Student
const updateStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("Students")
      .replaceOne({ _id: userId }, student);
    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while updating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// DELETE one Student
const deleteStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("Students")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.acknowleged) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleting the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  awesomeFunction,
  tooeleTechFunction,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  createStudent,
  deleteStudent,
};
