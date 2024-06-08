const mongoose =require('mongoose')

const Task = mongoose.model("Task",{
  task:String,
  checked:Boolean
})

module.exports = Task