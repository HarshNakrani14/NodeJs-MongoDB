const mongoose = require('mongoose');
const { Schema } = mongoose; 

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum:['sweet','spicy','sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false 
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

// create menu model

const MenuItem = mongoose.model('MenuItem', menuSchema);
module.exports = MenuItem;
