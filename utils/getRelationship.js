const Follow = require('../models/followModel');
const Friend = require('../models/friendsModel');

module.exports = async (userID, profileID) => {
  const realationship = await Friend.findOne({
    $or: [
      { sender: userID, recipient: profileID },
      { sender: profileID, recipient: userID },
    ],
  });

  const isFollowing = await Follow.findOne({
    sender: userID,
    recipient: profileID,
  });

  const friendship = {
    friends: realationship?.status === 'accepted' ? true : false,
    following: isFollowing ? true : false,
    requestSent:
      realationship?.sender.toString() === userID &&
      realationship?.status === 'pending'
        ? true
        : false,
    requestReceived:
      realationship?.sender.toString() === profileID &&
      realationship?.status === 'pending'
        ? true
        : false,
    requestID: realationship?.id ? realationship?.id : null,
  };

  return friendship;
};
