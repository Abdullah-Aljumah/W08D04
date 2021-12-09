const likeModel = require("../../db/models/like");

// Toggle like
const newLike = (req, res) => {
  const { userId, postId } = req.params;
  try {
    likeModel
      .findOneAndDelete({ $and: [{ post: postId }, { user: userId }] })
      .then((item) => {
        if (item) {
          res.status(200).send("like deleted");
        } else {
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
        }
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const likeCount = (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    likeModel.find({ post: id }).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Not found");
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { newLike, likeCount };
