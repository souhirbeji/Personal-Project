const Post = require("../Models/IdeasModel");

const createNewPost = (req, res) => {
  // Assuming you have the user's ObjectId available in the request, for example, if the user is authenticated.
  const userId = req.user._id;
  // Create a new post with the user's ObjectId.
  const newPostData = { ...req.body, user: userId };

  Post.create(newPostData)
    .then((newPost) => {
      res.json({ newPost });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllPosts = (req, res) => {
  Post.find()
    .then((allPosts) => {
      res.json(allPosts);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((queriedPost) => {
      res.json(queriedPost);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedPost) => {
      res.json({ updatedPost });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const deleteExistingPost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  createNewPost,
  getOnePost,
  getAllPosts,
  updatePost,
  deleteExistingPost,
};
