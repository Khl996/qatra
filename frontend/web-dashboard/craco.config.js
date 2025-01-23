const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@admin': path.resolve(__dirname, 'src/modules/admin-dashboard'),
      '@merchant': path.resolve(__dirname, 'src/modules/merchant-dashboard')
    }
  }
};
