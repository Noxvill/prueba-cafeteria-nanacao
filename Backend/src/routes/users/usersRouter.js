const {add_user_controller, login_controller, get_profile_controller} = require('../../controllers/users/usersControllers')
const {UsersValidatorCollection} = require('../../validators/users/usersValidator')
const handleLogs = require('../../middlewares/logsMiddleware');
const handlelogin = require('../../middlewares/handleLogin')
const {authMiddleware} = require('../../middlewares/authMiddleware')
const router = require('express').Router();

router.post('/register', handleLogs, UsersValidatorCollection.addValidator, add_user_controller);
router.post('/login', handlelogin.handleLoginMiddleware, login_controller);
router.get('/perfil/', authMiddleware, get_profile_controller);

module.exports = router;