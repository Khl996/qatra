import React, { useState, useEffect } from 'react';
import { 
    View, 
    ScrollView, 
    StyleSheet, 
    Image, 
    Text, 
    TouchableOpacity,
    Alert,
    Platform 
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { LoadingState, OfferCard } from '../../components';
import { Store, StoreOffer, storeService } from '../../services/storeService';

type StoreDetailsRouteProp = RouteProp<RootStackParamList, 'StoreDetails'>;
type StoreDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StoreDetailsScreen() {
    const [store, setStore] = useState<Store | null>(null);
    const [offers, setOffers] = useState<StoreOffer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute<StoreDetailsRouteProp>();
    const navigation = useNavigation();
    const { id } = route.params;

    useEffect(() => {
        loadStoreDetails();
    }, [id]);

    const loadStoreDetails = async () => {
        try {
            const [storeData, offersData] = await Promise.all([
                storeService.getStoreById(id),
                storeService.getStoreOffers(id)
            ]);
            setStore(storeData);
            setOffers(offersData);
        } catch (error) {
            Alert.alert('خطأ', 'فشل في تحميل بيانات المتجر');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !store) return <LoadingState />;

    return (
        <ScrollView style={styles.container}>
            <Image 
                source={{ uri: store.imageUrl }} 
                style={styles.coverImage} 
            />
            <View style={styles.header}>
                <Text style={styles.name}>{store.name}</Text>
                <Text style={styles.category}>{store.category}</Text>
                {store.rating && (
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{store.rating.toFixed(1)}</Text>
                        <Image 
                            source={require('../../../assets/icons/star.png')}
                            style={styles.starIcon}
                        />
                    </View>
                )}
            </View>
            
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>العروض الحالية</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {offers.map(offer => (
                        <OfferCard
                            key={offer.id}
                            {...offer}
                            points={offer.points}
                            storeName={store.name}
                            onPress={() => {
                                const nav = navigation as StoreDetailsScreenNavigationProp;
                                nav.navigate('OfferDetails', {
                                    id: offer.id,
                                    storeId: store.id
                                });
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4
    },
    category: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 8
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f1c40f',
        marginRight: 4
    },
    starIcon: {
        width: 16,
        height: 16,
        tintColor: '#f1c40f'
    },
    section: {
        padding: 16
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 12
    }
});
