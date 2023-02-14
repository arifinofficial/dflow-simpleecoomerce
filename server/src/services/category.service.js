const categoryModel = require('../models/category');

const insert = async (body) => {
    const model = new categoryModel({
        title: body.title,
        slug: body.slug,
    });

    const data = await model.save();

    return data;
};

const find = async (body = {}) => {
    let model = null;
    if(Object.keys(body).length === 0){
        model = await categoryModel.find({});
    } else {
        model = await categoryModel.findOne(body);
    }

    return model;
};

const update = async (id, body = {}) => {
    let model = await categoryModel.findOne({_id: id});
    model.title = body.title;
    model.slug = body.slug;

    model = await model.save();
    return model;
};

const remove = async (id) => {
    await categoryModel.deleteOne({_id: id});

    return true;
};

module.exports = {
    insert,
    find,
    update,
    remove
}