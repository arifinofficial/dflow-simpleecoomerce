const cartService = require('../services/cart.service');
const defaultResponse = require('../utils/response');

const create = async (req, res, next) => {
    let data = req.body;
    data['user'] = req.userId;

    const response = await cartService.insertOrUpdate(data);
    
    return res.json(response);
}

const getAll = async (req, res, next) => {

    const data = await cartService.findAll({ user: req.userId });

    let dataNew = [...data];

    return res.json(defaultResponse(true, 'Success', dataNew));
}

const destroy = async (req, res, next) => {
    const data = await cartService.find({ _id: req.params.id });

    if (data.length === 0)
        return res.status(404).json(defaultResponse(false, 'Data not found.'));

    await cartService.remove(req.params.id);

    const getCurrentCart = await cartService.findAll({ user: req.userId });

    return res.json(defaultResponse(true, 'Success', getCurrentCart));
}

module.exports = {
    create,
    getAll,
    destroy
};
