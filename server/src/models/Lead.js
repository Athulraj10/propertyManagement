const mongoose = require("mongoose");
const { Schema } = mongoose;

const leadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String },
  property: {
    type: Schema.Types.ObjectId,
    ref: "PropertyCard",
    required: true,
  },
});

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
