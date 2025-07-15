const SavePost = require('../models/savePost');

exports.save = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    let record = await SavePost.findOne({ userId });

    if (!record) {
      record = new SavePost({
        userId,
        savedPosts: [{ postId }],
      });
    } else {
      const alreadySaved = record.savedPosts.find(p => p.postId.toString() === postId);
      if (alreadySaved)
        return res.status(409).json({ message: 'Post already saved.' });

      record.savedPosts.push({ postId });
    }

    await record.save();
    res.status(200).json({ message: 'Post saved successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error saving post.', error: err.message });
  }
};



exports.unsavePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const record = await SavePost.findOne({ userId });
    if (!record) return res.status(404).json({ message: 'No saved posts found.' });

    record.savedPosts = record.savedPosts.filter(p => p.postId.toString() !== postId);
    await record.save();

    res.status(200).json({ message: 'Post removed from saved.' });

  } catch (err) {
    res.status(500).json({ message: 'Error unsaving post.', error: err.message });
  }
};



exports.getAllSave = async (req, res) => {
  const userId = req.params.id;


  try {
    const record = await SavePost.findOne({ userId })
      .populate('savedPosts.postId');

    if (!record) return res.status(404).json({ message: 'No saved posts found.' });

    res.status(200).send( record.savedPosts );

  } catch (err) {
    res.status(500).json({ message: 'Error retrieving saved posts.', error: err.message });
  }
};


