const express = require('express');
const Post = require('../models/post.js');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// using multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// route to get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route to create new post
router.post('/', upload.single('image'), async (req, res) => {
  const { title, content, username } = req.body;
  const newPost = new Post({
    title,
    content,
    profilePic: 'https://robohash.org/default?size=20x20',
    username: username || 'Anonymous',
    likes: 0,
    comments: [],
  });
  
  // to check if an image was uploaded
  if (req.file) {
    const normalizedImagePath = req.file.path.replace(/\\+/g, '/');
    newPost.image = normalizedImagePath;
  } else {
    newPost.image = null;
  }

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// route to delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

// route to increase post likes using post id
router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route to add comment to a post
router.post('/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, content } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      username: username || 'Anonymous',
      content: content,
      createdAt: new Date(),
    };

    post.comments.push(newComment);

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error, unable to add comment' });
  }
});


module.exports = router;
