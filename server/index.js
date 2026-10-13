const express = require("express");
const mongoose = require("mongoose");

const StudentController = require("./app/controllers/StudentController");
const AuthController = require("./app/controllers/AuthController");
const { PORT } = require("./app/utils/constants.utils");
const { authMiddleware } = require("./app/middleware/authMiddleware");

const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/StudentsDataBase");

app.get("/", (req, res) => {
  res.send("MERN Stack");
});

app.post("/student", StudentController.create);
app.get("/student", [authMiddleware], StudentController.readAll);
app.get("/student/:id", StudentController.readOne);
app.put("/student/:id", StudentController.update);
app.delete("/student/:id", StudentController.destroy);

// User Signup and Login
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// Server Start
app.listen(PORT, () => {
  console.info(`Server Running at http://localhost:${PORT}`);
});
