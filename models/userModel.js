const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const { generateFromEmail } = require('unique-username-generator');

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'A user must have a first name'],
      validate: {
        validator: function (val) {
          return validator.isLength(val, { min: 3, max: 25 });
        },
        message: 'First name should be between 3 and 25 charcters',
      },
      trim: true,
      text: true,
    },

    last_name: {
      type: String,
      required: [true, 'A user must have a last name'],
      validate: {
        validator: function (val) {
          return validator.isLength(val, { min: 3, max: 25 });
        },
        message: 'Last name should be between 3 and 25 charcters',
      },
      trim: true,
      text: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      text: true,
    },

    email: {
      type: String,
      required: [true, 'A user must have a email'],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'user email must be a valid email'],
    },

    password: {
      type: String,
      required: [true, 'user must have a password'],
      minlength: 8,
      select: false,
      validate: [validator.isStrongPassword, 'Please input a strong password'],
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: {
      type: String,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    confirmed: {
      type: Boolean,
      default: false,
    },

    verificationEmailToken: {
      type: String,
      select: false,
    },

    photo: {
      type: String,
      default: `${process.env.FRONTEND_URL}/images/default_pic.png`,
    },

    cover: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'user must have a gender'],
    },

    birth_Year: {
      type: Number,
      required: [true, 'user must have a birhday Year'],
      trim: true,
      select: false,
    },

    birth_Month: {
      type: Number,
      required: [true, 'user must have a birhday Month'],
      trim: true,
      select: false,
    },

    birth_Day: {
      type: Number,
      required: [true, 'user must have a birhday Day'],
      trim: true,
      select: false,
    },

    fcmToken: {
      type: String,
      select: false,
      default: '',
    },

    followersCount: { type: Number, default: 0 },

    followingCount: { type: Number, default: 0 },

    friendsCount: { type: Number, default: 0 },

    recivedRequestsCount: { type: Number, default: 0 },

    unseenMessages: { type: Number, default: 0 },

    unseenNotification: { type: Number, default: 0 },

    search: [
      {
        user: {
          type: ObjectId,
          ref: 'User',
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],

    details: {
      bio: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      otherName: {
        type: String,
        maxlength: 25,
        trim: true,
      },
      job: {
        type: String,
        trim: true,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
        trim: true,
      },
      college: {
        type: String,
        trim: true,
      },
      currentCity: {
        type: String,
        trim: true,
      },
      homeTown: {
        type: String,
        trim: true,
      },
      relationship: {
        type: String,
        enum: ['Single', 'In a realationship', 'Married', 'Divorced', ''],
      },
      instagram: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.username = generateFromEmail(this.email, 4);
  }
  next();
});

userSchema.methods.createVerificationEmailToken = function () {
  const verificationEmailToken = crypto.randomBytes(32).toString('hex');

  this.verificationEmailToken = crypto
    .createHash('sha256')
    .update(verificationEmailToken)
    .digest('hex');

  return verificationEmailToken;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  usePassword
) {
  return await bcrypt.compare(candidatePassword, usePassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createPasswordResetCode = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetCode;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
