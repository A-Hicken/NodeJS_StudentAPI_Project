const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/index");

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getSingleStudent);

router.post("/", StudentController.createStudent);

router.patch("/editstudent/:id", StudentController.updateStudent);

router.delete("/delete/:id", StudentController.deleteStudent);

module.exports = router;
