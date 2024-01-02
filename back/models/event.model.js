const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    places: {
        date: { type: Date, required: true },
        place: { type: String, required: true },
    },
    planning: {
        time: { type: Date, required: true },
        logo: { type: String, required: true },
        Activity: { type: String, required: true },
    },
    menu: {
        date: { type: Date, required: true },
        place: { type: String, required: true },
    },
});

module.exports = mongoose.model("Invites", eventSchema);