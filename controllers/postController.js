const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const Post = require('../models/postModel');
const Follow = require('../models/followModel');
const Reaction = require('../models/reactionModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const { uploadToCloudinary } = require('../utils/cloudinaryHandler');
const Notification = require('../utils/notification');

const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPostImages = upload.fields([{ name: 'images', maxCount: 5 }]);

exports.resizePostImages = catchAsync(async (req, res, next) => {
  if (
    !req.files.images ||
    req.files.images?.length < 1 ||
    req.files.images === undefined
  ) {
    req.body.images = [];
    return next();
  }

  if (req.files.images.length > 5)
    return next(new AppError('You can opload 5 images max', 400));

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const path = `${process.env.APP_NAME}/users/${req.user.id}/public/posts/`;

      const processedImage = await sharp(file.buffer)
        .toFormat('webp')
        .webp({ quality: 70 })
        .toBuffer();

      const filePath = await uploadToCloudinary(processedImage, path);

      req.body.images.push(filePath.url);
    })
  );

  next();
});

exports.uploadCommentPhoto = upload.single('photo');

exports.resizeCommentPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const path = `${process.env.APP_NAME}/users/${req.user.id}/sec/comments/`;

  const processedImage = await sharp(req.file.buffer)
    .toFormat('webp')
    .webp({ quality: 30 })
    .toBuffer();

  const filePath = await uploadToCloudinary(processedImage, path);

  req.body.photo = filePath.url;

  next();
});

