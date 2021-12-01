const postModel = require("../../db/models/post");

// create new post
const newPost = (req, res) => {
  const { img, desc } = req.body;
  const { _id } = req.params;
  const newPost = new postModel({
    img,
    desc,
    user: _id,
  });
  newPost
    .save()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
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


module.exports = {newPost,softDel}