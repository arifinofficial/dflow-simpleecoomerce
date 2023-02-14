const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    qty: {
        type: Number,
        min: 0,
        required: true,
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: 'order'
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model("item", itemSchema);