const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    family: { type: Number, required: true},
    side: { type: Number, required: true, default: 0 },
    isChild: { type: Boolean, required: true, default: false },
    isMain: { type: Boolean, required: true, default: false },
    table: { type: String, default: '' },
    userName: { type: String, required: true, unique: true },
    diet: { type: String, default: "" },
    restriction: { type: String, default: "" },
    isPresent: {
        cityHall: { type: Boolean, required: true, default: false },
        cityHallValidatedBy: { type: String },
        reception: { type: Boolean, required: true, default: false },
        receptionValidatedBy: { type: String },
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Invites", userSchema);