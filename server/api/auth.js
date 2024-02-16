const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const AuthHelper = require("../helpers/authHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/auth.js";

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    Validation.registerValidation(req.body);

    const response = await AuthHelper.register({
      username,
      email,
      password,
      role,
    });

    return res.send(response);
  } catch (err) {
    console.log([fileName, "register", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    Validation.loginValidation(req.body);

    const response = await AuthHelper.login({ email, password });

    return res.send(response);
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { newPassword, password } = req.body;
    const response = await AuthHelper.changePassword(id, newPassword, password);

    if (!response.ok) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log([fileName, "change password", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.post("/register", register);
Router.post("/login", login);
Router.patch("/change-password", Middleware.validateToken, changePassword);

module.exports = Router;
