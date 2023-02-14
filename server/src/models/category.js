const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    products: [
        { type: mongoose.Types.ObjectId, ref: 'product' }
    ],
}, { timestamps: true });

module.exports = mongoose.model("category", categorySchema);