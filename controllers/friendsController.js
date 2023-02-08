const User = require('../models/userModel');
const Friend = require('../models/friendsModel');
const Follow = require('../models/followModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const getRelationship = require('../utils/getRelationship');
const Notification = require('../utils/notification');

exports.addFriend = catchAsync(async (req, res, next) => {
  const senderID = req.user.id;
  const recipientID = req.params.id;

  if (senderID === recipientID)
    return next(new AppError("You can't add yourself", 400));

  const recipient = await User.findById(recipientID).select('+fcmToken');

  if (!recipient) return next(new AppError('No user Found', 400));

  const existingFriendRequest = await Friend.findOne({
    sender: senderID,
    recipient: recipient._id,
  });

  let newNotification = null;

  if (!existingFriendRequest) {
    const existingFriendRequestFromRecipient = await Friend.findOne({
      sender: recipient._id,
      recipient: senderID,
    });

    if (existingFriendRequestFromRecipient) {
      await existingFriendRequestFromRecipient.remove();
    }
    // Create a new friend request with the status "pending"
    const friendRequest = new Friend({
      sender: senderID,
      recipient: recipient._id,
      status: 'pending',
    });

    // Save the friend request to the database
    await friendRequest.save();

    newNotification = await new Notification({
      recipient: recipient,
      sender: req.user,
      postId: req.user.username,
      postReact: '',
    }).sendFriendRequest();

    const existingFollow = await Follow.findOne({
      sender: senderID,
      recipient: recipient._id,
    });

    if (!existingFollow) {
      const followRccipient = new Follow({
        sender: senderID,
        recipient: recipient._id,
      });
      await followRccipient.save();
    }
  } else if (existingFriendRequest.status === 'cancelled') {
    existingFriendRequest.status = 'pending';

    await existingFriendRequest.save();

    newNotification = await new Notification({
      recipient: recipient,
      sender: req.user,
      postId: req.user.username,
      postReact: '',
    }).sendFriendRequest();
  } else {
    return next(
      new AppError(
        'You aleardy sent a request or this user alerady sent you a request',
        400
      )
    );
  }
  const friendship = await getRelationship(senderID, recipientID);

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Request sent',
      friendship,
      newNotification: newNotification ? newNotification : null,
    },
  });
});

exports.cancelRequest = catchAsync(async (req, res, next) => {
  const friendRequestId = req.params.friendRequestId;
  const senderID = req.user.id;

  // Find the friend request
  const friendRequest = await Friend.findById(friendRequestId);

  if (
    !friendRequest ||
    friendRequest.status !== 'pending' ||
    (friendRequest.recipient.toString() !== senderID &&
      friendRequest.sender.toString() !== senderID)
  )
    return next(new AppError('No friend request found', 400));

  // Update the status of the friend request to "cancelled"
  friendRequest.status = 'cancelled';
  await friendRequest.save();
  const friendship = await getRelationship(
    senderID,
    friendRequest.recipient.toString()
  );

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Request cancelled',
      friendship,
    },
  });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const friendRequestId = req.params.friendRequestId;
  const recipientID = req.user.id;

  // Find the friend request
  const friendRequest = await Friend.findById(friendRequestId);

  if (
    !friendRequest ||
    friendRequest.status !== 'pending' ||
    friendRequest.recipient.toString() !== recipientID
  )
    return next(new AppError('No friend request found', 400));

  // Update the status of the friend request to "cancelled"
  friendRequest.status = 'accepted';
  await friendRequest.save();

  const recipient = await User.findById(friendRequest.sender).select(
    'fcmToken username'
  );

  const newNotification = await new Notification({
    recipient: recipient,
    sender: req.user,
    postId: req.user.username,
    postReact: '',
  }).sendFriendAccept();

  const existingFollow = await Follow.findOne({
    sender: recipientID,
    recipient: friendRequest.sender,
  });

  if (!existingFollow) {
    const followRccipient = new Follow({
      sender: recipientID,
      recipient: friendRequest.sender,
    });
    await followRccipient.save();
  }

  const friendship = await getRelationship(recipientID, friendRequest.sender);

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Request accepted',
      friendship,
      newNotification: newNotification ? newNotification : null,
    },
  });
});

