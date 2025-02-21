const ENV = {
  dev: {
    apiUrl: 'http://172.20.10.4:3000/api', // استبدل X بالرقم الصحيح لجهازك
    enableLogging: true
  },
  prod: {
    apiUrl: 'https://api.yourserver.com',
    enableLogging: false
  }
};

const getEnvVars = (env = 'dev') => {
  if (env === 'prod') {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars;
