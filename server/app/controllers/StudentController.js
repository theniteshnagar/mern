const StudentModel = require("../models/StudentModel");

const StudentController = {
  async create(req, res) {
    const body = req.body;

    if (!body.name) {
      res.status(500).send({
        error: "Name is required",
      });
    } else {
      try {
        await StudentModel.create(body);
        res.status(201).send({
          message: "Success! New Record Created.",
          reqBody: body,
        });
      } catch (error) {
        console.error("Error occured while creating new Student: ", error);
        res.status(500).send({
          error: error,
        });
      }
    }
  },

  async readAll(req, res) {
    const students = await StudentModel.find();
    res.send({
      message: "Success! Records Found.",
      data: students,
    });
  },

  async readOne(req, res) {
    const params = req.params;
    const studentDetails = await StudentModel.findById(params.id);

    res.send({
      message: "Success! Student Details Found.",
      data: studentDetails,
    });
  },

  async update(req, res) {
    const params = req.params;
    const body = req.body;

    await StudentModel.findByIdAndUpdate(params.id, body);

    res.send({
      message: "Success! Record has been Updated.",
    });
  },

  async destroy(req, res) {
    const params = req.params;

    await StudentModel.findByIdAndDelete(params.id);

    res.send({
      message: "Success! Record has been Deleted.",
    });
  },
};

module.exports = StudentController;
