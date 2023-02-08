const mongoose = require('mongoose');
const User = require('../models/userModel');
const Friend = require('../models/friendsModel');
const Reaction = require('../models/reactionModel');
const NotificationModel = require('../models/notificationModel');

const Follow = require('../models/followModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
const { getImages, uploadToCloudinary } = require('../utils/cloudinaryHandler');
const multer = require('multer');
const sharp = require('sharp');
const getRelationship = require('../utils/getRelationship');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const path = `${process.env.APP_NAME}/users/${req.user.id}/public/profile_photos/`;

  const processedImage = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('webp')
    .webp({ quality: 90 })
    .toBuffer();

  const filePath = await uploadToCloudinary(processedImage, path);

  req.body.photo = filePath.url;

  next();
});

exports.resizeUserCover = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const path = `${process.env.APP_NAME}/users/${req.user.id}/public/profile_covers/`;

  const processedImage = await sharp(req.file.buffer)
    .toFormat('webp')
    .webp({ quality: 90 })
    .toBuffer();

  const filePath = await uploadToCloudinary(processedImage, path);

  req.body.cover = filePath.url;

  next();
});

const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select(
    '-search -savedPosts -email'
  );

  if (!user) {
    return next(new AppError('No user found with that username', 404));
  }

  const profileID = user.id;
  const userID = req.user.id;

  const friendship = await getRelationship(userID, profileID);

  const friends = await Friend.find({
    $or: [{ sender: profileID }, { recipient: profileID }],
    status: 'accepted',
  })
    .sort({ createdAt: -1 })
    .limit(9)
    .populate({
      path: 'sender recipient',
      select: 'first_name last_name photo username gender cover confirmed',
    });

  // Map the friend documents to an array of user documents
  const users = friends.map((friend) => {
    if (friend.sender._id.equals(profileID)) {
      return friend.recipient;
    } else {
      return friend.sender;
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
      friendship,
      friends: users,
    },
  });
});

exports.getPhotos = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return next(new AppError('No user found with that username', 404));
  }

  const path = `${process.env.APP_NAME}/users/${user.id}/public/*`;
  const photos = await getImages(path, 100, 'desc');
  const resources = photos.resources.map((photo) => {
    return { url: photo.secure_url, id: photo.asset_id };
  });
  const profilePhotos = photos.resources
    .filter(
      (photo) =>
        photo.folder ===
        `${process.env.APP_NAME}/users/${user.id}/public/profile_photos`
    )
    .map((photo) => {
      return { url: photo.secure_url, id: photo.asset_id };
    });

  const profileCovers = photos.resources
    .filter(
      (photo) =>
        photo.folder ===
        `${process.env.APP_NAME}/users/${user.id}/public/profile_covers`
    )
    .map((photo) => {
      return { url: photo.secure_url, id: photo.asset_id };
    });

  res.status(200).json({
    status: 'success',
    data: {
      total_count: photos.total_count,
      resources,
      profilePhotos,
      profileCovers,
    },
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const userID = req.user.id;

  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError('No user found with that username', 404));
  }

  let filter = { user: user.id };
  const features = new APIFeatures(Post.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const posts = await features.query;
  const ids = posts.map((el) => el._id.toString());

  const reactions = await Reaction.find({
    user: userID,
    post: { $in: ids },
  });
  const reactionsIds = reactions.map((el) => el.post.toString());

  const postsReactions = posts.map((post) => {
    post.reactions.isLiked = reactionsIds.includes(post._id.toString())
      ? reactions.find((o) => o.post.toString() === post._id.toString()).type
      : '';

    return post;
  });

  // console.log(reactions);
  res.status(200).json({
    status: 'success',
    length: posts.length,
    data: postsReactions,
  });
});

