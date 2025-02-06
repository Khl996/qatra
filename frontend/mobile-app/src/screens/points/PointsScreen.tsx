import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header } from '../../components/common/Header';
import { pointsService } from '../../services/pointsService';
import { useAuth } from '../../context/AuthContext';
import { LoadingState } from '../../components/common/LoadingState';

type PointsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PointsScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [points, setPoints] = useState(0);
    const [history, setHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();
    const navigation = useNavigation<PointsScreenNavigationProp>();

    const loadPoints = async () => {
        try {
            setIsLoading(true);
            const pointsData = await pointsService.getUserPoints();
            setPoints(pointsData.total);
            const historyData = await pointsService.getPointsHistory();
            setHistory(historyData);
        } catch (error) {
            Alert.alert('خطأ', 'فشل في تحميل النقاط');
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadPoints();
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
                            loadPoints();
                        }}
                    />
                }
                style={styles.content}
            >
                <View style={styles.pointsContainer}>
                    <Text style={styles.pointsValue}>{points}</Text>
                    <Text style={styles.pointsLabel}>نقطة</Text>
                </View>
                <View style={styles.historyContainer}>
                    {history.map((item, index) => (
                        <View key={index} style={styles.historyItem}>
                            <Text style={styles.historyText}>{item.description}</Text>
                            <Text style={styles.historyDate}>{item.date}</Text>
                        </View>
                    ))}
                </View>
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
    pointsContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
    },
    pointsValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    pointsLabel: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    historyContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    historyText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    historyDate: {
        fontSize: 14,
        color: '#7f8c8d',
    },
});
