const express = require("express");
const StudentController = require("./app/controllers/StudentController");
const { default: mongoose } = require("mongoose");

const PORT = 3000;

const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/StudentsDataBase");

app.get("/", (req, res) => {
  res.send("MERN Stack");
});

app.post("/student", StudentController.create);
app.get("/student", StudentController.readAll);
app.get("/student/:id", StudentController.readOne);
app.put("/student/:id", StudentController.update);
app.delete("/student/:id", StudentController.destroy);

// Server Start
app.listen(PORT, () => {
  console.info(`Server Running at http://localhost:${PORT}`);
});
