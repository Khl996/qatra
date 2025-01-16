import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useUpdateProfileMutation, useGetProfileQuery } from '../store/api/userApi';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function EditProfileScreen() {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
  });

  const handleUpdate = async () => {
    try {
      await updateProfile(formData).unwrap();
      Alert.alert('نجاح', 'تم تحديث الملف الشخصي بنجاح');
    } catch (error) {
      Alert.alert('خطأ', 'فشل تحديث الملف الشخصي');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CustomInput
        label="الاسم"
        value={formData.name}
        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
      />
      <CustomInput
        label="البريد الإلكتروني"
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
      />
      <CustomInput
        label="رقم الجوال"
        value={formData.phone}
        keyboardType="phone-pad"
        onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
      />
      <CustomButton title="حفظ التغييرات" onPress={handleUpdate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  }
});
