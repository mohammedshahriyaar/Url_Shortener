const express= require('express');
const router = express.Router();    
const {handleUserSignup,handleUserLogin} = require('../controllers/userController')

router.post('/',handleUserSignup)
router.post('/signin',handleUserLogin)
module.exports=router