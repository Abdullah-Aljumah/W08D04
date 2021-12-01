const postModel = require("../../db/models/post");

// create new post
const newPost = (req, res) => {
  const { img, desc, time } = req.body;
  const { _id } = req.params;
  try {
    const newPost = new postModel({
      img,
      desc,
      time: Date(),
      user: _id,
    });
    newPost
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

// soft delete post
const softDel = (req, res) => {
  const { _id } = req.params;
  try {
    postModel.findById({ _id: _id }).then((item) => {
      if (item.isDel == false) {
        postModel
          .findByIdAndUpdate(
            { _id: _id },
            { $set: { isDel: true } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        postModel
          .findByIdAndUpdate(
            { _id: _id },
            { $set: { isDel: false } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// epdate post
const updatePost = (req, res) => {
  const { _id } = req.params;
  const { desc } = req.body;
  try {
    postModel
      .findOneAndUpdate(
        { _id: _id },
        { $set: { desc: desc, time: Date() } },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

// get post all
const geAllPost = (req, res) => {
  try {
    postModel.find({ isDel: false }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get post by id
const getPost = (req, res) => {
  const { _id } = req.params;
  try {
    postModel.findOne({ _id: _id }).then((result) => {
      if (result.isDel == false) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Post deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { newPost, softDel, updatePost, geAllPost, getPost };
