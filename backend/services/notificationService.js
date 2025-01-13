// ملف notificationService.js: إرسال الإشعارات الفورية
// المسار: backend/services/notificationService.js

const admin = require('firebase-admin');

// تهيئة Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
    console.log('Firebase Admin SDK initialized');
}

const sendNotification = async (token, title, body) => {
    try {
        const message = {
            notification: { title, body },
            token,
        };
        await admin.messaging().send(message);
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = { sendNotification };
