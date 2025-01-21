import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // التحقق من اكتمال الرمز
    if (newOtp.join('').length === length) {
      onComplete(newOtp.join(''));
    }

    // الانتقال إلى الحقل التالي
    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => inputRefs.current[index] = ref as TextInput}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#fff',
  },
});
