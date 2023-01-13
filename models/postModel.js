const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Schema;
function isMyFieldRequired() {
  return this.type === 'share' ? true : false;
}

const postSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['profilePhoto', 'cover', 'normal', 'image', 'background', 'share'],
      required: [true, 'Post type is required'],
    },
    sharedID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',

      required: isMyFieldRequired,
    },

    text: {
      type: String,
      validate: {
        validator: function (val) {
          if (
            this.type === 'image' ||
            this.type === 'profilePhoto' ||
            this.type === 'share' ||
            this.type === 'cover'
          )
            return true;
          return validator.isLength(val, { min: 2, max: 300 });
        },
        message: 'Post must have a content at least 2 charcters ',
      },
    },
    images: {
      type: Array,
      validate: {
        validator: function (val) {
          if (this.type === 'image' && val.length < 1) return false;
          return true;
        },
        message: 'You must choose at least 1 image or switch to normal post',
      },
      maxLength: 5,
    },
    background: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    sharesCount: {
      type: Number,
      default: 0,
    },

    lastComment: [
      {
        type: ObjectId,
        ref: 'Comment',
      },
    ],

    reactions: {
      isLiked: {
        type: String,
        default: '',
      },
      totalCount: {
        type: Number,
        default: 0,
      },
      types: {
        like: {
          type: Number,
          default: 0,
        },
        love: {
          type: Number,
          default: 0,
        },
        haha: {
          type: Number,
          default: 0,
        },
        wow: {
          type: Number,
          default: 0,
        },
        sad: {
          type: Number,
          default: 0,
        },
        angry: {
          type: Number,
          default: 0,
        },
      },
    },

    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.statics.calcShares = async function (postId) {
  const sharesStats = await this.aggregate([
    {
      $match: { sharedID: postId },
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
      sharesCount: sharesStats[0]?.count || 0,
    },
    {
      new: true,
    }
  );
  return sharesStats[0]?.count || 0;
};

postSchema.pre(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'first_name last_name photo username gender cover confirmed',
  })
    .populate({
      path: 'lastComment',
    })
    .populate({
      path: 'sharedID',
      select: 'images user type text background createdAt',
    });
  next();
});

postSchema.post('save', async function () {
  // this points to current post

  if (this.type === 'share') {
    await this.constructor.calcShares(this.sharedID);
  }

  this.populate({
    path: 'user',
    select: 'first_name last_name photo username gender cover confirmed',
  });
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
