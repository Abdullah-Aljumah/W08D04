const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const salt = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(400).send("Users not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUser = (req, res) => {
  const { _id } = req.params;
  userModel
    .find({ _id: _id })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(400).send("Users not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const activatetUser = (req, res) => {
  const { _id } = req.params;
  userModel
    .findOneAndUpdate({ _id: _id }, { $set: { activate: true } }, { new: true })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(400).send("Users not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const resgister = async (req, res) => {
  const { email, username, password } = req.body;

  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, salt);
  try {
    let code = "";
    const num = "0123456789";
    for (let i = 0; i < 4; i++) {
      code += num.charAt(Math.floor(Math.random() * num.length));
    }
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: "w08d04socialmedia@gmail.com",
        pass: "Aa112233",
      },
    });
    const newUser = new userModel({
      email: savedEmail,
      username: username,
      password: savedPassword,
      activateCode: code,
    });

    newUser
      .save()
      .then((result) => {
        let mail = {
          from: "w08d04socialmedia@gmail.com",
          to: result.email,
          subject: "Confirm your email",
          text: `Please enter this code ${code} ,Thank you!`,
        };
        mailTransporter.sendMail(mail, (err, data) => {
          if (err) {
            console.log("sec here");
            console.log("err", err);
            res.status(400).json(err);
          } else {
            console.log("3 here");
            console.log("Email sent");
            res.status(200).json(result);
          }
        });
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
            _id: result._id,
            role: result.role,
          };
          console.log("payload", payload);
          if (savedPassword && result.activate === true) {
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
      if (item) {
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
      } else {
        res.status(400).send("User not found");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { resgister, getUsers, login, softDel, getUser,activatetUser };
