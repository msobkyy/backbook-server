const mongoose = require('mongoose');
const Chat = require('./chatModel');
const validator = require('validator');
const User = require('./userModel');

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['text', 'image', 'like', 'info'],
      required: [true, 'message type is required'],
    },
    content: {
      type: String,
      trim: true,
      validate: {
        validator: function (val) {
          if (this.type === 'like') return true;
          return validator.isLength(val, { min: 1, max: 400 });
        },
        message: 'Message must have a content at least 1 charcters ',
      },
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    seen: {
      type: String,
      enum: ['seen', 'unseen'],
      default: 'unseen',
    },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

messageSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'sender',
    select: 'first_name last_name photo username confirmed',
  });
  next();
});

messageSchema.statics.updateLatestMessage = async function (
  chatId,
  messageId,
  th
) {
  const existingeGroupChat = await Chat.findById(chatId);
  existingeGroupChat.latestMessage = messageId;
  await existingeGroupChat.save();

  const userId = existingeGroupChat.users.filter((user) => {
    return user.toString() !== th.sender._id.toString();
  });

  const result = await Chat.aggregate([
    {
      $match: {
        users: {
          $elemMatch: {
            $eq: mongoose.Types.ObjectId(userId[0]),
          },
        },
      },
    },
    {
      $lookup: {
        from: 'messages',
        localField: 'latestMessage',
        foreignField: '_id',
        as: 'latestMessage',
      },
    },
    {
      $unwind: '$latestMessage',
    },
    {
      $match: {
        'latestMessage.seen': 'unseen',
      },
    },
    {
      $match: {
        'latestMessage.sender': {
          $ne: mongoose.Types.ObjectId(userId[0]),
        },
      },
    },
    {
      $count: 'count',
    },
  ]);

  await User.findByIdAndUpdate(userId[0], {
    unseenMessages: result[0]?.count || 0,
  });
};

messageSchema.post('save', async function () {
  // this points to current review
  this.populate({
    path: 'sender',
    select: 'first_name last_name photo username confirmed',
  });
  await this.constructor.updateLatestMessage(this.chat, this._id, this);
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
