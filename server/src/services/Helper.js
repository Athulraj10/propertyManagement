const PropertyCard = require("../models/PropertyCard");

module.exports = {
  AppName: "Property Management",
  removeLead : async (propertyId, leadId) => {
    console.log(propertyId)
    console.log(leadId)
    try {
      const result = await PropertyCard.updateOne(
        { _id: propertyId },
        { $pull: { leads: leadId } }
      );
      return result;
    } catch (error) {
      throw new Error("Error removing lead");
    }
  },
}
