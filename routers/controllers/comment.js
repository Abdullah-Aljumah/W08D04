const commentModel = require("../../db/models/comment");
const postModel = require("../../db/models/post");
const likeModel = require("../../db/models/like");

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
      .findOne({ _id: _id })
      .populate("post")
      .then((item) => {
        if (item) {
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
        }
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
      if (item) {
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

const getPostWithCommentsAndLikes = (req, res) => {
  const { _id } = req.params;
  try {
    let test = [];
    postModel
      .findOne({ _id: _id })
      .populate("user")
      .then((item) => {
        if (item) {
          if (item.isDel == false) {
            test.push(item);
            commentModel
              .find({ post: _id })
              .populate("user")
              .then((result) => {
                test.push(result);
                likeModel.find({ post: _id }).then((ele) => {
                  test.push(ele);

                  res.status(200).json(test);
                });
              });
          } else {
            res.status(404).json("Post is deleted");
          }
        } else {
          res.status(404).json("Post Not found");
        }
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  newComment,
  deleteCommet,
  updateComment,
  getComment,
  getPostWithCommentsAndLikes,
};
