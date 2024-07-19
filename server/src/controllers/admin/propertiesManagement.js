const { default: mongoose } = require("mongoose");
const PropertyCard = require("../../models/PropertyCard");
const { User } = require("../../models/user");
const Constants = require("../../services/Constants");
const Response = require("../../services/Response");
const { removeLead } = require("../../services/Helper");

module.exports = {
  /**
   * @description This function is for admin property adding.
   * @param req
   * @param res
   */
  addProperty: async (req, res) => {
    try {
      const reqParam = req.body;

      // if (reqParam.lead && reqParam.lead.length > 0) {
      //   reqParam.lead = reqParam.lead.map(lead => {
      //     if (!ObjectId.isValid(lead)) {
      //       throw new Error(`Invalid lead ObjectId: ${lead}`);
      //     }
      //     return ObjectId(lead);
      //   });
      // }

      const existingPropertyCard = await PropertyCard.findOne({
        community: reqParam.community,
        building: reqParam.building,
        unitNo: reqParam.unitNo,
      });

      if (existingPropertyCard) {
        if (reqParam.lead && reqParam.lead.length > 0) {
          const updatedPropertyCard = await PropertyCard.findByIdAndUpdate(
            existingPropertyCard._id,
            { $addToSet: { leads: reqParam.lead } },
            { new: true }
          );

          const message =
            existingPropertyCard?.leads?.length ===
            updatedPropertyCard.leads.length
              ? "Lead Already Exist"
              : "Lead added successfully";

          return Response.successResponseData(
            res,
            updatedPropertyCard,
            Constants.SUCCESS,
            res.locals.__(message)
          );
        } else {
          return Response.errorResponseData(
            res,
            res.__("Property already exists"),
            Constants.BAD_REQUEST
          );
        }
      }

      console.log("req.body", req.body);

      const newPropertyCard = new PropertyCard({
        community: reqParam.community,
        building: reqParam.building,
        unitNo: reqParam.unitNo,
        leads: reqParam.leads || [],
      });

      const savedPropertyCard = await newPropertyCard.save();

      return Response.successResponseData(
        res,
        savedPropertyCard,
        Constants.SUCCESS,
        res.locals.__("propertyAddingSuccessfully")
      );
    } catch (error) {
      console.error("Error adding property card:", error);
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },

  getProperty: async (req, res) => {
    try {
      const property = await PropertyCard.find().populate("leads");
      console.log("property", property);
      return Response.successResponseData(
        res,
        property,
        Constants.SUCCESS,
        res.locals.__("getPropertyCard")
      );
    } catch (error) {
      console.error("Error get property card:", error);
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
  deleteProperty: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const property = await PropertyCard.findByIdAndDelete(propertyId);
      return Response.successResponseData(
        res,
        property,
        Constants.SUCCESS,
        res.locals.__("delete property successfully")
      );
    } catch (error) {
      console.error("Error get property card:", error);
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
  deletePropertyLead: async (req, res) => {
    try {
      const { propertyId, leadId } = req.query;
      const updatedProperty = await removeLead(propertyId, leadId);
      return Response.successResponseData(
        res,
        updatedProperty,
        Constants.SUCCESS,
        res.locals.__("leadDeletedSuccessfully")
      );
    } catch (error) {
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
  editProperty: async (req, res) => {
    try {
      const { id } = req.body;
      const { community, building, unitNo } = req.body.editedProperty;

      if (!id || !community || !building || !unitNo) {
        return Response.errorResponseData(
          res,
          res.__("missingFields"),
          Constants.BAD_REQUEST
        );
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.errorResponseData(
          res,
          res.__("invalidID"),
          Constants.BAD_REQUEST
        );
      }

      const updatedProperty = await PropertyCard.findByIdAndUpdate(
        id,
        { community, building, unitNo },
        { new: true, runValidators: true }
      );

      if (!updatedProperty) {
        return Response.errorResponseData(
          res,
          res.__("propertyNotFound"),
          Constants.NOT_FOUND
        );
      }

      // Respond with the updated property
      return Response.successResponseData(
        res,
        updatedProperty,
        Constants.SUCCESS,
        res.locals.__("updatePropertySuccess")
      );
    } catch (error) {
      console.error("Error updating property:", error);

      // Respond with an internal server error
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
};
