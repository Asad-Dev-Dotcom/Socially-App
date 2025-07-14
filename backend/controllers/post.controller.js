const Post = require('../models/post.model')
const User = require('../models/auth.model')
const CryptoJS = require("crypto-js");
const EN_SECRET = 'Pakistan-1947-2025'


const decryptToken = (token) => {
    const encrypted = token;
    const bytes = CryptoJS.AES.decrypt(encrypted, EN_SECRET);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
};

exports.create = async (req, res) => {
    try {

    const auth = req.user
    const decrypted = decryptToken(auth.data)
    const exits = await User.findById(decrypted.id)
    if(!exits) return res.status(400).json({ message : 'User not Found!' })
      const { text, author } = req.body;
      const files = req.files

      const filesInfo = files.map((file)=>({
        filename : file.filename,
        path : file.path,
        mimetype : file.mimetype
      }))

      await Post.create({
        text : text,
        author : author,
        media : filesInfo,
        userID : decrypted.id,
        createdAt: new Date()
      });

      res.status(201).json({ message: 'Post created' });
    } catch (err) {
      console.error('Post upload error:', err);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }


exports.display = async (req, res) => {
  try {
    const auth = req.user
    const decrypted = decryptToken(auth.data)
    const exits = await User.findById(decrypted.id)
    if(!exits) return res.status(400).json({ message : 'User not Found!' })
    const data = await Post.find().sort({ createdAt: -1 }); 
    res.status(200).send(data);
  } catch (error) {
    console.error('Error in finding data:', error);
    res.status(400).send({ message: 'Error Finding Data' });
  }
};


exports.delete = async (req, res) => {
  try{
    const auth = req.user
    const decrypted = decryptToken(auth.data)
    const exits = await User.findById(decrypted.id)
    if(!exits) return res.status(400).json({ message : 'User not Found!' })
    const postID = req.params.id

    await Post.deleteOne({ _id : postID })

    res.status(200).send({ message : "Post Deleted Successfully!" })
  }
  catch(error){
    console.error("Error in deleting post", error)
    res.status(400).send({ message : 'Error in deleting Post!' })
  }
}
