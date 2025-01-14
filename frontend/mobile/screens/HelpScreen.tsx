import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text
} from 'react-native';

const HelpScreen: React.FC = () => {
  const helpSections = [
    {
      title: 'كيف يعمل نظام النقاط؟',
      content: 'تحصل على نقاط عند كل عملية شراء من المتاجر المشاركة. يمكنك استبدال هذه النقاط بعروض وخصومات حصرية.'
    },
    {
      title: 'كيفية استبدال النقاط',
      content: 'اختر العرض المناسب من قائمة العروض المتاحة، تأكد من امتلاكك للنقاط الكافية، ثم اضغط على زر الاستبدال.'
    },
    {
      title: 'المتاجر المشاركة',
      content: 'يمكنك رؤية جميع المتاجر المشاركة في التطبيق من خلال خريطة المتاجر أو البحث باستخدام اسم المتجر.'
    }
  ];

  const contactSupport = () => {
    Linking.openURL('mailto:support@qatra.com');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مركز المساعدة</Text>
      </View>

      {helpSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionContent}>{section.content}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.supportButton} onPress={contactSupport}>
        <Text style={styles.supportButtonText}>تواصل مع الدعم الفني</Text>
      </TouchableOpacity>

      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>معلومات الاتصال</Text>
        <Text style={styles.contactText}>البريد الإلكتروني: support@qatra.com</Text>
        <Text style={styles.contactText}>رقم الهاتف: 920000000</Text>
        <Text style={styles.contactText}>ساعات العمل: 9 صباحاً - 5 مساءً</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'right',
  },
  supportButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right',
  },
  contactText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'right',
  },
});

export default HelpScreen;
