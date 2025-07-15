const PostLikeComment = require('../models/like-comment-post.model')


exports.like = async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
    // Prevent duplicate likes by same user
    const post = await PostLikeComment.findOne({ postId });

    if (!post) {
      // If not existing, create new entry
      await PostLikeComment.create({
        postId,
        likes: [{ userId }],
        comments: []
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

// Comment on a post
exports.comment = async (req, res) => {
  const { userId, text } = req.body;
  const { postId } = req.params;

  try {
    let post = await PostLikeComment.findOne({ postId });

    if (!post) {
      post = await PostLikeComment.create({
        postId,
        comments: [{ userId, text }],
        likes: []
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


exports.unlike = async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
    const post = await PostLikeComment.findOne({ postId });
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    post.likes = post.likes.filter(like => like.userId.toString() !== userId);
    await post.save();

    res.status(200).json({ message: 'Unliked successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error unliking post.', error: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostLikeComment.findOne({ postId });
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    const comment = post.comments.id(commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found.' });

    if (comment.userId.toString() !== userId)
      return res.status(403).json({ message: 'Unauthorized to delete this comment.' });

    comment.remove();
    await post.save();

    res.status(200).json({ message: 'Comment deleted.' });

  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment.', error: err.message });
  }
};


exports.get = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostLikeComment.findOne({ postId })

    if (!post) return res.status(404).json({ message: 'Post not found.' });

    res.status(200).json({
      likes: post.likes,
      comments: post.comments
    });

  } catch (err) {
    res.status(500).json({ message: 'Error retrieving feedback.', error: err.message });
  }
};



