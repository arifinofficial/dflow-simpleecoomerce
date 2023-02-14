const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    qty: {
        type: Number,
        min: 1,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    product:
    {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
}, { timestamps: true });

module.exports = mongoose.model("cart", cartSchema);