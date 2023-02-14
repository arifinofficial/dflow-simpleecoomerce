const productService = require('../services/product.service');
const defaultResponse = require('../utils/response');
const slug = require('slug')

const create = async (req, res, next) => {
    let data = req.body;
    data['slug'] = slug(req.body.title, '-');
    data['user'] = req.userId;

    const checkDuplicateSlug = await productService.find({ slug: data['slug'] });

    if (checkDuplicateSlug.length > 0)
        return res.json(defaultResponse(false, 'Duplicate slug, please change the title.'));

    const response = await productService.insert(data);
    return res.json(defaultResponse(true, 'Success', response));
}

const get = async (req, res, next) => {

    const data = await productService.find({ _id: req.params.id });

    if (data.length == 0)
        return res.status(404).json(defaultResponse(false, 'Data not found.'));

    return res.json(defaultResponse(true, 'Success', data[0]));
}

const getAll = async (req, res, next) => {
    const data = await productService.find({ user: req.userId });

    return res.json(defaultResponse(true, 'Success', data));
}

const update = async (req, res, next) => {
    let data = req.body;
    data['slug'] = slug(req.body.title, '-');

    const response = await productService.update(req.params.id, data);

    if (response == null)
        return res.status(404).json(defaultResponse(false, 'Data not found.'));

    return res.json(defaultResponse(true, 'Success', response));
}

const destroy = async (req, res, next) => {
    const data = await productService.find({ _id: req.params.id });

    if (data.length === 0)
        return res.status(404).json(defaultResponse(false, 'Data not found.'));

    await productService.remove(req.params.id);

    return res.json(defaultResponse(true, 'Success'));
}

module.exports = {
    create,
    getAll,
    update,
    destroy,
    get
};
