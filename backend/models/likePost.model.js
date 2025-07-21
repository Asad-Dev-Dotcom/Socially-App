const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
  posted: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


const postLikeSchema = new Schema({
  postId : { type : Schema.Types.ObjectId, ref : 'Post', required: true },
  likes: [likeSchema]
});

module.exports = mongoose.model('PostLike', postLikeSchema);
