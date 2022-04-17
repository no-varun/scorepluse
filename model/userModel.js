const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const schema = mongoose.Schema;

var userModel = new schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    userType: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
        uppercase: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },


}, { timestamps: true });

module.exports = mongoose.model("user", userModel);

mongoose.model("user", userModel).find({ userType: "ADMIN" }, async (err, result) => {
    if (err) {
      console.log("Default admin creation error", err);
    }
    else if (result.length != 0) {
      console.log("Default admin already created.");
    }
    else {
      var obj = {
            firstName: "Admin",
            lastName: "Owner",
            email: "admin@mailinator.com",
            mobileNumber: "7983270583",
            password: bcryptjs.hashSync("admin"),
            status : "ACTIVE",
            userType: "ADMIN"
      }
      mongoose.model("user", userModel).create(obj, (err1, staticResult) => {
        if (err1) {
          console.log("Default admin error.", err1);
        }
        else {
          console.log("Default admin created.", staticResult)
        }
      })
    }
  })