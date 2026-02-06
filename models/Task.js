const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    publid: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Pending", "In-Progress", "Completed", "Cancelled"],  // moze biti samo jedan od ovih(u odnosu na ovo, tek tad moze da se obrise task, da se edituje task itd...)
        default: "Pending"
    }
}, { timestamps: true });  // kao da sam ja pisao createdAt i updatedAt u bazi(createdAt, type date, default now)

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;