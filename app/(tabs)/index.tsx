import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuthStore } from '../../hooks/useAuthStore';


import { AllServicesModal } from '../../components/AllServicesModal';
import { BestOffers } from '../../components/BestOffers';
import { BookingModal } from '../../components/BookingModal';
import { HomeServicesGrid } from '../../components/HomeServicesGrid';
import { LocationModal } from '../../components/LocationModal';
import { RecommendedServices } from '../../components/RecommendedServices';
import { SubServiceModal } from '../../components/SubServiceModal';


import { OFFERS, SERVICES, SUB_SERVICES } from '../../constants/ServicesData';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Home - 123, Street Name...');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const { isLoggedIn, user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [directBookingService, setDirectBookingService] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // refresh network request
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
      setRefreshing(false);
    }, 1500);
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setLoadingLocation(true);
          let location;
          try {
            location = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Lowest,
            });
          } catch (innerError) {
            // for emulators/slow GPS
            location = await Location.getLastKnownPositionAsync();
          }

          if (location) {
            const reverseGeocode = await Location.reverseGeocodeAsync({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });

            if (reverseGeocode.length > 0) {
              const area = reverseGeocode[0];
              const addressString = `${area.name || ''} ${area.district || ''}, ${area.city || ''}`.trim().replace(/^,|,$/g, '').replace(/, ,/g, ',');
              setCurrentLocation(addressString || 'Current Location');
            }
          }
        }
      } catch (error) {
        console.warn('Error fetching location on mount:', error);
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  const handleServicePress = (serviceName: string) => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }
    setActiveService(serviceName);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      const results: any[] = [];
      const query = text.toLowerCase();

      // Search in main services
      SERVICES.forEach(service => {
        if (service.name.toLowerCase().includes(query)) {
          results.push({ ...service, isSubService: false, parentName: service.name });
        }
      });

      // Search in sub-services
      Object.keys(SUB_SERVICES).forEach(parentName => {
        SUB_SERVICES[parentName].forEach(sub => {
          if (sub.name.toLowerCase().includes(query)) {
            results.push({ ...sub, isSubService: true, parentName });
          }
        });
      });

      setSearchResults(results.slice(0, 10)); 
    } else {
      setSearchResults([]);
    }
  };

  const handleBookingPress = (service: any) => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }
    setDirectBookingService(service);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Background Decorative Elements */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={['#F8FAFC', '#F1F5F9', '#FFFFFF']}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.bgCircle, { top: -50, right: -50, backgroundColor: '#E0F2FE' }]} />
        <View style={[styles.bgCircle, { bottom: height * 0.4, left: -60, backgroundColor: '#F5F3FF', width: 220, height: 220 }]} />
        <View style={[styles.bgCircle, { bottom: -80, right: -40, backgroundColor: '#FFF1F2', width: 280, height: 280 }]} />
      </View>


      <SafeAreaView style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/menu')}
          >
            <Ionicons name="menu-outline" size={28} color="#1E293B" />
          </TouchableOpacity>

          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>
              {isLoggedIn ? `HELLO, ${user?.name?.toUpperCase()}` : 'CURRENT LOCATION'}
            </Text>
            <TouchableOpacity
              style={styles.locationSelector}
              onPress={() => setShowLocationModal(true)}
            >
              <Text style={styles.locationText} numberOfLines={1}>
                {loadingLocation ? 'Detecting...' : currentLocation}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#475569" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/auth')}
          >
            <View style={styles.profileContent}>
              {!isLoggedIn && <Text style={styles.loginHint}>Log In</Text>}
              <Ionicons name="person-circle-outline" size={32} color="#1E293B" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0EA5E9"
              colors={['#0EA5E9']}
              progressBackgroundColor="#FFFFFF"
            />
          }
        >

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#94A3B8" />
              <TextInput
                placeholder="Search for 'AC Repair'"
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch('')}>
                  <Ionicons name="close-circle" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* Search Results Dropdown */}
            {searchQuery.trim().length > 0 && (
              <View style={styles.searchResultsContainer}>
                {searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                    <TouchableOpacity
                      key={`${item.id}-${index}`}
                      style={styles.searchResultItem}
                      onPress={() => handleServicePress(item.parentName)}
                    >
                      <View style={[styles.searchResultIcon, { backgroundColor: item.color }]}>
                        <MaterialCommunityIcons name={item.icon as any} size={22} color={item.iconColor} />
                      </View>
                      <View style={styles.searchResultTextContainer}>
                        <Text style={styles.searchResultName}>{item.name}</Text>
                        {item.isSubService && (
                          <Text style={styles.searchResultCategory}>Category: {item.parentName}</Text>
                        )}
                      </View>
                      <Ionicons name="arrow-forward-circle-outline" size={20} color="#CBD5E1" />
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.noResultItem}>
                    <Ionicons name="search-outline" size={24} color="#94A3B8" />
                    <Text style={styles.noResultText}>No services found for "{searchQuery}"</Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Home Services Section */}
          <HomeServicesGrid
            services={SERVICES}
            onSeeAll={() => setShowAllServices(true)}
            onServicePress={handleServicePress}
          />

          {/* Best Offers Section */}
          <View style={{ position: 'relative', zIndex: 100 }}>
            <BestOffers
              offers={OFFERS}
              onViewAll={() => {
                console.log('Navigating to exclusive offers screen');
                router.push('/exclusive-offers');
              }}
              onClaim={(offer) => handleBookingPress(offer)}
            />
          </View>

          {/* Recommended Section */}
          <RecommendedServices
            onBookNow={(service) => handleBookingPress(service)}
            refreshKey={refreshKey}
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Modals */}
      <AllServicesModal
        visible={showAllServices}
        onClose={() => setShowAllServices(false)}
        services={SERVICES}
        onServicePress={(name) => {
          setShowAllServices(false);
          handleServicePress(name);
        }}
      />

      <SubServiceModal
        visible={activeService !== null}
        onClose={() => setActiveService(null)}
        title={activeService || ''}
        data={activeService ? SUB_SERVICES[activeService] : []}
      />

      <LocationModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
      />

      <BookingModal
        visible={directBookingService !== null}
        onClose={() => setDirectBookingService(null)}
        subService={directBookingService}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bgCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  headerButton: {
    padding: 4,
  },
  locationContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  locationTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 2,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    maxWidth: width * 0.4,
  },
  profileButton: {
    padding: 2,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginHint: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0EA5E9',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    zIndex: 1000,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  searchResultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    maxHeight: 400,
    overflow: 'hidden',
    zIndex: 1000,
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  searchResultIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchResultTextContainer: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  searchResultCategory: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  noResultItem: {
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  noResultText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
});
