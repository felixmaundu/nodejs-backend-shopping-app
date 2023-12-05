const postServices = require("../services/post.services");
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
// import moment from 'moment';
const moment = require('moment')
// import db from './db'; // Replace with your database connection import
const { db } = require('../config/db.config');


// const createPost  = require("../services/post.services");
// const { createPost } = require("../services/post.services");


// {
//   "email": "yooh@gmail.com",
//   "password": "123456"
// }
// {
//   "user_id": 1,
//   "categoryname": "Electronics",
//   "price": 500.32,
//   "location": "New York"
// }



// const post = require('../models/post.model'); // Import the Post model



// exports.createPost = (req, res, next) => {
//   const user_id = req.user.data; // Get user ID from the authenticated user
//   const { categoryname, price, location } = req.body;

//   postServices.createPost(user_id, categoryname, price, location, (error, postId) => {
//     if (error) {
//       return next(error);
//     }
//     return res.status(201).json({
//       message: "Post created successfully",
//       postId: postId,
//     });
//   });
// };

// exports.createPost = (req, res) => {//addPost
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not logged in!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const { categoryname, price, location } = req.body;

//     postServices.createPost(userInfo.id, categoryname, price, location, (error, postId) => {
//       if (error) {
//         return res.status(500).json(error);
//       }
//       return res.status(200).json("Post has been created.");
//     });
//   });
// };


exports.createPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};





exports.getPosts = (req, res, next) => {
  const id = req.user.data;

  postServices.getPosts(id, (error, posts) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "User's posts retrieved successfully",
      data: posts,
    });
  });
};




exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;

  postServices.getPostById(postId, (error, post) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Post retrieved successfully",
      data: post,
    });
  });
};

exports.editPost = (req, res, next) => {
  const postId = req.params.postId;
  const { categoryname, price, location } = req.body;

  postServices.updatePost(postId, categoryname, price, location, (error, message) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: message,
    });
  });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  postServices.deletePost(postId, (error, message) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: message,
    });
  });
};
