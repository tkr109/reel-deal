const userModel = require("../models/userModel");
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const updateUserController = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.name = req.body.name;
      user.phoneNumber = req.body.phoneNumber;
      user.city = req.body.city;
      user.isAdmin = req.body.isAdmin;

  
      // Save the updated user data
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error,
      });
    }
  };
  

module.exports = { loginController, registerController, updateUserController };
