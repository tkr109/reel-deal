const express=require("express")
const { loginController, registerController, updateUserController } = require('../controller/userController')

//router object
const router = express.Router();


// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

// PUT || UPDATE USER
router.put("/update/:id", updateUserController);

module.exports=router