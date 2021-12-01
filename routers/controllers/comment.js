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

module.exports = { newComment, deleteCommet };
