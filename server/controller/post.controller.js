const  Post  = require("../model/post.model");


const createPost = async (req, res) => {
        try {
          const post = await new Post(req.body);
          post.save();

          res.status(200).json("Post saved successfully");
        } catch (error) {
            console.log(error.message);
            
          res.status(500).json(error);
        }
}

module.exports = {createPost}