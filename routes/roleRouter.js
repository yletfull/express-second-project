const Router = require('express');
const RoleController = require('../controllers/role/roleController');

const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, RoleController.create);
router.get('/roles', authMiddleware, RoleController.getAll);

module.exports = router;
