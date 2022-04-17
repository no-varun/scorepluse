const userRouter = require('express').Router();
const userController = require('../controller/Controller');
const auth = require('../middleware/auth')

userRouter.get('/getProfile', auth.userVerify, userController.profile);

userRouter.post('/signUp', userController.signUp);
userRouter.post('/login', userController.login);





module.exports = userRouter;