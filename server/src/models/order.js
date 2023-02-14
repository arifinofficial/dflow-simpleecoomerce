const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    invoice: {
        type: String,
        required: true,
        unique: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    items: [
        { 
            type: mongoose.Types.ObjectId, 
            ref: 'item' 
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);