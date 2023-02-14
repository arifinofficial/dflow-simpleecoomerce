const productModel = require('../models/product');
const cartModel = require('../models/cart');

const insert = async (body) => {
    const modelProduct = new productModel(body);
    const data = await modelProduct.save();

    return data;
};

const find = async (body = {}) => {
    const model = await productModel.find(body).populate([{ path: 'user' }, { path: 'categories' }]);

    return model;
};

const update = async (id, body = {}) => {
    let model = await productModel.findOne({ _id: id });

    if (model === null)
        return null;

    model = await productModel.findOneAndUpdate({ _id: id }, body, { new: true });
    return model;
};

const remove = async (id) => {
    const cartData = await cartModel.find({ product: id });

    if (cartData.length > 0) {
        await cartModel.deleteMany({product: id});
    }
    await productModel.deleteOne({_id: id});

    return true;
};

module.exports = {
    insert,
    find,
    update,
    remove
}