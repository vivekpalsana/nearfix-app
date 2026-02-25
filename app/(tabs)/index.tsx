import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Components
import { AllServicesModal } from '../../components/AllServicesModal';
import { BestOffers } from '../../components/BestOffers';
import { HomeServicesGrid } from '../../components/HomeServicesGrid';
import { LocationModal } from '../../components/LocationModal';
import { RecommendedServices } from '../../components/RecommendedServices';
import { SubServiceModal } from '../../components/SubServiceModal';

// Constants
import { OFFERS, SERVICES, SUB_SERVICES } from '../../constants/ServicesData';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Home - 123, Street Name...');

  const handleServicePress = (serviceName: string) => {
    setActiveService(serviceName);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Background Decorative Elements */}
      <View style={StyleSheet.absoluteFill}>
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
            <Text style={styles.locationTitle}>CURRENT LOCATION</Text>
            <TouchableOpacity
              style={styles.locationSelector}
              onPress={() => setShowLocationModal(true)}
            >
              <Text style={styles.locationText} numberOfLines={1}>
                {currentLocation}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#475569" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/auth')}
          >
            <Ionicons name="person-circle-outline" size={32} color="#1E293B" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#94A3B8" />
              <TextInput
                placeholder="Search for 'AC Repair'"
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>
          </View>

          {/* Home Services Section */}
          <HomeServicesGrid
            services={SERVICES}
            onSeeAll={() => setShowAllServices(true)}
            onServicePress={handleServicePress}
          />

          {/* Best Offers Section */}
          <BestOffers offers={OFFERS} />

          {/* Recommended Section */}
          <RecommendedServices />

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
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
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
});
