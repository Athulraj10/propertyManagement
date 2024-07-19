const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const {
  loginValidation,
  registerValidation,
} = require("../../services/AdminValidation");
const Constants = require("../../services/Constants");
const Helper = require("../../services/Helper");
const { issueUser } = require("../../services/User_jwtToken");
const Response = require("../../services/Response");
const Role = require("../../models/Role");

module.exports = {
  /**
   * @description "This function is for Register new user."
   * @param req
   * @param res
   */
  register: async (req, res) => {
    try {
      const reqParam = req.body;

      registerValidation(reqParam, res, async (validate) => {
        if (validate) {
          const existingUser = await User.findOne({
            username: reqParam.username,
          });

          if (existingUser) {
            return Response.errorResponseData(
              res,
              res.locals.__("UserName already exists"),
              Constants.BAD_REQUEST
            );
          }

          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(
            reqParam.password,
            saltRounds
          );

          let role = null;
          role = await Role.findOne({ name: reqParam.role });

          if (!role) {
            const newRole = new Role({ name: reqParam.role });
            await newRole.save();
            role = newRole;
          }

          const newUser = new User({
            username: reqParam.username.toLowerCase(),
            email: reqParam.email,
            password: hashedPassword,
            role: role._id,
            text: reqParam.password,
            layer: reqParam.role,
          });
          

          await newUser.save();

          return Response.successResponseData(
            res,
            newUser,
            Constants.SUCCESS,
            res.locals.__("Registration successful")
          );
        }
      });
    } catch (error) {
      console.error(error);
      return Response.errorResponseData(
        res,
        res.locals.__("Internal Server Error"),
        Constants.INTERNAL_SERVER
      );
    }
  },


  login: async (req, res) => {
    try {
      const reqParam = req.body;
      loginValidation(reqParam, res, async (validate) => {
        if (validate) {
          const user = await User.findOne({
            username: reqParam.username.toLowerCase(),
          });

          if(user && user?.layer === 'Admin'){
            return Response.errorResponseWithoutData(
              res,
              res.locals.__("Admin not allowed to login userside"),
              Constants.BAD_REQUEST
            );
          }

          if (user && user !== null) {
            const comparePassword = await bcrypt.compare(
              reqParam.password,
              user.password
            );

            if (comparePassword) {
              const userExpTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
              const payload = {
                id: user._id,
                exp: userExpTime,
              };
              const token = issueUser(payload);
              const meta = { token };
              let tokenUpdate = {};

              tokenUpdate = {
                $set: {
                  last_login: new Date(),
                  token: token
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
      const requestParams = req.body;
      await User.updateOne(
        { _id: requestParams.user_id },
        {
          $set: {
            token: null,
            tokenExpiresAt: null,
          },
        }
      );

      return Response.successResponseWithoutData(
        res,
        res.locals.__("logout"),
        Constants.SUCCESS
      );


    } catch (error) {
      return Response.errorResponseWithoutData(
        res,
        res.locals.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
};
