const Response = require("../services/Response");
const jwToken = require("../services/Admin_jwtToken");
const Constants = require("../services/Constants");
const { User } = require("../models/user");

module.exports = {
  adminTokenAuth: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        Response.errorResponseWithoutData(
          res,
          res.locals.__("authorizationError"),
          401
        );
      } else {
        const tokenData = await jwToken.decode(token);
        if (tokenData) {
          const decoded = await jwToken.verify(tokenData);
          if (decoded.id) {
            req.authAdminId = decoded.id;
            const admin = await User.findOne(
              { _id: req.authAdminId },
              { _id: 1 }
            );
            if (admin) {
              return next();
            } else {
              return Response.errorResponseWithoutData(
                res,
                res.locals.__("invalidToken"),
                401
              );
            }
          } else {
            return Response.errorResponseWithoutData(
              res,
              res.locals.__("invalidToken"),
              401
            );
          }
        } else {
          return Response.errorResponseWithoutData(
            res,
            res.locals.__("invalidToken"),
            401
          );
        }
      }
    } catch (error) {
      return Response.errorResponseWithoutData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
};
