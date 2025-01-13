# ملف Dockerfile: بناء صورة التطبيق
# المسار: backend/Dockerfile

# استخدام صورة Node.js الأساسية
FROM node:16

# إعداد دليل العمل داخل الحاوية
WORKDIR /app

# نسخ ملفات المشروع
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# تعيين المنفذ
EXPOSE 4000

# تشغيل التطبيق
CMD ["node", "index.js"]
