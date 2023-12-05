const express = require("express");
const app = express();
const auth = require("./src/middlewares/auth");
const errors = require("./src/middlewares/errors.js");
const { unless } = require("express-unless");
const cookieParser = require("cookie-parser"); // Import cookie-parser


auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
      { url: "/users/otpLogin", methods: ["POST"] },
      { url: "/users/verifyOTP", methods: ["POST"] },
    ],
  })
);

app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// Initialize routes for users
app.use("/users", require("./src/routes/users.routes"));

// Initialize routes for posts
app.use("/posts", require("./src/routes/post.routes"));

// Middleware for error responses
app.use(errors.errorHandler);

// Listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("Ready to Go!");
});

// {
//   "email": "yooh@gmail.com",
//   "password": "123456"
// }

