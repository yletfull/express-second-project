const Router = require('express');
const { usersRolesIds } = require('../constants/roles');
const deviceController = require('../controllers/device/deviceController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware(usersRolesIds.admin), deviceController.create);
router.delete('/:id', checkRoleMiddleware(usersRolesIds.admin), deviceController.removeOne);
router.get('/ratings', deviceController.getRatings);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.post('/feedback', authMiddleware, deviceController.createFeedback);

module.exports = router;
