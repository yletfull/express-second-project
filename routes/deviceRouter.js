const Router = require('express');
const { usersRolesIds } = require('../constants/roles');
const deviceController = require('../controllers/device/deviceController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware(usersRolesIds.admin), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;
