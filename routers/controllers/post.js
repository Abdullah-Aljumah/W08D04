// const post = require("../../db/models/post");
const postModel = require("../../db/models/post");
const commentModel = require("../../db/models/comment");
// create new post
const newPost = (req, res) => {
  const { img, desc } = req.body;
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
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

// soft delete post
const softDel = (req, res) => {
  const { _id } = req.params;
  console.log("REQ");

  try {
    postModel.findOne({ _id: _id }).then((item) => {
      if (item) {
        {
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
        }
      } else {
        res.status(404).send("Post not found");
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
    postModel.findOne({ _id: _id }).then((item) => {
      if (item) {
        postModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });

        postModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else {
        res.status(404).send("Post not found");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get post all
const geAllPost = (req, res) => {
  try {
    postModel
      .find({ isDel: false })
      .populate("user", "username avatar")
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).send("Posts not found");
        }
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
      if (result) {
        if (result.isDel == false) {
          res.status(200).json(result);
        } else {
          res.status(404).send("Post deleted");
        }
      } else {
        res.status(404).send("Post Not found");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete comment owner post
const deleteCommentOwner = (req, res) => {
  const { postId, commentId } = req.params;
  try {
    if (postId.length > 24 || postId.length < 24) {
      res.status(404).json({ message: "Post error" });
    } else {
      postModel.findById({ _id: postId }).then((item) => {
        if (item) {
          if (item.user == req.token._id) {
            commentModel.findOne({ _id: commentId }).then((result) => {
              if (result) {
                if (result.post.toString() == item._id.toString()) {
                  commentModel
                    .findOne({ _id: commentId })
                    .remove()
                    .exec()
                    .then(() => {
                      res.status(200).send("Delete comment succefullty");
                    });
                } else {
                  res.status(403).send("Forbidden");
                }
              } else {
                res.status(404).send("Comment not found");
              }
            });
          } else {
            res.status(403).send("Forbidden");
          }
        } else {
          res.status(404).send("Post not found");
        }
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserPost = (req, res) => {
  const { _id } = req.params;

  try {
    postModel.find({ user: _id }).then((result) => {
      if (result) {
        console.log(result, "result");
        res.status(200).json(result);
      } else {
        res.status(404).send("Posts Not found");
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  newPost,
  softDel,
  updatePost,
  geAllPost,
  getPost,
  deleteCommentOwner,
  getUserPost,
};
