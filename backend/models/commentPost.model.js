const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  posted: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text : { type : String, required: true }
});


const postCommentSchema = new Schema({
  postId : { type : Schema.Types.ObjectId, ref : 'Post', required: true },
  comments: [commentSchema]
});

module.exports = mongoose.model('PostComment', postCommentSchema);
