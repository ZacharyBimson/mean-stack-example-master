const db = require("../models");
const Employee = db.employees;

// Create and Save a new employee
exports.create = (req, res) => {
  // Create a employee
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    department: req.body.department,
    position: req.body.position,
    salary: req.body.salary,
    country: req.body.country
  });

  // Save employee in the database
  employee
    .save(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee."
      });
    });
};

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
  const firstName = req.query.firstName;
  var condition = firstName ? { firstName: { $regex: new RegExp(firstName), $options: "i" } } : {};

  employee.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Find a single employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  employee.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found employee with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving employee with id=" + id });
    });
};

// Update a employee by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update employee with id=${id}. Maybe employee was not found!`
        });
      } else res.send({ message: "Employee was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employee with id=" + id
      });
    });
};

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  employee.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id
      });
    });
};

// Delete all employees from the database.
exports.deleteAll = (req, res) => {
  employee.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} employees were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    });
};

// Find all published employees
exports.findAllPublished = (req, res) => {
  employee.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};
