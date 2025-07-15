const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
  posted: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const commentSchema = new Schema({
  text: { type: String, required: true },
  posted: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const postLikeCommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },

  likes: [likeSchema],

  comments: [commentSchema]
});

module.exports = mongoose.model('PostLikeComment', postLikeCommentSchema);
