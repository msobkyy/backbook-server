const mongoose = require('mongoose');
const Post = require('./postModel');

function isMyFieldRequired() {
  return this.photo?.length > 0 ? false : true;
}

const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    min: 1,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: isMyFieldRequired,
    trim: true,
    maxlength: 250,
  },
  photo: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  replies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: { type: Date, default: Date.now },
      text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 250,
      },
      photo: {
        type: String,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

CommentSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'user',
    select: 'first_name last_name photo username confirmed',
  }).populate({
    path: 'replies.user',
    select: 'first_name last_name photo username confirmed',
  });

  next();
});

CommentSchema.statics.calcComments = async function (postId, commentId) {
  const commentStats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  await Post.findByIdAndUpdate(
    postId,
    {
      commentsCount: commentStats[0]?.count || 0,
      lastComment: [commentId],
    },
    {
      new: true,
    }
  );
  return commentStats[0]?.count || 0;
};

CommentSchema.post('save', async function () {
  // this points to current review
  this.populate({
    path: 'user',
    select: 'first_name last_name photo username confirmed',
  });
  const stats = await this.constructor.calcComments(this.post, this._id);
  this.commentsCount = stats;
});

CommentSchema.post('remove', async function () {
  // this points to current review
  const stats = await this.constructor.calcComments(this.post);
  this.commentsCount = stats;
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
