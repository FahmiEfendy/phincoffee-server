const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const UserHelper = require("../helpers/userHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/user.js";

const userList = async (req, res) => {
  try {
    const { username } = req.query;
    const response = await UserHelper.getAllUser(username);

    if (!response.ok) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log([fileName, "user list", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const userDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserHelper.getUserDetail(id);

    if (!response) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log([fileName, "user detail", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateProfile = async (req, res) => {
  try {
    Validation.profileValidation(req.body);

    const { id } = req.params;
    const data = req.body;
    const response = await UserHelper.update(id, data);

    if (!response.ok) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log([fileName, "update profile", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/user", userList);
Router.get("/user/:id", userDetail);
Router.patch("/user/:id", updateProfile);

module.exports = Router;