exports.createPost = catchAsync(async (req, res, next) => {
  const { type, text, images, background, sharedID } = req.body;

  const user = req.user.id;
  const newPost = await Post.create({
    user,
    type,
    text,
    images,
    background,
    sharedID,
  });

  await newPost.save();
  if (type === 'share')
    await newPost.populate({
      path: 'sharedID',
      select: 'images user type text background',
    });

  res.status(200).json({
    status: 'success',
    data: newPost,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  // const posts = await Post.find().sort({ createdAt: -1 });
  const following = await Follow.find({ sender: user });
  const followingIds = following.map((el) => el.recipient.toString());

  let filter = { user: { $in: [...followingIds, user] } };
  const features = new APIFeatures(Post.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const posts = await features.query;
  const ids = posts.map((el) => el._id);

  const reactions = await Reaction.find({
    user: user,
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

exports.getPost = catchAsync(async (req, res, next) => {
  const post = req.params.postID;
  const user = req.user.id;

  const checkPost = await Post.findById(post);
  if (!checkPost) return next(new AppError('No post found', 404));

  const reaction = await Reaction.findOne({
    user: user,
    post: post,
  });

  checkPost.reactions.isLiked =
    reaction?.post.toString() === checkPost._id.toString()
      ? reaction?.type
      : '';

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: { post: checkPost },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = req.params.postID;
  const user = req.user.id;

  const checkPost = await Post.findById(post);
  if (!checkPost) return next(new AppError('No post found', 404));

  if (checkPost.user.id !== user)
    return next(new AppError('You are not the owner of this post', 404));

  checkPost.deleted = true;
  await checkPost.save();

  // Send reponse
  res.status(200).json({
    status: 'success',
  });
});

exports.addReact = catchAsync(async (req, res, next) => {
  const { type } = req.body;
  const post = req.params.postID;
  const user = req.user.id;

  if (!post || !type)
    return next(new AppError('Please provide post and type', 400));

  const checkPost = await Post.findById(post);
  if (!checkPost) return next(new AppError('No posts found', 400));

  const checkReact = await Reaction.findOne({
    post: post,
    user: mongoose.Types.ObjectId(user),
  });

  let newReaction = null;
  let newNotification = null;

  if (!checkReact) {
    const reaction = new Reaction({
      post,
      user,
      type,
    });
    await reaction.save();
    newReaction = reaction.reactionStats;

    const recipient = await User.findById(checkPost.user).select(
      'fcmToken username'
    );

    newNotification = await new Notification({
      recipient: recipient,
      sender: req.user,
      postId: post,
      postReact: type,
    }).sendPostReact();
  } else {
    if (checkReact.type == type) {
      await checkReact.remove();
    } else {
      checkReact.type = type;
      await checkReact.save();
    }
  }

  const postReactions = checkReact?.reactionStats || newReaction;

  res.status(200).json({
    status: 'success',
    data: {
      reactions: postReactions,
      newNotification: newNotification ? newNotification : null,
    },
  });
});

exports.getReacts = catchAsync(async (req, res, next) => {
  const post = req.params.postID;
  const user = req.user.id;

  if (!post) return next(new AppError('Please provide post and type', 400));

  const checkPost = await Post.findById(post);
  if (!checkPost) return next(new AppError('No posts found', 400));

  const reacts = await Reaction.find({ post });
  const stats = await Reaction.calcReactions(mongoose.Types.ObjectId(post));

  res.status(200).json({
    status: 'success',
    data: { reacts, stats: stats },
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const post = req.params.postID;
  const user = req.user.id;

  if (!post)
    return next(new AppError('Please provide comment data and post', 400));

  const checkPost = await Post.findById(post);
  if (!checkPost) return next(new AppError('No post found', 404));

  const filteredBody = filterObj(req.body, 'photo', 'text');

  const commendData = await Comment.create({
    user: user,
    post,
    text: filteredBody.text,
    photo: filteredBody.photo,
  });

  const commentsCount = commendData?.commentsCount;

  const recipient = await User.findById(checkPost.user).select(
    'fcmToken username'
  );

  const newNotification = await new Notification({
    recipient: recipient,
    sender: req.user,
    postId: post,
    postReact: filteredBody.text.slice(0, 10),
  }).sendPostComment();

  res.status(200).json({
    status: 'success',
    data: {
      commendData,
      commentsCount,
      newNotification: newNotification ? newNotification : null,
    },
  });
});

exports.commentLike = catchAsync(async (req, res, next) => {
  const comment = req.params.commentID;
  const user = req.user.id;

  const checkComment = await Comment.findById(comment);
  if (!checkComment) return next(new AppError('No comment found', 404));

  let newNotification = null;

  if (checkComment.likes.includes(user)) {
    checkComment.likes.pull(user);
    await checkComment.save();
  } else {
    checkComment.likes.push(user);
    await checkComment.save();
    const recipient = await User.findById(checkComment.user).select(
      'fcmToken username'
    );

    newNotification = await new Notification({
      recipient: recipient,
      sender: req.user,
      postId: checkComment.post,
      postReact: '',
    }).sendCommentLike();
  }

  res.status(200).json({
    status: 'success',
    data: {
      likes: checkComment.likes,
      newNotification: newNotification ? newNotification : null,
    },
  });
});

exports.addCommentReply = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const comment = req.params.commentID;
  const user = req.user.id;

  if (!comment || !text)
    return next(new AppError('Please provide comment and text', 400));

  const checkComment = await Comment.findById(comment);
  if (!checkComment) return next(new AppError('No comment found', 404));

  const filteredBody = filterObj(req.body, 'photo', 'text');

  checkComment.replies.push({
    user,
    text: filteredBody.text,
    photo: filteredBody.photo,
  });
  await checkComment.save();
  await checkComment.populate({
    path: 'replies.user',
    select: 'first_name last_name photo username confirmed',
  });

  const recipient = await User.findById(checkComment.user).select(
    'fcmToken username'
  );

  const newNotification = await new Notification({
    recipient: recipient,
    sender: req.user,
    postId: checkComment.post,
    postReact: filteredBody.text.slice(0, 10),
  }).sendCommentComment();

  res.status(200).json({
    status: 'success',
    data: {
      replies: checkComment.replies,
      newNotification: newNotification ? newNotification : null,
    },
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const post = req.params.postID;
  const user = req.user.id;

  if (!post) return next(new AppError('Please provide post', 400));

  const checkPost = await Post.findById(post);
  if (!checkPost) return next(new AppError('No post found', 404));

  let filter = { post: checkPost.id };

  const features = new APIFeatures(Comment.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const comments = await features.query;

  res.status(200).json({
    status: 'success',
    datalength: comments?.length,
    data: { comments },
  });
});
