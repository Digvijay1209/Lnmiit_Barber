const mongoose = require('mongoose');

const validRoles = ['visitor', 'admin'];

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: validRoles,
        default: "visitor"
    }
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
