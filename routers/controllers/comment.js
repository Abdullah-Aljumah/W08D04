const commentModel = require("../../db/models/comment");

const newComment = (req, res) => {
  const { desc } = req.body;
  const { userId, postId } = req.params;
  try {
    const newComment = new commentModel({
      desc,
      time: Date(),
      user: userId,
      post: postId,
    });
    newComment
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

const deleteCommet = (req, res) => {
  const { _id } = req.params;
  try {
    commentModel
      .findOneAndDelete({ _id: _id })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).send("Not found");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateComment = (req, res) => {
  const { _id } = req.params;
  const { desc } = req.body;
  try {
    commentModel.findOne({ _id: _id }).then((item) => {
    });
    commentModel
      .findOneAndUpdate(
        { _id: _id },
        { $set: { desc: desc, time: Date() } },
        { new: true }
      )
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).send("Comment not found");
        }
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getComment = (req, res) => {
  const { _id } = req.params;
  try {
    commentModel.findOne({ _id: _id }).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Comment deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { newComment, deleteCommet, updateComment, getComment };