exports.updatePhoto = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('You cant update the passworm from this route', 400)
    );

  const userId = req.user.id;

  const filteredBody = filterObj(req.body, 'photo', 'text');

  await User.findByIdAndUpdate(userId, filteredBody, {
    new: true,
    runValidators: true,
  });

  await Post.create({
    user: userId,
    type: 'profilePhoto',
    text: filteredBody.text,
    images: [filteredBody.photo],
  });

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      url: filteredBody.photo,
    },
  });
});

exports.updateCover = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('You cant update the passworm from this route', 400)
    );

  const userId = req.user.id;

  const filteredBody = filterObj(req.body, 'cover');

  await User.findByIdAndUpdate(userId, filteredBody, {
    new: true,
    runValidators: true,
  });

  await Post.create({
    user: userId,
    type: 'cover',
    images: [filteredBody.cover],
  });

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      url: filteredBody.cover,
    },
  });
});

exports.updateDetails = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const filteredBody = filterObj(req.body, 'infos');

  const updated = await User.findByIdAndUpdate(
    userId,
    {
      details: filteredBody.infos,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      details: updated.details,
    },
  });
});

exports.searchUsers = catchAsync(async (req, res, next) => {
  const { term } = req.body;
  const userId = req.user.id;

  if (!term) return next(new AppError('Please provide a search term', 400));

  const results = await User.aggregate([
    {
      $match: {
        $or: [
          { first_name: { $regex: term.trim(), $options: 'i' } },
          { last_name: { $regex: term.trim(), $options: 'i' } },
          { email: { $regex: term.trim(), $options: 'i' } },
        ],
      },
    },
    {
      $project: {
        first_name: 1,
        last_name: 1,
        photo: 1,
      },
    },
  ]);

  const filteredResults = results.filter((x) => x._id.toString() !== userId);

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      results: filteredResults,
    },
  });
});

exports.addToSearchHistory = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { searchUser } = req.body;

  if (!searchUser)
    return next(new AppError('Please provide a user id : searchUser', 400));

  const user = await User.findById(userId);
  const check = user.search.find((x) => x.user.toString() === searchUser);

  if (check) {
    await User.updateOne(
      {
        _id: userId,
        'search._id': check._id,
      },
      {
        $set: { 'search.$.createdAt': new Date() },
      }
    );
  } else {
    await User.findByIdAndUpdate(userId, {
      $push: {
        search: { user: searchUser },
      },
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'User added to search history',
  });
});

exports.removeFromSearch = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { searchUser } = req.body;

  if (!searchUser)
    return next(new AppError('Please provide a user id : searchUser', 400));

  const user = await User.findById(userId);
  const check = user.search.find((x) => x.user.toString() === searchUser);

  if (check) {
    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { search: { user: searchUser } } }
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'User removed from search history',
  });
});

exports.getSearchHistory = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const searchHistory = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $unwind: '$search',
    },
    {
      $group: {
        _id: '$search.user',
        createdAt: { $last: '$search.createdAt' },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $replaceRoot: {
        newRoot: { _id: '$_id' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $project: {
        'user.first_name': 1,
        'user.last_name': 1,
        'user.photo': 1,
        'user.username': 1,
      },
    },
    {
      $unwind: '$user',
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      results: searchHistory,
    },
  });
});

exports.addFCM = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { fcmToken } = req.body;

  if (!fcmToken) return next(new AppError('Please provide a fcm token', 400));

  await User.updateOne(
    {
      _id: userId,
    },
    {
      fcmToken,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'FCM token added',
    fcmToken,
  });
});

exports.getNotification = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const notifications = await NotificationModel.find({
    recipient: userId,
  }).sort('-createdAt');
  const existingUser = await User.findById(userId);
  existingUser.unseenNotification = 0;
  await existingUser.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      notifications,
    },
  });
});

exports.seenNotification = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { nid } = req.params;

  console.log(nid);

  const notification = await NotificationModel.findById(nid);

  if (!notification) return next(new AppError('Notification not found', 404));

  notification.seen = 'seen';
  await notification.save();

  const existingUser = await User.findById(userId);
  existingUser.unseenNotification = 0;
  await existingUser.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      notification,
    },
  });
});
