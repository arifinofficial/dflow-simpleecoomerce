const orderService = require('../services/order.service');
const orderItemService = require('../services/item.service');
const defaultResponse = require('../utils/response');

const getByOrderId = async (req, res, next) => {
    const data = await orderItemService.find({ order: req.params.id });

    return res.json(defaultResponse(true, 'Success', data));
}

const find = async (req, res, next) => {
    const data = await orderItemService.find({ seller: req.userId });

    return res.json(defaultResponse(true, 'Success', data));
}

module.exports = {
    getByOrderId,
    find
};
