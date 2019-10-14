const response = require("../util/response");
const jwt = require("jsonwebtoken");
const config = require("config");

async function verifyAdmin(req, res, next) {
    let token = req.headers["token"];
    try{
        if(token){
            jwt.verify(token, config.get("secretTokenAdmin"), (err, decode) => {
                if(err){
                    return res.json(response.buildUnauthorized())
                }
                req.tokenData = decode;
                next()
            })
        }else{
            throw new Error("Token missing")
        }
    }
    catch(err){
        console.log("verifyAdmin: ", err.message);
        return res.json(response.buildFail(err.message))
    }
}

module.exports = verifyAdmin;