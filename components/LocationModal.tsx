import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const SAVED_ADDRESSES = [
    { id: 1, type: 'Home', address: 'at. jambarvala, ta. babra, dist. amreli,365435', icon: 'home-outline' },
    { id: 2, type: 'Work', address: '505, blueberry, nr. gurukul circle, nikol, ahmedabad, 382350', icon: 'briefcase-outline' },
    { id: 3, type: 'Other', address: 'shree saurastra patel samaj nikol-naroda, ahmedabad, 382350', icon: 'location-outline' },
];

interface LocationModalProps {
    visible: boolean;
    onClose: () => void;
    currentLocation: string;
    onSelectLocation: (address: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
    visible,
    onClose,
    currentLocation,
    onSelectLocation,
}) => {
    const [loading, setLoading] = useState(false);

    const handleGetCurrentLocation = async () => {
        setLoading(true);
        try {
            // Check if location services are enabled
            let enabled = await Location.hasServicesEnabledAsync();

            // On Android, try to prompt user to enable location services
            if (!enabled && Platform.OS === 'android') {
                try {
                    await Location.enableNetworkProviderAsync();
                    enabled = await Location.hasServicesEnabledAsync();
                } catch (e) {
                    // Ignore error from enableNetworkProviderAsync
                }
            }

            if (!enabled) {
                Alert.alert(
                    'Location Services Disabled',
                    'Please enable location services in your device settings to use this feature.',
                    [{ text: 'OK' }]
                );
                setLoading(false);
                return;
            }

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Allow NearFix to access your location to find services near you.');
                setLoading(false);
                return;
            }

            let location;
            try {
                // Try current position with Balanced accuracy
                location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
            } catch (innerError) {
                // Fallback to last known position if current fails (common on emulators)
                location = await Location.getLastKnownPositionAsync();
                if (!location) {
                    // Final attempt with lower accuracy
                    try {
                        location = await Location.getCurrentPositionAsync({
                            accuracy: Location.Accuracy.Lowest,
                        });
                    } catch (finalError) {
                        throw innerError; // Rethrow original error if everything fails
                    }
                }
            }

            if (!location) {
                throw new Error('Current location is unavailable');
            }

            // Reverse Geocoding
            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (reverseGeocode.length > 0) {
                const area = reverseGeocode[0];
                const addressString = `${area.name || ''} ${area.district || ''}, ${area.city || ''}, ${area.region || ''}`.trim().replace(/^,|,$/g, '').replace(/, ,/g, ',');
                onSelectLocation(addressString || 'Current Location Found');
                onClose();
            } else {
                onSelectLocation(`Lat: ${location.coords.latitude.toFixed(4)}, Lon: ${location.coords.longitude.toFixed(4)}`);
                onClose();
            }
        } catch (error: any) {
            // We use console.warn instead of console.error to avoid the LogBox error screen in development
            console.warn('Location Fetch Error:', error.message);

            if (error.message && (error.message.includes('unsatisfied device settings') || error.message.includes('unavailable'))) {
                Alert.alert(
                    'Location Unavailable',
                    'Unable to retrieve your current location. Please ensure your GPS is enabled and you have a network connection.',
                    [{ text: 'OK' }]
                );
            } else {
                Alert.alert(
                    'Location Error',
                    'Something went wrong while fetching your location. Please try manually selecting your location.',
                    [{ text: 'OK' }]
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.dismissArea}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <Animated.View
                    entering={FadeInUp.duration(400)}
                    style={styles.modalContainer}
                >
                    {/* Handle */}
                    <View style={styles.handle} />

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Location</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#64748B" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Section */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <Ionicons name="search-outline" size={20} color="#94A3B8" />
                            <TextInput
                                placeholder="Search for area, street..."
                                placeholderTextColor="#94A3B8"
                                style={styles.searchInput}
                            />
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Current Location */}
                        <TouchableOpacity
                            style={styles.currentLocationBtn}
                            onPress={handleGetCurrentLocation}
                            disabled={loading}
                        >
                            <View style={styles.iconWrapperFocus}>
                                {loading ? (
                                    <ActivityIndicator size="small" color="#3B82F6" />
                                ) : (
                                    <Ionicons name="locate" size={20} color="#3B82F6" />
                                )}
                            </View>
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationTypeFocus}>
                                    {loading ? 'Fetching Location...' : 'Use Current Location'}
                                </Text>
                                <Text style={styles.locationAddress} numberOfLines={1}>
                                    {loading ? 'Please wait while we locate you' : 'Using GPS for precise location'}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        {/* Saved Addresses */}
                        <Text style={styles.sectionLabel}>Saved Addresses</Text>
                        {SAVED_ADDRESSES.map((item, index) => (
                            <Animated.View
                                key={item.id}
                                entering={FadeInDown.delay(100 + index * 50)}
                            >
                                <TouchableOpacity
                                    style={styles.addressItem}
                                    onPress={() => {
                                        onSelectLocation(item.address);
                                        onClose();
                                    }}
                                >
                                    <View style={styles.iconWrapper}>
                                        <Ionicons name={item.icon as any} size={20} color="#64748B" />
                                    </View>
                                    <View style={styles.locationInfo}>
                                        <Text style={styles.locationType}>{item.type}</Text>
                                        <Text style={styles.locationAddress} numberOfLines={1}>{item.address}</Text>
                                    </View>
                                    {currentLocation === item.address && (
                                        <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.addAddressBtn}>
                            <Ionicons name="add" size={20} color="#FFF" />
                            <Text style={styles.addAddressText}>Add New Address</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        justifyContent: 'flex-start',
    },
    dismissArea: {
        flex: 1,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingTop: 12,
        maxHeight: height * 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    closeButton: {
        padding: 4,
    },
    searchContainer: {
        paddingHorizontal: 24,
        marginVertical: 15,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#1E293B',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    currentLocationBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 10,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94A3B8',
        marginVertical: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    iconWrapperFocus: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    locationInfo: {
        flex: 1,
        marginLeft: 16,
    },
    locationType: {
        fontSize: 16,
        fontWeight: '700',
        color: '#334155',
    },
    locationTypeFocus: {
        fontSize: 16,
        fontWeight: '700',
        color: '#3B82F6',
    },
    locationAddress: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 2,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    addAddressBtn: {
        backgroundColor: '#1E293B',
        flexDirection: 'row',
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    addAddressText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
