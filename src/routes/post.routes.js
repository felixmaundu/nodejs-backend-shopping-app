const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
// const postController = require("../controllers/post.controller");
// Import your controller or handler function for retrieving posts
const postController = require('../controllers/post.controller');

// Store a new post
router.post("/", auth.authenticateToken, postController.createPost);


// Get all posts of the logged-in user
router.get("/posts", auth.authenticateToken, postController.getPosts);//getUserPosts);

// Get a specific post by ID
router.get("/:postId", auth.authenticateToken, postController.getPostById);

// Update a post by ID
router.put("/:postId", auth.authenticateToken, postController.editPost);

// Delete a post by ID
router.delete("/:postId", auth.authenticateToken, postController.deletePost);


module.exports = router;
