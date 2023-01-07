const mongoose = require('mongoose');
const Post = require('./postModel');

const ReactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['like', 'love', 'haha', 'sad', 'angry', 'wow'],
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

ReactionSchema.statics.calcReactions = async function (postId, type, remove) {
  const reactionStats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        totalCount: { $sum: '$count' },
        reactions: { $push: { type: '$_id', count: '$count' } },
      },
    },
  ]);

  const totalCount = reactionStats[0]?.totalCount || 0;
  const reactionCounts = reactionStats[0]?.reactions || [];
  const reactions = {};
  reactionCounts.forEach((r) => {
    reactions[r.type] = r.count;
  });

  await Post.findByIdAndUpdate(
    postId,
    {
      reactions: {
        totalCount: totalCount,
        types: reactions,
      },
    },
    {
      new: true,
    }
  );

  return {
    totalCount,
    types: reactions,
    isLiked: remove ? '' : type,
  };
};

ReactionSchema.index({ post: 1, user: 1 }, { unique: true });

ReactionSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'user',
    select: 'first_name last_name photo username confirmed',
  });

  next();
});

ReactionSchema.post('save', async function () {
  const stats = await this.constructor.calcReactions(this.post, this.type);
  this.reactionStats = stats;
});

ReactionSchema.post('remove', async function () {
  const stats = await this.constructor.calcReactions(
    this.post,
    this.type,
    true
  );
  this.reactionStats = stats;
});

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;
