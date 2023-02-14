const categorService = require('../services/category.service');
const defaultResponse = require('../utils/response');
const slug = require('slug')

const create = async (req, res, next) => {
    let data = req.body;
    data['slug'] = slug(req.body.title, '-');

    const checkDuplicateSlug = await categorService.find({ slug: data['slug'] });

    if (checkDuplicateSlug != null)
        return res.json(defaultResponse(false, 'Duplicate slug, please change the title.'));

    const response = await categorService.insert(data);
    return res.json(defaultResponse(true, 'Success', response));
}

const get = async (req, res, next) => {

    const data = await categorService.find({ _id: req.params.id });

    if (data == null)
        return res.status(404).json(defaultResponse(false, 'Data not found.'));

    return res.json(defaultResponse(true, 'Success', data));
}

const getAll = async (req, res, next) => {

    const data = await categorService.find();

    let dataNew = [...data];

    return res.json(defaultResponse(true, 'Success', dataNew));
}

const update = async (req, res, next) => {
    let data = req.body;
    data['slug'] = slug(req.body.title, '-');

    const response = await categorService.update(req.params.id, data);

    return res.json(defaultResponse(true, 'Success', response));
}

const destroy = async (req, res, next) => {
    const data = await categorService.find({ _id: req.params.id });

    if (data === null)
        return res.status(404).json(defaultResponse(false, 'Data not found.'));

    await categorService.remove(req.params.id);

    return res.json(defaultResponse(true, 'Success'));
}

module.exports = {
    create,
    getAll,
    update,
    destroy,
    get
};
