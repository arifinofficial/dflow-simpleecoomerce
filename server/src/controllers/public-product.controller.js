const productService = require('../services/product.service');
const defaultResponse = require('../utils/response');

const getAll = async (req, res, next) => {
    let data = await productService.find();

    return res.json(defaultResponse(true, 'Success', data));
}

module.exports = {
    getAll,
};
