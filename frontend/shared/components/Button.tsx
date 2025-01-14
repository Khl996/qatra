import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

// تعريف الألوان (قم بتعديل هذه القيم لتتناسب مع تصميمك)
const colors = {
  primary: '#007BFF',
  secondary: '#FFFFFF',
};

// تعريف واجهة الخصائص الخاصة بالمكون
interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string; // نص الزر
  variant?: 'primary' | 'secondary'; // نوع الزر (أساسي أو ثانوي)
  disabled?: boolean; // إذا كان الزر معطلاً
}

// مكون الزر
const Button = ({ 
  title, 
  variant = 'primary', 
  disabled = false, 
  onPress, 
  ...rest 
}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      {...rest} // تمرير الخصائص الإضافية
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled, // إضافة أنماط التعطيل إذا كان الزر معطلاً
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${variant}Text` as keyof typeof styles], // تغيير لون النص حسب نوع الزر
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// الأنماط الخاصة بالمكون
const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  primary: {
    backgroundColor: colors.primary, // لون الخلفية للزر الأساسي
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary, // حدود الزر الثانوي
  },
  disabled: {
    opacity: 0.6, // خفض الشفافية عند التعطيل
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#FFFFFF', // لون النص في الزر الأساسي
  },
  secondaryText: {
    color: colors.primary, // لون النص في الزر الثانوي
  },
} as const);

export default Button;
