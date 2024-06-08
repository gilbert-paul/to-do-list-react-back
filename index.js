require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const allTask = await Task.find();
    res.status(200).json(allTask);
  } catch (error) {
    res.status(500).json({ message: "ERROR DB" });
  }
});

app.post("/", async (req, res) => {
  try {
    const { task, checked } = req.body;
    const newTask = new Task({
      task: task,
      checked: checked,
    });
    await newTask.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "ERROR DB" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "ERROR DB" });
  }
});
app.put("/:id", async (req, res) => {
  try {
    const changeTask = await Task.findById(req.params.id);
    changeTask.checked = req.body.checked;
    changeTask.save();
    res.status(200).json(changeTask);
  } catch (error) {
    res.status(500).json({ message: "ERROR DB" });
  }
});
app.all("*", async (req, res) => {
  try {
    res.status(404).json({ message: "All Routes" });
  } catch (error) {
    res.status(404).json({ message: "Route not found" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server ON - ${process.env.PORT}`)
);
