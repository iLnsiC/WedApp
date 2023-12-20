const mongoose= require("mongoose");

const tableSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    place: { type: Number, required: true },
});

module.exports = mongoose.model("Table", tableSchema);