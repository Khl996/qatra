import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header } from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { LoadingState } from '../../components/common/LoadingState';

interface UserData {
    name: string;
    email: string;
    phone: string;
    points: number;
    uniqueCode: string;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const { user, logout } = useAuth();
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const loadUserData = async () => {
        try {
            const data = await userService.getProfile();
            setUserData(data);
        } catch (error) {
            Alert.alert('خطأ', 'فشل في تحميل بيانات الملف الشخصي');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'تسجيل الخروج',
            'هل أنت متأكد من تسجيل الخروج؟',
            [
                {
                    text: 'إلغاء',
                    style: 'cancel'
                },
                {
                    text: 'نعم',
                    onPress: logout,
                    style: 'destructive'
                }
            ]
        );
    };

    useEffect(() => {
        loadUserData();
    }, []);

    if (isLoading || !userData) return <LoadingState />;

    return (
        <View style={styles.container}>
            <Header 
                name={userData.name}
                uniqueCode={userData.uniqueCode}
                showNotification={false}
                onNotificationPress={() => {}}
                onProfilePress={() => {}}
            />
            <ScrollView style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{userData.name}</Text>
                        <Text style={styles.uniqueCode}>#{userData.uniqueCode}</Text>
                    </View>
                    <View style={styles.pointsContainer}>
                        <Text style={styles.pointsValue}>{userData.points}</Text>
                        <Text style={styles.pointsLabel}>نقطة</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>تسجيل الخروج</Text>
                </TouchableOpacity>
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
    },
    card: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    profileInfo: {
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    uniqueCode: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    pointsContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
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
    optionsContainer: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
    },
    optionItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    logoutButton: {
        margin: 16,
        padding: 16,
        backgroundColor: '#e74c3c',
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
