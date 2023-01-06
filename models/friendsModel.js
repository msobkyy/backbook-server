const mongoose = require('mongoose');
const User = require('./userModel');

const FriendSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'cancelled'],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

FriendSchema.statics.calcFriends = async function (senderID, recipientID) {
  const senderIDstats = await this.aggregate([
    {
      $match: {
        $or: [
          { sender: senderID, status: 'accepted' },
          { recipient: senderID, status: 'accepted' },
        ],
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  const recipientIDstats = await this.aggregate([
    {
      $match: {
        $or: [
          { sender: recipientID, status: 'accepted' },
          { recipient: recipientID, status: 'accepted' },
        ],
      },
    },

    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  await User.bulkWrite([
    {
      updateOne: {
        filter: { _id: senderID },
        update: {
          friendsCount: senderIDstats.length > 0 ? senderIDstats[0]?.count : 0,
        },
      },
    },
    {
      updateOne: {
        filter: { _id: recipientID },
        update: {
          friendsCount:
            recipientIDstats.length > 0 ? recipientIDstats[0]?.count : 0,
        },
      },
    },
  ]);
};

FriendSchema.index({ sender: 1, recipient: 1 }, { unique: true });

FriendSchema.post('save', function () {
  this.constructor.calcFriends(this.sender, this.recipient);
});

FriendSchema.post('remove', function () {
  this.constructor.calcFriends(this.sender, this.recipient);
});

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;
