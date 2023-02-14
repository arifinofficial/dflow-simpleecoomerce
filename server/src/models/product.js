const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        min: 0
    },
    image: {
        type: String,
        default: null
    },
    qty: {
        type: Number,
        min: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    categories: [
        { type: mongoose.Types.ObjectId, ref: 'category' }
    ],
}, { timestamps: true });

module.exports = mongoose.model("product", productSchema);