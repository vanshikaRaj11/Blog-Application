const Post = require("../model/post.model");

const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();

    res.status(200).json("Post saved successfully");
  } catch (error) {
    console.log(error.message);

    res.status(500).json(error);
  }
};

const getAllPosts = async (req, res) => {
  let category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    await post.delete;
    res.status(200).json({message:"Post deleted successfully"})
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deleteBlog,
};
