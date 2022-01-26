const Router = require('express');
const { roles } = require('../constants/roles');
const userController = require('../controllers/user/userController');

const router = new Router();
const UserController = require('../controllers/user/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', authMiddleware, userController.check);

router.patch('/:id', checkRoleMiddleware(roles.admin), userController.setUser);
router.get('/users', checkRoleMiddleware(roles.admin), userController.getAllUsers);

module.exports = router;
