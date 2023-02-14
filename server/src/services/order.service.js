const cartModel = require('../models/cart');
const productModel = require('../models/product');
const orderModel = require('../models/order');
const itemModel = require('../models/item');
const defaultResponse = require('../utils/response');

const insert = async (body) => {
    const productId = body.cart.map(x => x.product);
    let product = await productModel.find({ '_id': { $in: productId } });

    let orderObj = {};
    let itemData = [];

    let invoice = `${(Math.random() + 1).toString(36).substring(7)}-${new Date().toISOString()}`;
    invoice = invoice.toUpperCase();
    let total = null;

    body.cart.forEach(item => {
        const findProduct = product.find(x => x._id == item.product);
        total += findProduct.price * item.qty;

        itemData.push({
            title: findProduct.title,
            price: findProduct.price,
            qty: item.qty,
            seller: findProduct.user
        })
    });

    orderObj['invoice'] = invoice;
    orderObj['total'] = total;
    orderObj['user'] = body.user;

    const saveOrder = await new orderModel(orderObj).save();

    itemData = itemData.map(item => {
        item['order'] = saveOrder._id;

        return item;
    });

    await itemModel.insertMany(itemData);

    let bulkArr = [];

    for (const item of body.cart) {
        const qty = product.find(x => x._id == item.product).qty - item.qty;
        bulkArr.push({
            updateOne: {
                "filter": { "_id": item.product },
                "update": { "qty": qty  }
            }
        })

    }

    await productModel.bulkWrite(bulkArr);

    await cartModel.deleteMany({user: body.user});

    return defaultResponse(true, 'Success');
};

const find = async (body = {}) => {
    return await orderModel.find(body).populate([{path: 'items'}]);
};

const remove = async (id) => {
    await cartModel.deleteOne({ _id: id });

    return true;
};

module.exports = {
    insert,
    find,
    remove
}