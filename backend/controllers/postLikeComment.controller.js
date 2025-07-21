const PostLike = require('../models/likePost.model')
const PostComment = require('../models/commentPost.model')


exports.like = async (req, res) => {
  const { postId, userId } = req.body;
  

  try {
    // Prevent duplicate likes by same user
    const post = await PostLike.findOne({ postId });

    if (!post) {
      // If not existing, create new entry
      await PostLike.create({
        postId,
        likes: [{ userId }]
      });
      return res.status(200).json({ message: 'Post Liked.' });
    }

    const alreadyLiked = post.likes.some(like => like.userId.toString() === userId);
    if (alreadyLiked) {
      return res.status(400).json({ message: 'Already liked this post.' });
    }

    post.likes.push({ userId });
    await post.save();


    res.status(200).json({ message: 'Post liked successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error liking post.', error: err.message });
  }
};


// POST UNLIKE API CONTROLLER----

exports.unlike = async (req, res) => {
  const { postId, userId } = req.body;

  console.log('check for unlike data====>', postId, userId)

  try {
    const post = await PostLike.findOne({ postId });
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    console.log('post of ulike===', post)

    post.likes = post.likes.filter(like => like.userId.toString() !== userId);
    await post.save();

    res.status(200).json({ message: 'Unliked successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error unliking post.', error: err.message });
  }
};

// GET ALL LIKED POSTS

exports.getLikedPosts = async (req, res) => {
  const userId = req.params.id;
  

  try {
    const likedPosts = await PostLike.find({ 'likes.userId': userId });
    const totalLikes = await PostLike.find()

    // Extract postIds from liked documents
    const likedPostIds = likedPosts.map(postLike => postLike.postId.toString());

    res.status(200).json({ likedPostIds, totalLikes });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching liked posts.', error: err.message });
  }
};

// Comment on a post
exports.comment = async (req, res) => {
  const { postId, userId, text } = req.body;

  try {
    let post = await PostComment.findOne({ postId });

    if (!post) {
      post = await PostComment.create({
        postId,
        comments: [{ userId, text }]
      });
    } else {
      post.comments.push({ userId, text });
      await post.save();
    }

    res.status(200).json({ message: 'Comment added successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error adding comment.', error: err.message });
  }
};


exports.getAllComments = async (req, res) => {
  try{
    const Id = req.params.id
    const postComments = await PostComment.findOne({ postId : Id }).populate('comments.userId', 'name', 'User')

    res.status(200).send(postComments)
  }
  catch(error){
    console.log('Error in getting comments', error)
    res.status(400).send({ message : 'Error finding post comments' })
  }
}





exports.deleteComment = async (req, res) => {
  const { commentId, postId, userId } = req.body;

  

  try {
    const post = await PostComment.findOne({ postId });
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    

    const index = post.comments.findIndex(c => c._id.toString() === commentId);
if (index === -1) return res.status(404).json({ message: 'Comment not found.' });

const comment = post.comments[index];

if (!comment.userId.equals(userId)) {
  return res.status(403).json({ message: 'Unauthorized to delete this comment.' });
}

post.comments.splice(index, 1);
await post.save();


    res.status(200).json({ message: 'Comment deleted.' });

  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment.', error: err.message });
  }
};


exports.editComment = async (req, res) => {
  try {
    const { commentId, postId, userId, text } = req.body;

    console.log(req.body)

    const post = await PostComment.findOne({ postId });

    if (!post) return res.status(400).send({ message: 'Post not found!' });

    const comment = post.comments.id(commentId);

    if (!comment) return res.status(404).send({ message: 'Comment not found!' });

    if (comment.userId.toString() !== userId)
      return res.status(403).send({ message: 'Unauthorized to edit this comment.' });

    comment.text = text;

    await post.save();

    res.status(200).send({ message: 'Comment edited successfully!' });
  } catch (error) {
    console.log('Error in editing comment', error);
    res.status(400).send({ message: 'Comment edit error.' });
  }
};


exports.getAllCommentsCount = async (req, res) => {
  try{
    const posts = await PostComment.find()

    const commentsCount = posts.map(el => {
      el.postId,
      el.comments.length
    })

    console.log('comments count===', commentsCount)
  }
  catch(error){

  }
}


