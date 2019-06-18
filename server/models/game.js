const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be 3 characters or more"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0.99, "Too cheap for our store"]
    },
    discount: {
        type: Number,
        min: [0, "You cannot have a discount less than 0%"],
        max: [95, "You cannot discount over 95%"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [4, "Description must be 4 characters or more"]
    }
}, {timestamps: true});

mongoose.model("Game", GameSchema);