const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: { type: String },
  author: { type: String, required: true },
  userID : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  media: [
  {
    filename: String,
    path: String,
    mimetype: String
  }
],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
