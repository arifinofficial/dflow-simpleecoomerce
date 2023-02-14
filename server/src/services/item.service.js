const cartModel = require('../models/cart');
const productModel = require('../models/product');
const orderModel = require('../models/order');
const itemModel = require('../models/item');
const defaultResponse = require('../utils/response');

const find = async (body = {}) => {
    return await itemModel.find(body);
};

module.exports = {
    find,
}