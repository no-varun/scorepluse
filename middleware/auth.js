const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
module.exports = {
    userVerify: (req, res, next) => {
        jwt.verify(req.headers.token, 'usersecret', function (tokenErr, tokenRes) {
            if (tokenErr) {
                //console.log(tokenErr);
                return res.send({ ResponseCode: 500, responseMessage: "internel server error", responseResult: tokenErr });
            }
            else {
                userModel.findOne({ _id: tokenRes._id }, (err, result) => {
                    if (err) {
                        return res.send({ ResponseCode: 500, responseMessage: "internel server error" });
                    }
                    else if (!result) {
                        return res.send({ responseCode: 404, responseMessage: "data not founds" });
                    }
                    else {
                        if (result.status == "DELETE") {
                            return res.send({ ResponseCode: 500, responseMessage: "your data has been deleted" });
                        }
                        else if (result.status == "BLOCK") {
                            return res.send({ ResponseCode: 500, responseMessage: "your account has been block" });
                        }
                        else {
                            req.userId = result._id;
                            //console.log(req.userId);
                            next();
                        }
                    }
                })
            }
        })
    }
}