const _ = require("lodash");
const Boom = require("boom");

const db = require("../../models");
const GeneralHelper = require("./generalHelper");

const fileName = "server/helpers/userHelper.js";

exports.getAllUser = async () => {
  try {
    const result = await db.User.findAll({
      attributes: { exclude: ["password", "role", "createdAt", "updatedAt"] },
    });

    return Promise.resolve({
      success: true,
      message: "List of all user",
      result,
    });
  } catch (err) {
    console.log([fileName, "get all user", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

exports.getUserDetail = async (id) => {
  try {
    const result = await db.User.findByPk(id, {
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });
    if (_.isEmpty(result)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    return Promise.resolve({
      success: true,
      message: "User detail",
      result,
    });
  } catch (err) {
    console.log([fileName, "get detail user", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

exports.update = async (id, data) => {
  try {
    await getUserDetail(id);

    const { username, email, role } = data;
    const result = await db.User.update(
      { username, email, role },
      { where: { id } }
    );
    if (_.isEmpty(result)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    return Promise.resolve({
      success: true,
      message: `Update user ${data.username} successfully`,
    });
  } catch (err) {
    console.log([fileName, "update profile", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};
