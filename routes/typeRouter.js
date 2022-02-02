const Router = require('express');
const { usersRolesIds } = require('../constants/roles');

const router = new Router();
const TypeController = require('../controllers/type/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware(usersRolesIds.admin), TypeController.create);
router.get('/', TypeController.getAll);

module.exports = router;
