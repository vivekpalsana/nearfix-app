import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SERVICES = [
  { id: 8, name: 'Appliances', icon: 'washing-machine', color: '#EFF6FF', iconColor: '#3B82F6', type: 'material' },
  { id: 1, name: 'AC Service', icon: 'snowflake', color: '#E0F2FE', iconColor: '#38BDF8', type: 'material' },
  { id: 2, name: 'Cleaning', icon: 'broom', color: '#F5F3FF', iconColor: '#8B5CF6', type: 'material' },
  { id: 3, name: 'Plumbing', icon: 'water-pump', color: '#ECFDF5', iconColor: '#10B981', type: 'material' },
  { id: 4, name: 'Electrician', icon: 'lightbulb-on', color: '#FFFBEB', iconColor: '#F59E0B', type: 'material' },
  { id: 5, name: 'Painting', icon: 'palette', color: '#FFF1F2', iconColor: '#FB7185', type: 'material' },
  { id: 6, name: 'Carpenter', icon: 'hammer', color: '#F8FAFC', iconColor: '#475569', type: 'material' },
  { id: 7, name: 'Home Repair', icon: 'tools', color: '#FFF7ED', iconColor: '#FB923C', type: 'material' },
  { id: 9, name: 'Automotive', icon: 'car-wrench', color: '#F8FAFC', iconColor: '#64748B', type: 'material' },
  { id: 10, name: 'Beauty', icon: 'face-woman', color: '#FDF2F8', iconColor: '#EC4899', type: 'material' },
  { id: 11, name: 'Education', icon: 'school', color: '#F0FDF4', iconColor: '#22C55E', type: 'material' },
  { id: 12, name: 'IT Services', icon: 'laptop', color: '#F5F3FF', iconColor: '#8B5CF6', type: 'material' },
  { id: 13, name: 'Events', icon: 'party-popper', color: '#FFF1F2', iconColor: '#F43F5E', type: 'material' },
  { id: 14, name: 'Moving', icon: 'truck-delivery', color: '#FEFCE8', iconColor: '#EAB308', type: 'material' },
  { id: 15, name: 'Emergency', icon: 'alert-decagram', color: '#FEF2F2', iconColor: '#EF4444', type: 'material' },
];

const OFFERS = [
  { id: 1, color: '#DBEAFE', title: '50% OFF', subtitle: 'On your first AC service' },
  { id: 2, color: '#FCE7F3', title: 'Flat ₹200 OFF', subtitle: 'On full house cleaning' },
  { id: 3, color: '#FEF3C7', title: 'Free Inspection', subtitle: 'On all plumbing works' },
];

export default function HomeScreen() {
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
          <TouchableOpacity style={styles.locationSelector}>
            <Text style={styles.locationText} numberOfLines={1}>
              Home - 123, Street Name...
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

        {/* Home Services Section - 2 Row Horizontal Minimalist */}
        <View style={styles.sectionNoPadding}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Home Services</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => setShowAllServices(true)}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#0EA5E9" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.minimalRowsContainer}>
              {/* Row 1: First 3 Services */}
              <View style={styles.minimalServiceRow}>
                {SERVICES.slice(0, 3).map((service) => (
                  <TouchableOpacity key={service.id} style={styles.minimalServiceItemHorizontal}>
                    <View style={[styles.minimalIconWrapper, { backgroundColor: service.color }]}>
                      <MaterialCommunityIcons
                        name={service.icon as any}
                        size={32}
                        color={service.iconColor}
                      />
                    </View>
                    <Text style={styles.minimalServiceText}>{service.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Row 2: Next 3 Services */}
              <View style={styles.minimalServiceRow}>
                {SERVICES.slice(3, 6).map((service) => (
                  <TouchableOpacity key={service.id} style={styles.minimalServiceItemHorizontal}>
                    <View style={[styles.minimalIconWrapper, { backgroundColor: service.color }]}>
                      <MaterialCommunityIcons
                        name={service.icon as any}
                        size={32}
                        color={service.iconColor}
                      />
                    </View>
                    <Text style={styles.minimalServiceText}>{service.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* All Services Modal */}
        <Modal
          visible={showAllServices}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAllServices(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>All Services</Text>
                <TouchableOpacity
                  onPress={() => setShowAllServices(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#1E293B" />
                </TouchableOpacity>
              </View>

              <ScrollView
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.servicesGrid}>
                  {SERVICES.map((service) => (
                    <TouchableOpacity
                      key={service.id}
                      style={styles.gridServiceItem}
                    >
                      <View style={[styles.gridIconWrapper, { backgroundColor: service.color }]}>
                        <MaterialCommunityIcons
                          name={service.icon as any}
                          size={32}
                          color={service.iconColor}
                        />
                      </View>
                      <Text style={styles.gridServiceText}>{service.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Best Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Offers</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersContainer}
          >
            {OFFERS.map((offer) => (
              <TouchableOpacity key={offer.id} style={[styles.offerCard, { backgroundColor: offer.color }]}>
                <View style={styles.offerTextContainer}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                </View>
                <View style={styles.offerBadge}>
                  <Text style={styles.offerBadgeText}>Claim Now</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity style={styles.recommendedCard}>
            <View style={styles.recommendedImageContainer}>
              <View style={styles.placeholderImage}>
                <MaterialCommunityIcons name="vacuum" size={40} color="#8B5CF6" />
              </View>
            </View>
            <View style={styles.recommendedInfo}>
              <Text style={styles.recommendedTitle}>Intense Cleaning</Text>
              <Text style={styles.recommendedSubtitle}>Bathroom & Kitchen Cleaning</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingText}>4.8 (12k reviews)</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20, // Added padding to the shared header
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 15,
    color: '#0EA5E9',
    fontWeight: '800',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 2,
  },
  sectionNoPadding: {
    marginTop: 25,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  minimalRowsContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  minimalServiceRow: {
    flexDirection: 'row',
    gap: 20,
  },
  minimalServiceItemHorizontal: {
    width: (width - 40 - 40) / 3, // Fits exactly 3 items
    alignItems: 'center',
  },
  minimalIconWrapper: {
    width: 75,
    height: 75,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  minimalServiceText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: height * 0.8,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  modalScrollContent: {
    padding: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  gridServiceItem: {
    width: (width - 48 - 32) / 3, // 3 column grid
    alignItems: 'center',
    marginBottom: 20,
  },
  gridIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  gridServiceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
  offersContainer: {
    paddingRight: 20,
  },
  offerCard: {
    width: width * 0.75,
    height: 120,
    borderRadius: 24,
    marginRight: 15,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerTextContainer: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
  },
  offerSubtitle: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    marginTop: 4,
  },
  offerBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  offerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E293B',
  },
  recommendedCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  recommendedImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  recommendedSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
});
