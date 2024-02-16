const Boom = require("boom");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const db = require("../../models");
const GeneralHelper = require("./generalHelper");

const jwtSecretToken = process.env.JWT_SECRET_TOKEN || "super_strong_key";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";
const fileName = "server/helpers/authHelper.js";
const salt = bcrypt.genSaltSync(10);

// eslint-disable-next-line arrow-body-style
const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
};

// eslint-disable-next-line arrow-body-style
const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
};

exports.register = async (dataObject) => {
  const { username, email, password } = dataObject;

  try {
    const user = await db.User.findOne({
      where: { email },
    });
    if (!_.isEmpty(user)) {
      return Promise.reject(Boom.badRequest("EMAIL_HAS_BEEN_USED"));
    }

    const hashedPass = __hashPassword(password);
    await db.User.create({ username, email, password: hashedPass });

    return Promise.resolve({
      success: true,
      message: "Register successfully",
    });
  } catch (err) {
    console.log([fileName, "register", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

exports.login = async (dataObject) => {
  const { email, password } = dataObject;

  try {
    const user = await db.User.findOne({
      where: { email },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    const isPassMatched = __comparePassword(password, user.password);
    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest("WRONG_CREDENTIALS"));
    }

    const token = __generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    return Promise.resolve({
      success: true,
      message: "Login successfully",
      results: user,
      token,
    });
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

exports.changePassword = async (dataObject) => {
  const { id, newPassword, confirmPassword } = dataObject;
  try {
    const user = await db.User.findOne({
      where: { id },
    });

    if (!_.isEqual(newPassword, confirmPassword)) {
      return Promise.reject(
        Boom.notFound("Password and confirm password should to be equal")
      );
    }

    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound("User not found"));
    }

    const hashedPass = __hashPassword(newPassword);

    await db.User.update(
      {
        password: hashedPass,
      },
      { where: { id } }
    );

    return Promise.resolve({
      success: true,
      message: `Change password successfully`,
    });
  } catch (err) {
    console.log([fileName, "change password", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};
