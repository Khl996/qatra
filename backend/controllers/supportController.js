// ملف supportController.js: إدارة طلبات الدعم الفني
// المسار: backend/controllers/supportController.js

const sendSupportRequest = async (req, res) => {
    const { userId, message } = req.body;

    try {
        // تنفيذ منطق إرسال الدعم (مثال: إرسال بريد إلكتروني أو حفظ الطلب في قاعدة البيانات)
        res.status(200).json({ message: 'Support request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending support request', error: error.message });
    }
};

module.exports = { sendSupportRequest };
