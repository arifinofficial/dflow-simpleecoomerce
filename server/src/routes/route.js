const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const validation = require('../validator/index');
const { registerValidation, loginValidation } = require('../validator/user.validation');
const authController = require('../controllers/auth.controller')
const categoryController = require('../controllers/category.controller')
const productController = require('../controllers/product.controller')
const productPublicController = require('../controllers/public-product.controller')
const cartController = require('../controllers/cart.controller')
const orderController = require('../controllers/order.controller')
const orderItemController = require('../controllers/order-item.controller')

// Auth route
router.post('/auth/register', registerValidation, validation, authController.register);
router.post('/auth/login', loginValidation, validation, authController.login);
router.get('/auth/refresh-token', authController.refreshToken);
router.delete('/auth/logout', authMiddleware, authController.logout);
router.get('/auth', authMiddleware, (req, res) => res.json('ok'));
// Category route
router.get('/category', categoryController.getAll);
router.get('/category/get/:id', categoryController.get);
router.post('/category/create', authMiddleware, categoryController.create);
router.put('/category/update/:id', authMiddleware, categoryController.update);
router.delete('/category/delete/:id', authMiddleware, categoryController.destroy);
// Product route
router.get('/product-public', productPublicController.getAll);

router.post('/product/create', authMiddleware, productController.create);
router.get('/product', authMiddleware, productController.getAll);
router.get('/product/get/:id', authMiddleware, productController.get);
router.put('/product/update/:id', authMiddleware, productController.update);
router.delete('/product/delete/:id', authMiddleware, productController.destroy);
// Cart route
router.post('/cart/create', authMiddleware, cartController.create);
router.get('/cart/get', authMiddleware, cartController.getAll);
router.delete('/cart/delete/:id', authMiddleware, cartController.destroy);
// Order route
router.post('/order/create', authMiddleware, orderController.create);
router.get('/order', authMiddleware, orderController.getAll);
router.get('/order/get/:id', authMiddleware, orderController.get);
// Order item route
router.get('/order-item/get/:id', authMiddleware, orderItemController.getByOrderId);
router.get('/order-user', authMiddleware, orderItemController.find);

module.exports = router;