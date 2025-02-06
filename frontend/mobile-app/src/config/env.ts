const ENV = {
  dev: {
    apiUrl: 'http://172.20.10.4:5000/api', // تغيير للـ IP الخاص بك
    enableLogs: true,
    timeoutSeconds: 30,
  },
  prod: {
    apiUrl: 'https://api.qatra-app.com/api',
    enableLogs: false,
    timeoutSeconds: 30,
  }
};

export default __DEV__ ? ENV.dev : ENV.prod;
