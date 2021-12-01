const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findOneAndUpdate } = require("../../db/models/user");
const user = require("../../db/models/user");

const salt = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const resgister = async (req, res) => {
  const { email, username, password } = req.body;

  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new userModel({
      email: savedEmail,
      username: username,
      password: savedPassword,
    });
    console.log(newUser);
    newUser
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const login = (req, res) => {
  const { data, password } = req.body;
  console.log(data);
  userModel
    .findOne({ $or: [{ email: data }, { username: data }] })
    .then(async (result) => {
      if (result) {
        if (result.email == data || result.username == data) {
          const savedPassword = await bcrypt.compare(password, result.password);
          const payload = {
            role: result.role,
          };

          if (savedPassword) {
            let token = jwt.sign(payload, secret);
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("Wrong email or password");
          }
        } else {
          res.status(400).json("Wrong email or password");
        }
      } else {
        res.status(404).json("Email not exist");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

// Toglle soft delete
const softDel = (req, res) => {
  const { _id } = req.params;
  try {
    userModel.findById({ _id: _id }).then((item) => {
      if (item.isDel == false) {
        userModel
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
        userModel
          .findByIdAndUpdate(
            { _id: _id },
            { $set: { isDel: false } },
            { new: true }
          )
          .then((result) => {
            console.log(result);
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

module.exports = { resgister, getUsers, login, softDel };
