const cartModel = require('../models/cart');
const productModel = require('../models/product');
const defaultResponse = require('../utils/response');

const insertOrUpdate = async (body) => {
    const product = await productModel.findOne({ _id: body.product });

    if (product === null)
        return defaultResponse(false, 'Product not found');

    const currentCartUser = await cartModel.findOne({ product: body.product, user: body.user });

    if (currentCartUser) {
        const totalQty = currentCartUser.qty + Number(body.qty);

        if (totalQty > product.qty)
            return defaultResponse(false, 'Quantity exceeds the limit');

        currentCartUser.qty = totalQty;

        await currentCartUser.save();
    } else {
        if (Number(body.qty) > product.qty)
            return defaultResponse(false, 'Quantity exceeds the limit');

        const model = new cartModel(body);

        await model.save();
    }

    const dataObj = await cartModel.find({ user: body.user });

    return defaultResponse(true, 'Success add to cart', dataObj);
};

const findAll = async (body = {}) => {
    return await cartModel.find(body).populate({ path: 'product' });
};

const find = async (body = {}) => {
    const model = await cartModel.find(body);

    return model;
};

const remove = async (id) => {
    await cartModel.deleteOne({ _id: id });

    return true;
};

module.exports = {
    insertOrUpdate,
    findAll,
    find,
    remove
}