exports.removeFriend = catchAsync(async (req, res, next) => {
  const friendRequestId = req.params.friendRequestId;
  const recipientID = req.user.id;

  // Find the friend request
  const friendRequest = await Friend.findById(friendRequestId);

  if (
    !friendRequest ||
    friendRequest.status !== 'accepted' ||
    (friendRequest.recipient.toString() !== recipientID &&
      friendRequest.sender.toString() !== recipientID)
  )
    return next(new AppError('No friend found', 400));

  // Update the status of the friend request to "cancelled"

  const fR = friendRequest.recipient.toString();
  const fS = friendRequest.sender.toString();

  await Follow.deleteMany({
    $or: [
      { sender: fR, recipient: fS },
      { sender: fS, recipient: fR },
    ],
  });
  await friendRequest.remove();
  const friendship = await getRelationship(fR, fS);

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Request removed',
      friendship,
    },
  });
});

exports.follow = catchAsync(async (req, res, next) => {
  const senderID = req.user.id;
  const recipientID = req.params.id;

  if (senderID === recipientID)
    return next(new AppError("You can't follow yourself", 400));

  const existingFollow = await Follow.findOne({
    sender: senderID,
    recipient: recipientID,
  });

  if (existingFollow)
    return next(new AppError('You aleardy follow this user', 400));

  // Find the friend request
  const follow = new Follow({
    sender: senderID,
    recipient: recipientID,
  });
  await follow.save();
  const recipient = await User.findById(recipientID).select(
    'fcmToken username'
  );

  const newNotification = await new Notification({
    recipient: recipient,
    sender: req.user,
    postId: req.user.username,
    postReact: '',
  }).sendFollow();
  const friendship = await getRelationship(senderID, recipientID);

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Follow successful',
      friendship,
      newNotification: newNotification ? newNotification : null,
    },
  });
});

exports.unfollow = catchAsync(async (req, res, next) => {
  const senderID = req.user.id;
  const recipientID = req.params.id;

  if (senderID === recipientID)
    return next(new AppError("You can't follow yourself", 400));

  // Find the friend request
  const follow = await Follow.findOne({
    sender: senderID,
    recipient: recipientID,
  });

  if (!follow)
    return next(new AppError('You are not following this user', 400));

  await follow.remove();
  const friendship = await getRelationship(senderID, recipientID);

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Unfollow successful',
      friendship,
    },
  });
});

exports.getFriends = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // get friends
  const friends = await Friend.find({
    $or: [{ sender: userId }, { recipient: userId }],
    status: 'accepted',
  })
    .sort({ createdAt: -1 })
    .limit(100)
    .populate({
      path: 'sender recipient',
      select: 'first_name last_name photo username gender cover',
    });

  const friendLists = friends.map((friend) => {
    if (friend.sender._id.equals(userId)) {
      return friend.recipient;
    } else {
      return friend.sender;
    }
  });

  // get recived friend requests
  const recivedRequestsCount = await Friend.countDocuments({
    recipient: userId,
    status: 'pending',
  });
  const recivedRequests = await Friend.find({
    recipient: userId,
    status: 'pending',
  })
    .sort({ createdAt: -1 })
    .limit(100)
    .populate({
      path: 'sender',
      select: 'first_name last_name photo username gender cover',
    });

  // get sent requests
  const sentRequests = await Friend.find({
    sender: userId,
    status: 'pending',
  })
    .sort({ createdAt: -1 })
    .limit(100)
    .populate({
      path: 'recipient',
      select: 'first_name last_name photo username gender cover',
    });

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: {
      recivedRequestsCount,
      friendLists,
      recivedRequests,
      sentRequests,
    },
  });
});
