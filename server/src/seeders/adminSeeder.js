const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../../.env" });
const logger = require("../logger/logger");
const Role = require("../models/Role");
config = require("../config/config").getConfig();

const createAdmin = async () => {
  try {
    const url = config .MONGO_CONNECTION_STRING;
    logger.info(
      "process.env.MONGO_CONNECTION_STRING :::" +
        process.env.MONGO_CONNECTION_STRING
    );

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
     } ;
    
    mongoose.connect(url, mongooseOptions);

    mongoose.connection.once("open", async () => {
      logger.info("Connected to database");
      await Role.deleteMany();
      
      const roles = ["Admin", "Customer"];
      for (const roleName of roles) {
        let role = await Role.findOne({ name: roleName });
        if (!role) {
          role = new Role({ name: roleName });
          await role.save();
          logger.info(`Role ${roleName} created`);
        } else {
          logger.info(`Role ${roleName} already exists`);
        }
      }

      logger.info("admin data has been created :::");

    });
  } catch (error) {
    console.error(error)
    logger.error("Error", error);
  }
};

createAdmin();
