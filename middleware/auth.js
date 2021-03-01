const jwt = require("jsonwebtoken");

//middleware for verifying token.
// const auth = function verifyToken(req, res, next) {
// //Get auth header value.
// const bearerHeader = req.headers["Authorization"];
// //checking if bearer is undefined.
// if (typeof bearerHeader !== "undefined") {
//   //splitting at the space
//   const bearer = bearerHeader.split(" ");
//   //get token from an array.
//   const bearerToken = bearer[1];
//   //set the token.
//   req.token = bearerToken;
//   //calling the next middleware.
//   next();
// } else {
//   //Forbidden.
//   res.sendStatus(404);
// }
// jwt.verify(bearerToken, "secretkey", (err, authData) => {
//   if (err) {
//     console.log(err);
//     // res.sendStatus(404);
//   } else {
//     const bearerToken = req.header["Authorization"].split(" ")[1];
//     req.token = bearerToken;
//     res.json({
//       message: "User authenticated",
//       authData,
//     });
//     next();
//   }
// });
// };

const auth = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  jwt.verify(token, "secretkey", (err /*,authData*/) => {
    if (err) console.log(`Error: `, err);
    else {
      // console.log(authData);
      // res.json({
      //   message: "User authenticated",
      //   authData,
      // });
    }
  });
  next();
};

module.exports = auth;
