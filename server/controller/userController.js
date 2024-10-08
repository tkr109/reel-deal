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

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).send("User Not Found");
    }

    console.log('Updated User:', updatedUser);

    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { loginController, registerController, updateUserController };
