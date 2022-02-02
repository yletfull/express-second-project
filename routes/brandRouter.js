const Router = require('express');
const { usersRolesIds } = require('../constants/roles');
const brandController = require('../controllers/brand/brandController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware(usersRolesIds.admin), brandController.create);
router.get('/', brandController.getAll);

module.exports = router;
