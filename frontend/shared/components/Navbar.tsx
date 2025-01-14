import * as React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
  userName?: string;
  onLogout?: () => void;
}

const Navbar = ({ items, userName, onLogout }: NavbarProps): JSX.Element => {
  if (Platform.OS === 'web') {
    // استخدام dynamic import في الويب فقط
    const Link = require('next/link').default;

    return React.createElement(
      'nav',
      { className: 'bg-white shadow-md', key: 'nav' },
      React.createElement(
        'div',
        { className: 'max-w-7xl mx-auto px-4', key: 'container' },
        React.createElement(
          'div',
          { className: 'flex justify-between h-16', key: 'content' },
          [
            React.createElement(
              'div',
              { key: 'nav-items', className: 'flex' },
              [
                React.createElement(
                  'div',
                  {
                    key: 'logo',
                    className: 'flex-shrink-0 flex items-center'
                  },
                  React.createElement('img', {
                    key: 'logo-img',
                    className: 'h-8 w-auto',
                    src: '/logo.png',
                    alt: 'قطرة'
                  })
                ),
                React.createElement(
                  'div',
                  {
                    key: 'links',
                    className: 'hidden md:ml-6 md:flex md:space-x-8'
                  },
                  items.map((item) =>
                    React.createElement(
                      Link,
                      {
                        key: item.href,
                        href: item.href,
                        className: 'inline-flex items-center px-1 pt-1 text-gray-900'
                      },
                      item.label
                    )
                  )
                )
              ]
            ),
            userName && React.createElement(
              'div',
              {
                key: 'user-section',
                className: 'flex items-center'
              },
              [
                React.createElement(
                  'span',
                  {
                    key: 'username',
                    className: 'text-gray-700 ml-4'
                  },
                  userName
                ),
                onLogout && React.createElement(
                  'button',
                  {
                    key: 'logout',
                    onClick: onLogout,
                    className: 'ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-800'
                  },
                  'تسجيل الخروج'
                )
              ].filter(Boolean)
            )
          ].filter(Boolean)
        )
      )
    );
  }

  return React.createElement(
    View,
    { style: styles.container, key: 'mobile-nav' },
    null
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  }
} as const);

export default Navbar;
