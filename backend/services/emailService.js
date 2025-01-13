// ملف emailService.js: إرسال البريد الإلكتروني
// المسار: backend/services/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // اسم المستخدم
        pass: process.env.EMAIL_PASSWORD, // كلمة المرور
    },
});

console.log('Email transporter created');

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
