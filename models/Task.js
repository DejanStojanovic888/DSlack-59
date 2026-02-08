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
    public: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Pending", "In-Progress", "Completed", "Cancelled"],  // moze biti samo jedan od ovih(u odnosu na ovo, tek tad moze da se obrise task, da se edituje task itd...)
        default: "Pending"
    }
}, { timestamps: true });  // kao da sam ja pisao createdAt i updatedAt u bazi(createdAt, type date, default now)

// pravimo metodu a koristimo je kao property(valjda svaku metodu koristimo kao property?)
TaskSchema.methods.isOwner = function(userId){ //kreirali smo novu metodu na TaskSchema(pokrecemo je kao property)
                                               // ovde ne smemo da trazimo req.session.user._id jer se ne sme to raditi u blueprint-u za Schema-u
                                               // String() mora jer je task mongoose-document-object
    let assignedBy = this.assignedBy._id || this.assignedBy; // uzece vrednost this.assignedBy._id ako smo uradili .populate() a ako nismo onda uzima this.assignedBy(koji je takodje id)
    return  (userId === String(assignedBy))  // this je task kasnije u 'admin/task/index.ejs'(jer smo ovu metodu dodali na TaskSchema)
}
// virtuale nam nije jos pokazivao
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;