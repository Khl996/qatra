import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header, SearchBar, StoreCard, LoadingState } from '../../components';
import { storeService, Store } from '../../services/storeService';
import { useAuth } from '../../context/AuthContext';
import * as Location from 'expo-location';

type StoresScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StoresScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [stores, setStores] = useState<Store[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();
    const navigation = useNavigation<StoresScreenNavigationProp>();

    const loadStores = async () => {
        try {
            setIsLoading(true);
            const { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                const { data } = await storeService.getNearbyStores(
                    location.coords.latitude,
                    location.coords.longitude
                );
                setStores(data);
            } else {
                // إذا لم يتم منح الإذن، نجلب المتاجر بدون موقع
                const { data } = await storeService.getAllStores();
                setStores(data);
            }
        } catch (error) {
            Alert.alert('خطأ', 'فشل في تحميل المتاجر');
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadStores();
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
            <SearchBar onSearch={(text) => console.log('Searching:', text)} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            loadStores();
                        }}
                    />
                }
                style={styles.content}
            >
                {stores.map((store) => (
                    <StoreCard
                        key={store.id}
                        {...store}
                        rating={store.rating || 0}
                        onPress={() => 
                            navigation.navigate('StoreDetails', { 
                                id: store.id.toString() 
                            })
                        }
                    />
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
    }
});
