const orderService = require('../services/order.service');
const defaultResponse = require('../utils/response');

const create = async (req, res, next) => {
    let data = req.body;
    data['user'] = req.userId;

    const response = await orderService.insert(data);

    return res.json(response);
}

const getAll = async (req, res, next) => {

    const data = await orderService.find({ user: req.userId });

    return res.json(defaultResponse(true, 'Success', data));
}

const get = async (req, res, next) => {

    const data = await orderService.find({ user: req.userId, _id: req.params.id });

    return res.json(defaultResponse(true, 'Success', data[0]));
}

module.exports = {
    create,
    getAll,
    get
};
