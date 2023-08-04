const { Signup, Login, Update, GetUserDetails, GetPublicUserDetails } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()


router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification)
router.get('/user-details', userVerification,GetUserDetails);
router.get('/user',GetPublicUserDetails);
router.post('/update', userVerification, Update); // Add the update route with userVerification middleware



module.exports = router