import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header } from '../../components/common/Header';
import { offerService } from '../../services/offerService';
import { useAuth } from '../../context/AuthContext';
import { LoadingState } from '../../components/common/LoadingState';

type OffersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OffersScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [offers, setOffers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();
    const navigation = useNavigation<OffersScreenNavigationProp>();

    const loadOffers = async () => {
        try {
            const response = await offerService.getAllOffers();
            setOffers(response.data);
        } catch (error) {
            Alert.alert('خطأ', 'فشل في تحميل العروض');
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadOffers();
    }, []);

    if (isLoading) return <LoadingState />;

    return (
        <View style={styles.container}>
            <Header 
                name={user?.name || ''}
                uniqueCode={user?.uniqueCode || ''}
                showNotification
                onNotificationPress={() => console.log('Notification pressed')}
                onProfilePress={() => console.log('Profile pressed')}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            loadOffers();
                        }}
                    />
                }
                style={styles.content}
            >
                {offers.map((offer) => (
                    <View key={offer.id} style={styles.offerCard}>
                        <Text style={styles.offerTitle}>{offer.title}</Text>
                        <Text style={styles.offerDescription}>{offer.description}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 120, // زيادة padding لتبدأ الصفحة بعد البار العلوي بمسافة أكبر
    },
    content: {
        flex: 1,
        padding: 16,
    },
    offerCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    offerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    offerDescription: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 8,
    },
});
