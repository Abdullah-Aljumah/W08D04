const likeModel = require("../../db/models/like");

const newLike = (req, res) => {
  const { userId, postId } = req.params;
  try {
    const newLike = new likeModel({
      user: userId,
      post: postId,
    });
    newLike
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

module.exports = {newLike};
