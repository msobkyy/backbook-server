const mongoose = require('mongoose');
const validator = require('validator');

const chaSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true, maxLength: 30 },
    type: { type: String, enum: ['group', 'private'], default: 'private' },

    theme: {
      type: Number,
      validate: {
        validator: function (val) {
          return val >= 1 && val <= 39;
        },
        message: 'Theme must be between 1 and 39',
      },
      default: 19,
    },

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    photo: { type: String },
  },
  { timestamps: true }
);

chaSchema.statics.calculateUnSeen = async function (chat) {};

chaSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'latestMessage',
  }).populate({
    path: 'users groupAdmin',
    select: 'first_name last_name photo username gender confirmed',
  });
  next();
});

chaSchema.post('save', async function () {
  // this points to current review
  this.populate({
    path: 'users groupAdmin',
    select: 'first_name last_name photo username gender confirmed',
  });
  await this.constructor.calculateUnSeen(this);
});

const Chat = mongoose.model('Chat', chaSchema);

module.exports = Chat;
