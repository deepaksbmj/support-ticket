const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    try {
      //Get token from header
      token = auth.split(" ")[1];

      //Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get User from Token
        req.user = await User.findById(decoded.id).select("-password")

        next()
    } catch (error) {
        console.log(error);
        res.status(401)
        throw new Error("Not Authorized")
    }
  }

  if(!token){
    res.status(401)
    throw new Error("Not Authorized")
  }
});

module.exports = {protect};
