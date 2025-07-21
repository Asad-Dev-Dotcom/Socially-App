const User = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const { exists } = require('../models/likePost.model')
const SECRET = 'Hacker007'
const ENC_SECRET = 'Pakistan-1947-2025'

exports.signup = async (req, res) => {
  const data = req.body;


  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists!!" });
    }

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    res.status(200).send({ message: "User added successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send({ message: "Error adding User in DB!!", error: err.message });
  }
};


exports.login = async (req, res) => {
  const data = req.body;


  try {
      const newuser = await User.findOne({ email: data.email }); 
    
    if (!newuser) {
      return res.status(401).send({ message: 'User not Found!' });
    }

    if (newuser.password !== data.password) {
      return res.status(401).send({ message: 'Incorrect Password!' });
    }

    const encryptedPayload = CryptoJS.AES.encrypt(
      JSON.stringify({
        id: newuser._id,
        name : newuser.name,
        email : newuser.email
      }),
      ENC_SECRET
    ).toString();

    const token = jwt.sign(
      { data : encryptedPayload },
      SECRET,
      { expiresIn : '2h' }
    )

    res.status(200).send({ 
      message : 'Login Successfull',
      token
    })
  } catch (err) {
    console.error("Login Error:", err);
    res.status(400).send({ message: "Error in Login", error: err.message });
  }
};

