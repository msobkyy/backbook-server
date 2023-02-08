const mongoose = require('mongoose');
const Chat = require('./chatModel');
const validator = require('validator');
const User = require('./userModel');

const notificationSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    type: {
      type: String,
      enum: ['react', 'comment', 'follow', 'friend'],
      required: [true, 'message type is required'],
    },
    click: {
      type: String,
    },

    content: {
      type: String,
      trim: true,
      validate: {
        validator: function (val) {
          if (this.type === 'like') return true;
          return validator.isLength(val, { min: 1, max: 400 });
        },
        message: 'Notification must have a content at least 1 charcters ',
      },
    },
    seen: {
      type: String,
      enum: ['seen', 'unseen'],
      default: 'unseen',
    },
  },
  { timestamps: true }
);

notificationSchema.statics.updateUnseenNotification = async function (
  recipientId
) {
  const existingUser = await User.findById(recipientId);
  existingUser.unseenNotification += 1;
  await existingUser.save({ validateBeforeSave: false });
};

notificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'sender',
    select: 'photo',
  });
  next();
});

notificationSchema.post('save', async function () {
  // this points to current review
  this.populate({
    path: 'sender',
    select: 'photo',
  });
  await this.constructor.updateUnseenNotification(this.recipient);
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
