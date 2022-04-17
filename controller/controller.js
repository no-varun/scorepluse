const userModel = require('../model/userModel')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    signUp: async (req, res) => {
        try {
            const query =
            {
                $and: [{ $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }, { userType: "USER" }, { status: { $ne: "DELETE" } }]
            }
            var userData = await userModel.findOne(query);
            if (userData) {
                if (userData.email == req.body.email) {
                    return res.send({ responseCode: 409, responseMessage: "Email already exists." });
                } else if (userData.mobileNumber == req.body.mobileNumber) {
                    return res.send({ responseCode: 409, responseMessage: "Mobile number already exists." });
                }
            } else {
                req.body.password = bcryptjs.hashSync(req.body.password)
                var saveRes = await userModel(req.body).save();
                return res.send({ responseCode: 200, responseMessage: "Signup successfully done", responseResult: saveRes });
            }
        }
        catch (error) {
            console.log(error);
            return res.send({ responseCode: 501, responseMessage: "Something Wrong", responseResult: error })
        }

    },
    login: async (req, res) => {
        try {
            const query = { $and: [{ email: req.body.email }, { status: { $ne: "DELETE" }, userType: "USER" }] };
            var userData = await userModel.findOne(query)
            if (userData) {
                var token = jwt.sign({ _id: userData._id, email: userData.email }, 'usersecret', { expiresIn: '24h' });
                var data = { token: token, _id: userData._id, email: userData.email }
                var check = bcryptjs.compareSync(req.body.password, userData.password);
                if (check == false) {
                    res.send({ responseCode: 404, responseMessage: "Password not Match", responseResult: [] })
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "User Sucessfully loggedIn  ", responseResult: data });
                }
            } else {
                res.send({ responseCode: 409, responseMessage: "you are not a valid user" });
            }
        }
        catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error })

        }
    },
    profile: async (req, res) => {
        try {
            let userResult = await userModel.findOne({ _id: req.userId });
            if (!userResult) {
                res.send({ responseCode: 409, responseMessage: "you are not a valid user" });
            } else {
                res.send({ responseCode: 200, responseMessage: "User profile get fetch Sucessfully", responseResult: userResult });
            }
        } catch (error) { 
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error })
        }
    }
}