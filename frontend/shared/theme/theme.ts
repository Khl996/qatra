export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#6C757D',
    success: '#4CAF50',
    danger: '#D32F2F',
    warning: '#FFC107',
    info: '#0DCAF0',
    light: '#F8F9FA',
    dark: '#212529',
    background: '#FFFFFF',
    text: {
      primary: '#000000',
      secondary: '#666666',
      light: '#999999'
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  typography: {
    sizes: {
      h1: 24,
      h2: 20,
      h3: 18,
      body: 16,
      small: 14,
      xs: 12
    },
    weights: {
      regular: '400',
      medium: '500',
      bold: '700'
    }
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    round: 9999
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4
    }
  }
};

export default theme;
