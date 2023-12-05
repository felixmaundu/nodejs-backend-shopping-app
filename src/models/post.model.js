// const mysql = require('mysql2');
// const { db } = require('../config/db.config');

// // Create a new post
// exports.createPost = (categoryname, price, location, userId, callback) => {
//   const query = 'INSERT INTO posts (categoryname, price, location, user_id) VALUES (?, ?, ?, ?)';
//   const values = [categoryname, price, location, userId];

//   db.query(query, values, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     return callback(null, results.insertId); // Return the ID of the inserted post
//   });
// };

// // Get all posts of the logged-in user
// exports.getUserPosts = (userId, callback) => {
//   const query = 'SELECT * FROM posts WHERE user_id = ?';
  
//   db.query(query, userId, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     return callback(null, results);
//   });
// };

// // Get a specific post by ID
// exports.getPostById = (postId, callback) => {
//   const query = 'SELECT * FROM posts WHERE id = ?';

//   db.query(query, postId, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     if (results.length === 0) {
//       return callback({ message: "Post not found" });
//     }
//     return callback(null, results[0]);
//   });
// };

// // Update a post by ID
// exports.updatePost = (postId, categoryname, price, location, callback) => {
//   const query = 'UPDATE posts SET categoryname = ?, price = ?, location = ? WHERE id = ?';
//   const values = [categoryname, price, location, postId];

//   db.query(query, values, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     if (results.affectedRows === 0) {
//       return callback({ message: "Post not found" });
//     }
//     return callback(null, "Post updated successfully");
//   });
// };

// // Delete a post by ID
// exports.deletePost = (postId, callback) => {
//   const query = 'DELETE FROM posts WHERE id = ?';

//   db.query(query, postId, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     if (results.affectedRows === 0) {
//       return callback({ message: "Post not found" });
//     }
//     return callback(null, "Post deleted successfully");
//   });
// };
