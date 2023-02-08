const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/userModel');
const Notification = require('../utils/notification');

const ObjectId = mongoose.Types.ObjectId;

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { content, type } = req.body;
  const userId = req.user.id;
  const { chatId } = req.params;

  const existingChat = await Chat.findById(chatId);

  if (!existingChat) return next(new AppError('No chat found', 400));

  const targetId = new ObjectId(userId);
  if (!existingChat.users.some((id) => id.equals(targetId)))
    return next(new AppError('You are not member in this chat', 400));

  const newMessage = await Message.create({
    type,
    sender: userId,
    content: content,
    chat: chatId,
  });

  await newMessage.save();

  const filteredChat = existingChat;
  filteredChat.users = filteredChat.users.filter((user) => {
    return user._id.toString() !== userId;
  });

  await Promise.all(
    filteredChat.users.map(async (user) => {
      const recipient = await User.findById(user._id.toString()).select(
        'fcmToken username'
      );
      await new Notification({
        recipient: recipient,
        sender: req.user,
        postId: existingChat._id,
        postReact: newMessage.content.slice(0, 10),
      }).sendMessage();
    })
  );

  res.status(200).json({
    status: 'success',
    data: { message: newMessage },
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { chatId } = req.params;
  const { page } = req.query;
  const existingChat = await Chat.findById(chatId);

  if (!existingChat) return next(new AppError('No chat found', 400));

  const targetId = new ObjectId(userId);
  if (!existingChat.users.some((id) => id.equals(targetId)))
    return next(new AppError('You are not member in this chat', 400));

  let filter = {
    chat: chatId,
  };
  const features = new APIFeatures(
    Message.find(filter).populate({
      path: 'sender seenBy',
      select: 'first_name last_name photo username gender confirmed',
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const messages = await features.query;

  const filteredChat = existingChat;
  filteredChat.users = filteredChat.users.filter((user) => {
    return user._id.toString() !== userId;
  });
  if (filteredChat.type === 'private') {
    filteredChat.photo = filteredChat.users[0].photo;
    filteredChat.chatName = `${filteredChat.users[0].first_name} ${filteredChat.users[0].last_name}`;
  } else if (!filteredChat.photo) {
    filteredChat.photo =
      'https://res.cloudinary.com/dcu2kxr5x/image/upload/v1675105115/BACKBOOK/assets/group_fu7eoo.png';
  }

  res.status(200).json({
    status: 'success',
    length: messages.length,
    data: {
      chat: page == 1 ? existingChat : null,
      messages,
    },
  });
});

exports.seenMessage = catchAsync(async (req, res, next) => {
  const { msgId } = req.params;
  const userId = req.user.id;

  const existingMessage = await Message.findById(msgId);

  if (!existingMessage) return next(new AppError('No message found', 400));

  existingMessage.seen = 'seen';
  if (!existingMessage.seenBy.includes(userId))
    existingMessage.seenBy.push(userId);

  await existingMessage.save();

  res.status(200).json({
    status: 'success',
    data: {
      message: existingMessage,
      unseenMessages: req.user.unseenMessages - 1,
    },
  });
});
