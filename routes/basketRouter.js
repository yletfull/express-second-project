const Router = require('express');
const basketController = require('../controllers/basket/baksetController');

const router = new Router();

router.get('/', basketController.getBasketItems);

module.exports = router;
