const FCM = require('fcm-node');
const fcm = new FCM(process.env.FCM_SERVER_KEY);

module.exports = class Notification {
  constructor({ recipient, sender, postId, postReact }) {
    this.to = recipient;
    this.recipient = recipient.username;
    this.sender_name = sender;
    this.postId = postId;
    this.postReact = postReact;
  }

  async send(body, click) {
    const message = {
      to: this.to.fcmToken,
      notification: {
        title: 'Backbook',
        body: body,
        click_action: click,
        icon: 'https://res.cloudinary.com/dcu2kxr5x/image/upload/v1672997573/BACKBOOK/assets/backbooklogo_on8xru.svg',
      },
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log('Something has gone wrong!');
        console.log(err);
      }
    });
  }

  async sendPostReact() {
    const postLink = `${process.env.FRONTEND_URL}/${this.recipient}/posts/${this.postId}`;

    await this.send(
      `${this.sender_name} reacted ${this.postReact} on your post`,
      postLink
    );
  }

  async sendPostComment() {
    const postLink = `${process.env.FRONTEND_URL}/${this.recipient}/posts/${this.postId}`;

    await this.send(
      `${this.sender_name} commented ${this.postReact} on your post`,
      postLink
    );
  }

  async sendCommentLike() {
    const postLink = `${process.env.FRONTEND_URL}/${this.recipient}/posts/${this.postId}`;

    await this.send(`${this.sender_name} liked your comment`, postLink);
  }

  async sendCommentComment() {
    const postLink = `${process.env.FRONTEND_URL}/${this.recipient}/posts/${this.postId}`;

    await this.send(
      `${this.sender_name} replied ${this.postReact} on your comment`,
      postLink
    );
  }

  async sendFriendRequest() {
    const postLink = `${process.env.FRONTEND_URL}/${this.postId}`;

    console.log(postLink);
    await this.send(`${this.sender_name} Sent you a friend request`, postLink);
  }

  async sendFriendAccept() {
    const postLink = `${process.env.FRONTEND_URL}/${this.postId}`;

    console.log(postLink);
    await this.send(`${this.sender_name} Accept your friend request`, postLink);
  }

  async sendFollow() {
    const postLink = `${process.env.FRONTEND_URL}/${this.postId}`;

    console.log(postLink);
    await this.send(`${this.sender_name} Followed you`, postLink);
  }
};
