module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Create a new employee
  router.post("/", employees.create);

  // Retrieve all employees
  router.get("/", employees.findAll);

  // Retrieve all published employees
  router.get("/published", employees.findAllPublished);

  // Retrieve a single employee with id
  router.get("/:id", employees.findOne);

  // Update a employee with id
  router.put("/:id", employees.update);

  // Delete a employee with id
  router.delete("/:id", employees.delete);

  // Create a new employee
  router.delete("/", employees.deleteAll);

  app.use("/api/employees", router);
};
