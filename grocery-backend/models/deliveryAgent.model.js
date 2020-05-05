const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deliveryAgentSchema = new Schema(
  {
    fcm: {
      token: { type: String, required: false },
      status: { type: Boolean, required: false },
    },
    personalDetail: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      authyId: { type: String, required: false },
    },
    preferredPinCode: [{ type: Number, require: false }],
    profileVerificationDetail: {
      type: { type: String, require: false },
      number: { type: Number, require: false },
      verified: { type: Boolean, required: false },
    },
    vehicleDetail: {
      drivingLicence: { type: String, required: false },
      vehicleModel: { type: String, required: false },
      verified: { type: Boolean, required: false },
    },
    bankDetail: {
      name: { type: String, required: false },
      accountNumber: { type: Number, required: false },
      ifscCode: { type: String, required: false },
      branchName: { type: String, required: false },
      verified: { type: Boolean, required: false },
    },
  },
  {
    timestamps: true,
  }
);

const groceryDB = mongoose.connection.useDb("grocery_db");

const DeliveryAgent = groceryDB.model("DeliveryAgent", deliveryAgentSchema);

module.exports = DeliveryAgent;
