const cartRoutes = require('express').Router();
const { cartAddController, cartGetController, cartRemoveController } = require('../controller/cartController');
;

// 1. ADD TO CART
cartRoutes.post('/add',cartAddController);

// 2. GET USER CART
cartRoutes.get('/:userId',cartGetController );

// Remove item from cart
cartRoutes.delete('/remove', cartRemoveController);

module.exports = cartRoutes;