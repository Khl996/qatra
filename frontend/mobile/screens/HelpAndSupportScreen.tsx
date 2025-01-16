import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import { colors } from '../../shared/theme';

const HelpAndSupportScreen: React.FC = () => {
  const faqs = [
    {
      question: 'كيف يمكنني كسب النقاط؟',
      answer: 'يمكنك كسب النقاط من خلال الشراء من المتاجر المشاركة في البرنامج. كل ريال = نقطة واحدة.'
    },
    {
      question: 'كيف يمكنني استبدال النقاط؟',
      answer: 'يمكنك استبدال النقاط بالعروض المتاحة في قسم العروض. اختر العرض المناسب واضغط على زر الاستبدال.'
    },
    {
      question: 'هل يمكنني تحويل النقاط لشخص آخر؟',
      answer: 'حالياً لا يمكن تحويل النقاط بين المستخدمين.'
    }
  ];

  const contactSupport = () => {
    Linking.openURL('mailto:support@qatra.com');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الأسئلة الشائعة</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>تواصل معنا</Text>
        <TouchableOpacity style={styles.contactButton} onPress={contactSupport}>
          <Text style={styles.contactButtonText}>مراسلة الدعم الفني</Text>
        </TouchableOpacity>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>البريد: support@qatra.com</Text>
          <Text style={styles.contactText}>الهاتف: 920000000</Text>
          <Text style={styles.contactText}>ساعات العمل: 9 صباحاً - 5 مساءً</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
    color: colors.primary,
  },
  faqItem: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
    color: '#333',
  },
  answer: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'right',
  },
});

export default HelpAndSupportScreen;
