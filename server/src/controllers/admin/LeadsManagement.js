const { default: mongoose } = require("mongoose");
const Constants = require("../../services/Constants");
const Response = require("../../services/Response");
const Lead = require("../../models/Lead");

module.exports = {
  /**
   * @description This function is for admin property adding.
   * @param req
   * @param res
   */
  addLead: async (req, res) => {
    try {
      const reqParam = req.body;

      const newLeadCard = new Lead({
        name: reqParam.name,
        email: reqParam.email,
        property: reqParam.propertyCardId,
      });

      const savedLeadCard = await newLeadCard.save();

      return Response.successResponseData(
        res,
        savedLeadCard,
        Constants.SUCCESS,
        res.locals.__("LeadAddingSuccessfully")
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
  getLead: async (req, res) => {
    try {
      const lead = await Lead.find().populate("property");
      return Response.successResponseData(
        res,
        lead,
        Constants.SUCCESS,
        res.locals.__("getleadCard")
      );
    } catch (error) {
      console.error("Error get lead card:", error);
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
  deleteLead: async (req, res) => {
    try {
      const { leadId } = req.params;
      const lead = await Lead.findByIdAndDelete(leadId);
      return Response.successResponseData(
        res,
        lead,
        Constants.SUCCESS,
        res.locals.__("delete lead successfully")
      );
    } catch (error) {
      console.error("Error get lead card:", error);
      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
  editLead: async (req, res) => {
    try {
      const { id } = req.body;
      const { name, email, propertyCardId } = req.body.editedProperty;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.errorResponseData(
          res,
          res.__("invalidID"),
          Constants.BAD_REQUEST
        );
      }

      const updatedProperty = await Lead.findByIdAndUpdate(
        id,
        { name, email, property: propertyCardId },
        { new: true, runValidators: true }
      );

      if (!updatedProperty) {
        return Response.errorResponseData(
          res,
          res.__("propertyNotFound"),
          Constants.NOT_FOUND
        );
      }

      return Response.successResponseData(
        res,
        updatedProperty,
        Constants.SUCCESS,
        res.locals.__("updatePropertySuccess")
      );
    } catch (error) {
      console.error("Error updating property:", error);

      return Response.errorResponseData(
        res,
        res.__("internalError"),
        Constants.INTERNAL_SERVER
      );
    }
  },
};
