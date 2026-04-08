import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface AddressPickerProps {
    onBack: () => void;
    onSelectAddress: (address: string) => void;
}

export const AddressPicker: React.FC<AddressPickerProps> = ({ onBack, onSelectAddress }) => {
    const [region, setRegion] = useState({
        latitude: 23.0225, // Default Ahmedabad
        longitude: 72.5714,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('Select a location on map');
    const [loadingAddress, setLoadingAddress] = useState(false);

    useEffect(() => {
        // Get initial location
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const loc = await Location.getCurrentPositionAsync({});
                const newRegion = {
                    ...region,
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                };
                setRegion(newRegion);
                reverseGeocode(loc.coords.latitude, loc.coords.longitude);
            }
        })();
    }, []);

    const reverseGeocode = async (lat: number, lon: number) => {
        setLoadingAddress(true);
        try {
            const result = await Location.reverseGeocodeAsync({
                latitude: lat,
                longitude: lon,
            });
            if (result.length > 0) {
                const area = result[0];
                const address = `${area.name || ''} ${area.street || ''}, ${area.district || ''}, ${area.city || ''}, ${area.postalCode || ''}`.trim().replace(/^,|,$/g, '').replace(/, ,/g, ',');
                setCurrentAddress(address || 'Location Found');
            }
        } catch (e) {
            console.warn(e);
        } finally {
            setLoadingAddress(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setSearching(true);
        try {
            const result = await Location.geocodeAsync(searchQuery);
            if (result.length > 0) {
                const { latitude, longitude } = result[0];
                const newRegion = { ...region, latitude, longitude };
                setRegion(newRegion);
                reverseGeocode(latitude, longitude);
            }
        } catch (e) {
            console.warn(e);
        } finally {
            setSearching(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Map */}
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newReg) => {
                    setRegion(newReg);
                    reverseGeocode(newReg.latitude, newReg.longitude);
                }}
            />

            {/* Marker in the center (simulated by a floating icon) */}
            <View style={styles.markerFixed} pointerEvents="none">
                <Ionicons name="location" size={40} color="#3B82F6" />
                <View style={styles.markerShadow} />
            </View>

            {/* Header / Search */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Search for your area..."
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleSearch} disabled={searching}>
                        {searching ? (
                            <ActivityIndicator size="small" color="#3B82F6" />
                        ) : (
                            <Ionicons name="search" size={20} color="#64748B" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <Animated.View entering={FadeInDown} style={styles.footer}>
                <View style={styles.addressContainer}>
                    <View style={styles.addressIcon}>
                        <Ionicons name="location-outline" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.addressTextContainer}>
                        <Text style={styles.addressLabel}>SELECT ADDRESS</Text>
                        <Text style={styles.addressText} numberOfLines={2}>
                            {loadingAddress ? 'Fetching details...' : currentAddress}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={[styles.confirmBtn, loadingAddress && { opacity: 0.7 }]}
                    onPress={() => onSelectAddress(currentAddress)}
                    disabled={loadingAddress}
                >
                    <Text style={styles.confirmBtnText}>Confirm Location</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    map: {
        width: width,
        height: height * 0.75, // Occupy most of the screen
    },
    header: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        zIndex: 10,
    },
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 16,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#1E293B',
    },
    markerFixed: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerShadow: {
        width: 10,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: -2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    addressIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    addressLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
    },
    addressText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginTop: 2,
    },
    confirmBtn: {
        backgroundColor: '#1E293B',
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
});
