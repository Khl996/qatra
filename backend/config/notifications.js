const admin = require('firebase-admin');

const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const sendPushNotification = async (token, title, body) => {
  try {
    await admin.messaging().send({
      token,
      notification: {
        title,
        body
      }
    });
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

module.exports = {
  sendPushNotification
};
