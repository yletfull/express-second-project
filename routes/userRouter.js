const Router = require('express');
const { roles } = require('../constants/roles');
const userController = require('../controllers/userController');

const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', authMiddleware, userController.check);

router.patch('/:id', checkRoleMiddleware(roles.admin), userController.setUser);
router.get('/users', checkRoleMiddleware(roles.admin), userController.getAllUsers);
router.get('/roles', authMiddleware, UserController.getRoles);

module.exports = router;
