module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    firstName: {
      type: "String",
    },
    lastName: {
      type: "String",
    },
    email: {
      type: "String",
    },
    phoneNumber: {
      type: "String",
    },
    department: {
      type: "String",
    },
    position: {
      type: "String",
    },
    salary: {
      type: "Number",
    },
    country: {
      type: "String",
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Employee = mongoose.model("employee", schema);
  return Employee;
};
