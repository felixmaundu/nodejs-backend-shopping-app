const mysql = require('mysql2');
const { db } = require('../config/db.config');
// const { createPost } = require("../services/post.services");


// exports.createPost = (user_id, categoryname, price, location, callback) => {
//   const query = 'INSERT INTO posts (user_id, categoryname, price, location) VALUES (?, ?, ?, ?)';
//   const values = [user_id, categoryname, price, location];

//   db.query(query, values, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     return callback(null, results.insertId); // Return the ID of the inserted post
//   });
// };
exports.createPost = (userId, categoryname, price, location, callback) => {//addPost
  const query = 'INSERT INTO posts (user_id, categoryname, price, location) VALUES (?, ?, ?, ?)';
  const values = [userId, categoryname, price, location];

  db.query(query, values, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results.insertId); // Return the ID of the inserted post
  });
};





async function getPosts(userId, callback) {
  // Query the database to retrieve the user's posts using the userId
  const selectPostsQuery = 'SELECT * FROM posts SELECT * FROM posts WHERE user_id = ?';//'SELECT * FROM posts WHERE user_id = ?';
  const countQuery = 'SELECT COUNT(*) AS total FROM posts WHERE user_id = ?';

  // Fetch the posts
  db.query(selectPostsQuery, [userId], (err, posts) => {
    if (err) {
      return callback(err);
    }

    // Fetch the total count
    db.query(countQuery, [userId], (countErr, countResult) => {
      if (countErr) {
        return callback(countErr);
      }

      const totalCount = countResult[0].total;

      return callback(null, { posts, totalCount });
    });
  });
}

// Get a specific post by ID
exports.getPostById = (postId, callback) => {
  const query = 'SELECT * FROM posts WHERE id = ?';

  db.query(query, postId, (error, results) => {
    if (error) {
      return callback(error);
    }
    if (results.length === 0) {
      return callback({ message: "Post not found" });
    }
    return callback(null, results[0]);
  });
};

// Update a post by ID
exports.updatePost = (postId, categoryname, price, location, callback) => {
  const query = 'UPDATE posts SET categoryname = ?, price = ?, location = ? WHERE id = ?';
  const values = [categoryname, price, location, postId];

  db.query(query, values, (error, results) => {
    if (error) {
      return callback(error);
    }
    if (results.affectedRows === 0) {
      return callback({ message: "Post not found" });
    }
    return callback(null, "Post updated successfully");
  });
};

// Delete a post by ID
exports.deletePost = (postId, callback) => {
  const query = 'DELETE FROM posts WHERE id = ?';

  db.query(query, postId, (error, results) => {
    if (error) {
      return callback(error);
    }
    if (results.affectedRows === 0) {
      return callback({ message: "Post not found" });
    }
    return callback(null, "Post deleted successfully");
  });
};

module.exports = {
  getPosts, // Add the getPosts function to the module exports
  // ... other functions
};