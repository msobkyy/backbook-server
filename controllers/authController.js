const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const Friend = require('../models/friendsModel');
const Follow = require('../models/followModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = ({ user, statusCode, res, recivedRequestsCount }) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : '',
  });

  user.password = undefined;
  user.verificationEmailToken = undefined;
  user.recivedRequestsCount = recivedRequestsCount;

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    passwordConfirm,
    gender,
    birth_Year,
    birth_Month,
    birth_Day,
  } = req.body;

  const newUser = await User.create({
    first_name,
    last_name,
    username,
    email,
    password,
    passwordConfirm,
    gender,
    birth_Year,
    birth_Month,
    birth_Day,
  });

  const senderID = newUser.id;
  const recipientID = '63b9248399f3f6c7ff609510';

  const friendRequest = new Friend({
    sender: senderID,
    recipient: recipientID,
    status: 'accepted',
  });
  await friendRequest.save();

  const followRccipient = new Follow({
    sender: senderID,
    recipient: recipientID,
  });
  await followRccipient.save();

  const verificationEmailToken = newUser.createVerificationEmailToken();
  await newUser.save({ validateBeforeSave: false });
  const url = `${process.env.FRONTEND_URL}/activate/${verificationEmailToken}`;
  await new Email(newUser, url).sendVerificationEmail();

  const chatId = '63e30af0740d080a71d219b5';

  await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: senderID },
    },
    {
      new: true,
    }
  );

  await Message.create({
    type: 'info',
    sender: senderID,
    content: `${newUser.first_name} ${newUser.last_name} joined the chat`,
    chat: chatId,
  });

  createSendToken({ user: newUser, statusCode: 200, res: res });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  // check if user exist and password is correct
  const user = await User.findOne({ email }).select(
    'first_name last_name username photo verified password confirmed recivedRequestsCount unseenMessages unseenNotification'
  );

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  const recivedRequestsCount = await Friend.countDocuments({
    recipient: user.id,
    status: 'pending',
  });

  // is everything okay , send jwt to the client
  createSendToken({
    user: user,
    statusCode: 201,
    res: res,
    recivedRequestsCount,
  });
});

exports.ping = catchAsync(async (req, res, next) => {
  const userId = req.user.id.toString();
  const recivedRequestsCount = await Friend.countDocuments({
    recipient: userId,
    status: 'pending',
  });

  res.status(200).json({
    status: 'success',
    recivedRequestsCount,
    unseenMessages: req.user.unseenMessages,
    unseenNotification: req.user.unseenNotification,
    userId,
  });
});

exports.logOut = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'expired', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: false,
    secure: true,
    samesite: 'None',
  });
  res.status(200).json({ status: 'success' });
});

exports.activateAccount = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  const user = await User.findOne({
    verificationEmailToken: hashedToken,
  });

  if (!user) return next(new AppError('Invalid or expired token', 400));

  if (user.id !== req.user.id)
    return next(new AppError('Invalid token please try again', 400));

  user.verified = true;
  user.verificationEmailToken = undefined;
  await user.save({ validateBeforeSave: false });

  createSendToken({ user: user, statusCode: 201, res: res });
});

exports.resendEmailVerification = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.verified)
    return next(
      new AppError(
        'Your account is already verified, try logging in again.',
        400
      )
    );

  const verificationEmailToken = user.createVerificationEmailToken();
  await user.save({ validateBeforeSave: false });
  const url = `${process.env.FRONTEND_URL}/activate/${verificationEmailToken}`;

  await new Email(user, url).sendVerificationEmail();
  res.status(200).json({ status: 'success' });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) check if token exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError('You are not logged in, please log in to access', 401)
    );

  // 2) verifcation token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(new AppError('The token does no longer exist', 401));

  // 4) if user change password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User recently changed password, please login again', 401)
    );

  // GRANT ACCESS
  req.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      req.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.findUser = catchAsync(async (req, res, next) => {
  const { email } = req.query;

  // check if email and password exist
  if (!email) return next(new AppError('Please provide email', 400));

  // check if user exist and password is correct
  const user = await User.findOne({ email });

  if (!user) return next(new AppError('No user found, please try again', 401));

  // is everything okay , send jwt to the client
  res.status(200).json({
    status: 'success',
    data: {
      email: user.email,
      photo: user.photo,
      first_name: user.first_name,
    },
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('There is no user with these email', 404));

  const resetCode = user.createPasswordResetCode();
  await user.save({ validateBeforeSave: false });

  // const resetURL = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/users/resetPassword/${resetCode}`;

  try {
    await new Email(user, resetCode).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(error);

    return next(
      new AppError(
        'There is an error while sending the email, try again later! ',
        500
      )
    );
  }
});

exports.validateResetCode = catchAsync(async (req, res, next) => {
  const { email, code } = req.body;

  // check if email and password exist
  if (!email || !code)
    return next(new AppError('Please provide email and reset code', 400));

  // check if user exist and password is correct
  const user = await User.findOne({
    email,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  }).select('passwordResetToken');

  if (!user)
    return next(
      new AppError('No user found or token expired, please try again', 401)
    );

  const hashedCode = crypto
    .createHash('sha256')
    .update(code.toString())
    .digest('hex');

  if (user.passwordResetToken !== hashedCode)
    return next(
      new AppError(
        "The number that you've entered doesn't match your code. Please try again.",
        401
      )
    );

  // create token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // is everything okay , send jwt to the client
  res.status(200).json({
    status: 'success',
    data: {
      token: resetToken,
    },
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, email, password, passwordConfirm } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    email,
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) return next(new AppError('Invalid or expired TOKEN', 400));

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken({ user: user, statusCode: 201, res: res });
});
