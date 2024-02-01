const routes = require("express").Router();
const myController = require("../controllers");

routes.get("/", myController.awesomeFunction);
routes.get("/ttech", myController.tooeleTechFunction);
//student routes
routes.use("/students", require("./students"));

module.exports = routes;
