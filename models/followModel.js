const mongoose = require('mongoose');
const User = require('./userModel');

const FollowSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

FollowSchema.statics.calcFollowers = async function (senderID, recipientID) {
  const senderIDstats = await this.aggregate([
    {
      $match: { sender: senderID },
    },
    {
      $group: {
        _id: '$sender',
        count: { $sum: 1 },
      },
    },
  ]);
  const recipientIDstats = await this.aggregate([
    {
      $match: { recipient: recipientID },
    },
    {
      $group: {
        _id: '$recipient',
        count: { $sum: 1 },
      },
    },
  ]);

  await User.bulkWrite([
    {
      updateOne: {
        filter: { _id: senderID },
        update: {
          followingCount: senderIDstats[0]?.count || 0,
        },
      },
    },
    {
      updateOne: {
        filter: { _id: recipientID },
        update: { followersCount: recipientIDstats[0]?.count || 0 },
      },
    },
  ]);
};

FollowSchema.index({ sender: 1, recipient: 1 }, { unique: true });

FollowSchema.post('save', function () {
  // this points to current review
  this.constructor.calcFollowers(this.sender, this.recipient);
});

FollowSchema.post('remove', function () {
  // this points to current review
  this.constructor.calcFollowers(this.sender, this.recipient);
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;
