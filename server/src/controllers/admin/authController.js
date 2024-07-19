const { User } = require("../../models/user");
const { loginValidation } = require("../../services/AdminValidation");
const Constants = require("../../services/Constants");
const Response = require("../../services/Response");
const bcrypt = require("bcrypt");

const { issueAdmin } = require("../../services/Admin_jwtToken");

module.exports = {
  /**
   * @description This function is for admin Login.
   * @param req
   * @param res
   */
  login: async (req, res) => {
    try {
      const reqParam = req.body;
      loginValidation(reqParam, res, async (validate) => {
        if (validate) {
          const user = await User.findOne({
            username: reqParam.username,
          });

          if (user && user?.layer === "Customer") {
            return Response.errorResponseWithoutData(
              res,
              res.locals.__("Customer not allowed to login Adminside"),
              Constants.BAD_REQUEST
            );
          }

          if (user && user !== null) {
            const comparePassword = await bcrypt.compare(
              reqParam?.password,
              user?.password
            );

            if (comparePassword) {
              const userExpTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
              const payload = {
                id: user._id,
                exp: userExpTime,
              };
              const token = issueAdmin(payload);
              const meta = { token };
              let tokenUpdate = {};

              tokenUpdate = {
                $set: {
                  last_login: new Date(),
                  token: token,
                },
              };

              await User.updateOne({ _id: user?._id }, tokenUpdate);

              return Response.successResponseData(
                res,
                user,
                Constants.SUCCESS,
                res.locals.__("login successfull"),
                meta
              );
            } else {
              return Response.errorResponseWithoutData(
                res,
                res.locals.__("emailPasswordNotMatch"),
                Constants.BAD_REQUEST
              );
            }
          } else {
            Response.errorResponseWithoutData(
              res,
              res.locals.__("userEmailNotExist"),
              Constants.FAIL
            );
          }
        } else {
          Response.errorResponseWithoutData(
            res,
            res.locals.__("userNameNotExist"),
            Constants.FAIL
          );
        }
      });
    } catch (error) {
      console.error(error);
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },

  /**
   * @description "This function is to logout user."
   * @param req
   * @param res
   */
  logout: async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.authAdminId },
        {
          $set: {
            token: null,
          },
        }
      );
      console.info("logout");

      return Response.successResponseWithoutData(
        res,
        res.locals.__("logout"),
        Constants.SUCCESS
      );
    } catch (error) {
      console.error("error", error);
      return Response.errorResponseWithoutData(
        res,
        res.locals.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
};
