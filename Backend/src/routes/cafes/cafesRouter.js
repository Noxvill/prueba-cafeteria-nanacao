const {add_cafe_controller} = require('../../controllers/cafes/cafesControllers')
const {CafesValidatorCollection} = require('../../validators/cafes/cafesValidator')
const handleLogs = require('../../middlewares/logsMiddleware');
const handlelogin = require('../../middlewares/handleLogin')
const {authMiddleware} = require('../../middlewares/authMiddleware')
const router = require('express').Router();



router.post('/register', handleLogs, CafesValidatorCollection.addValidator, add_cafe_controller);
// router.post('/login', handlelogin.handleLoginMiddleware, login_controller);
// router.get('/perfil/', authMiddleware, get_profile_controller);

module.exports = router;