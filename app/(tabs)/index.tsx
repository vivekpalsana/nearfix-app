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

const APPLIANCE_SUB_SERVICES = [
  { id: 101, name: 'TV Repair', icon: 'television-classic', color: '#FDF2F8', iconColor: '#DB2777' },
  { id: 102, name: 'Microwave', icon: 'microwave', color: '#F0F9FF', iconColor: '#0284C7' },
  { id: 103, name: 'RO Service', icon: 'water-filter', color: '#ECFDF5', iconColor: '#059669' },
  { id: 104, name: 'Geyser', icon: 'hot-tub', color: '#FFF7ED', iconColor: '#EA580C' },
];

const AC_SUB_SERVICES = [
  { id: 201, name: 'Gas Refill', icon: 'gas-cylinder', color: '#F0FDF4', iconColor: '#22C55E' },
  { id: 202, name: 'Deep Clean', icon: 'air-filter', color: '#EFF6FF', iconColor: '#3B82F6' },
  { id: 203, name: 'Installation', icon: 'tools', color: '#FFFBEB', iconColor: '#F59E0B' },
  { id: 204, name: 'Repair & Fix', icon: 'wrench-outline', color: '#FFF1F2', iconColor: '#F43F5E' },
];

const CLEANING_SUB_SERVICES = [
  { id: 301, name: 'Full House', icon: 'home-clean', color: '#F5F3FF', iconColor: '#8B5CF6' },
  { id: 302, name: 'Bathroom', icon: 'shower', color: '#ECFDF5', iconColor: '#10B981' },
  { id: 303, name: 'Kitchen', icon: 'chef-hat', color: '#FFFBEB', iconColor: '#F59E0B' },
  { id: 304, name: 'Sofa/Carpet', icon: 'sofa', color: '#EFF6FF', iconColor: '#3B82F6' },
  { id: 305, name: 'Balcony', icon: 'flower-outline', color: '#F0FDF4', iconColor: '#22C55E' },
  { id: 306, name: 'Windows', icon: 'window-maximize', color: '#FEF2F2', iconColor: '#EF4444' },
];

const PLUMBING_SUB_SERVICES = [
  { id: 401, name: 'Tap & Mixer', icon: 'water-pump', color: '#E0F2FE', iconColor: '#0EA5E9' },
  { id: 402, name: 'Pipe Leakage', icon: 'pipe-leak', color: '#FEF2F2', iconColor: '#EF4444' },
  { id: 403, name: 'Toilet/Bath', icon: 'toilet', color: '#F8FAFC', iconColor: '#64748B' },
  { id: 404, name: 'Water Tank', icon: 'tank', color: '#ECFDF5', iconColor: '#10B981' },
  { id: 405, name: 'Sanitary', icon: 'wrench-outline', color: '#FFF7ED', iconColor: '#EA580C' },
];

const ELECTRICIAN_SUB_SERVICES = [
  { id: 501, name: 'Fan Repair', icon: 'fan', color: '#FFFBEB', iconColor: '#F59E0B' },
  { id: 502, name: 'Switch/Socket', icon: 'power-socket-eu', color: '#EFF6FF', iconColor: '#3B82F6' },
  { id: 503, name: 'Wiring/MCB', icon: 'expansion-card', color: '#FEF2F2', iconColor: '#EF4444' },
  { id: 504, name: 'Lights', icon: 'lightbulb-outline', color: '#FDF2F8', iconColor: '#DB2777' },
];

const PAINTING_SUB_SERVICES = [
  { id: 601, name: 'Full Home', icon: 'home-modern', color: '#F5F3FF', iconColor: '#8B5CF6' },
  { id: 602, name: 'Interior', icon: 'format-paint', color: '#ECFDF5', iconColor: '#10B981' },
  { id: 603, name: 'Texture', icon: 'texture-box', color: '#FFF1F2', iconColor: '#FB7185' },
  { id: 604, name: 'Wood Polish', icon: 'brush', color: '#FEFCE8', iconColor: '#EAB308' },
];

const CARPENTER_SUB_SERVICES = [
  { id: 701, name: 'Furniture Repair', icon: 'hammer-wrench', color: '#F8FAFC', iconColor: '#475569' },
  { id: 702, name: 'Door/Window', icon: 'door-open', color: '#FFF7ED', iconColor: '#EA580C' },
  { id: 703, name: 'Lock/Hinge', icon: 'lock-cog', color: '#F0F9FF', iconColor: '#0369A1' },
  { id: 704, name: 'New Assembly', icon: 'wardrobe-outline', color: '#F5F3FF', iconColor: '#7C3AED' },
];

const HOME_REPAIR_SUB_SERVICES = [
  { id: 801, name: 'Tiles & Stone', icon: 'wall', color: '#F0F9FF', iconColor: '#0284C7' },
  { id: 802, name: 'POP & Gypsum', icon: 'format-paint', color: '#FDF2F8', iconColor: '#DB2777' },
  { id: 803, name: 'Waterproofing', icon: 'water-off', color: '#ECFDF5', iconColor: '#059669' },
  { id: 804, name: 'Drill & Hang', icon: 'drill', color: '#FFFBEB', iconColor: '#D97706' },
];

const AUTOMOTIVE_SUB_SERVICES = [
  { id: 901, name: 'Car Wash', icon: 'car-wash', color: '#E0F2FE', iconColor: '#0EA5E9' },
  { id: 902, name: 'Full Service', icon: 'car-cog', color: '#F8FAFC', iconColor: '#475569' },
  { id: 903, name: 'Battery', icon: 'battery-charging-100', color: '#FEF2F2', iconColor: '#EF4444' },
  { id: 904, name: 'Tires/Wheels', icon: 'tire', color: '#F0FDF4', iconColor: '#22C55E' },
];

const BEAUTY_SUB_SERVICES = [
  { id: 1001, name: 'Salon at Home', icon: 'face-woman-shimmer', color: '#FDF2F8', iconColor: '#DB2777' },
  { id: 1002, name: 'Facial/Cleanup', icon: 'spa', color: '#ECFDF5', iconColor: '#059669' },
  { id: 1003, name: 'Mani-Pedi', icon: 'hand-wave', color: '#FFFBEB', iconColor: '#D97706' },
  { id: 1004, name: 'Hair Styling', icon: 'content-cut', color: '#F5F3FF', iconColor: '#7C3AED' },
];

const EDUCATION_SUB_SERVICES = [
  { id: 1101, name: 'Home Tutors', icon: 'book-open-variant', color: '#EEF2FF', iconColor: '#4F46E5' },
  { id: 1102, name: 'Languages', icon: 'translate', color: '#F0FDF4', iconColor: '#16A34A' },
  { id: 1103, name: 'Coding/STEM', icon: 'code-braces', color: '#FAFAF9', iconColor: '#44403C' },
  { id: 1104, name: 'Music/Arts', icon: 'music-clef-treble', color: '#FFF1F2', iconColor: '#E11D48' },
];

const IT_SUB_SERVICES = [
  { id: 1201, name: 'Laptop Repair', icon: 'laptop-off', color: '#F0F9FF', iconColor: '#0369A1' },
  { id: 1202, name: 'Software', icon: 'microsoft-windows', color: '#EEF2FF', iconColor: '#4F46E5' },
  { id: 1203, name: 'WiFi/Network', icon: 'wifi-cog', color: '#F0FDF4', iconColor: '#16A34A' },
  { id: 1204, name: 'Data Recovery', icon: 'database-search', color: '#FFF7ED', iconColor: '#EA580C' },
];

const EVENT_SUB_SERVICES = [
  { id: 1301, name: 'Decoration', icon: 'balloon', color: '#FDF2F8', iconColor: '#DB2777' },
  { id: 1302, name: 'Photography', icon: 'camera-iris', color: '#F8FAFC', iconColor: '#475569' },
  { id: 1303, name: 'Catering', icon: 'silverware-fork-knife', color: '#FFFBEB', iconColor: '#D97706' },
  { id: 1304, name: 'DJ & Sound', icon: 'speaker-group', color: '#F5F3FF', iconColor: '#7C3AED' },
];

const MOVING_SUB_SERVICES = [
  { id: 1401, name: 'Packers & Movers', icon: 'truck-check', color: '#EEF2FF', iconColor: '#4F46E5' },
  { id: 1402, name: 'Furniture Shift', icon: 'sofa-single-outline', color: '#FDF2F8', iconColor: '#DB2777' },
  { id: 1403, name: 'Bike Transport', icon: 'motorbike', color: '#F0FDF4', iconColor: '#16A34A' },
  { id: 1404, name: 'Rent a Tempo', icon: 'truck-fast', color: '#FFFBEB', iconColor: '#D97706' },
];

const EMERGENCY_SUB_SERVICES = [
  { id: 1501, name: 'Locksmith', icon: 'key-alert', color: '#FEF2F2', iconColor: '#EF4444' },
  { id: 1502, name: 'Spark/Fire', icon: 'fire-circle', color: '#FFF1F2', iconColor: '#F43F5E' },
  { id: 1503, name: 'Major Leakage', icon: 'water-alert', color: '#EFF6FF', iconColor: '#3B82F6' },
  { id: 1504, name: 'SOS Help', icon: 'shield-alert', color: '#F8FAFC', iconColor: '#1E293B' },
];

const OFFERS = [
  { id: 1, color: '#DBEAFE', title: '50% OFF', subtitle: 'On your first AC service' },
  { id: 2, color: '#FCE7F3', title: 'Flat ₹200 OFF', subtitle: 'On full house cleaning' },
  { id: 3, color: '#FEF3C7', title: 'Free Inspection', subtitle: 'On all plumbing works' },
];

export default function HomeScreen() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showApplianceDetails, setShowApplianceDetails] = useState(false);
  const [showACDetails, setShowACDetails] = useState(false);
  const [showCleaningDetails, setShowCleaningDetails] = useState(false);
  const [showPlumbingDetails, setShowPlumbingDetails] = useState(false);
  const [showElectricianDetails, setShowElectricianDetails] = useState(false);
  const [showPaintingDetails, setShowPaintingDetails] = useState(false);
  const [showCarpenterDetails, setShowCarpenterDetails] = useState(false);
  const [showHomeRepairDetails, setShowHomeRepairDetails] = useState(false);
  const [showAutomotiveDetails, setShowAutomotiveDetails] = useState(false);
  const [showBeautyDetails, setShowBeautyDetails] = useState(false);
  const [showEducationDetails, setShowEducationDetails] = useState(false);
  const [showITDetails, setShowITDetails] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showMovingDetails, setShowMovingDetails] = useState(false);
  const [showEmergencyDetails, setShowEmergencyDetails] = useState(false);

  const handleServicePress = (serviceName: string) => {
    if (serviceName === 'Appliances') {
      setShowApplianceDetails(true);
    } else if (serviceName === 'AC Service') {
      setShowACDetails(true);
    } else if (serviceName === 'Cleaning') {
      setShowCleaningDetails(true);
    } else if (serviceName === 'Plumbing') {
      setShowPlumbingDetails(true);
    } else if (serviceName === 'Electrician') {
      setShowElectricianDetails(true);
    } else if (serviceName === 'Painting') {
      setShowPaintingDetails(true);
    } else if (serviceName === 'Carpenter') {
      setShowCarpenterDetails(true);
    } else if (serviceName === 'Home Repair') {
      setShowHomeRepairDetails(true);
    } else if (serviceName === 'Automotive') {
      setShowAutomotiveDetails(true);
    } else if (serviceName === 'Beauty') {
      setShowBeautyDetails(true);
    } else if (serviceName === 'Education') {
      setShowEducationDetails(true);
    } else if (serviceName === 'IT Services') {
      setShowITDetails(true);
    } else if (serviceName === 'Events') {
      setShowEventDetails(true);
    } else if (serviceName === 'Moving') {
      setShowMovingDetails(true);
    } else if (serviceName === 'Emergency') {
      setShowEmergencyDetails(true);
    }
  };

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
                  <TouchableOpacity
                    key={service.id}
                    style={styles.minimalServiceItemHorizontal}
                    onPress={() => handleServicePress(service.name)}
                  >
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
                  <TouchableOpacity
                    key={service.id}
                    style={styles.minimalServiceItemHorizontal}
                    onPress={() => handleServicePress(service.name)}
                  >
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
                      onPress={() => {
                        setShowAllServices(false);
                        handleServicePress(service.name);
                      }}
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

        {/* Appliance Sub-Services Modal */}
        <Modal
          visible={showApplianceDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowApplianceDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Appliance Services</Text>
                <TouchableOpacity
                  onPress={() => setShowApplianceDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {APPLIANCE_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* AC Sub-Services Modal */}
        <Modal
          visible={showACDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowACDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>AC Service Expert</Text>
                <TouchableOpacity
                  onPress={() => setShowACDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {AC_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Cleaning Sub-Services Modal */}
        <Modal
          visible={showCleaningDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowCleaningDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Cleaning Services</Text>
                <TouchableOpacity
                  onPress={() => setShowCleaningDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {CLEANING_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Plumbing Sub-Services Modal */}
        <Modal
          visible={showPlumbingDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowPlumbingDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Plumbing Expert</Text>
                <TouchableOpacity
                  onPress={() => setShowPlumbingDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {PLUMBING_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Electrician Sub-Services Modal */}
        <Modal
          visible={showElectricianDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowElectricianDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Electrician Services</Text>
                <TouchableOpacity
                  onPress={() => setShowElectricianDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {ELECTRICIAN_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Painting Sub-Services Modal */}
        <Modal
          visible={showPaintingDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowPaintingDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Painting Services</Text>
                <TouchableOpacity
                  onPress={() => setShowPaintingDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {PAINTING_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Carpenter Sub-Services Modal */}
        <Modal
          visible={showCarpenterDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowCarpenterDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Carpenter Expert</Text>
                <TouchableOpacity
                  onPress={() => setShowCarpenterDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {CARPENTER_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Home Repair Sub-Services Modal */}
        <Modal
          visible={showHomeRepairDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowHomeRepairDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Home Repair Expert</Text>
                <TouchableOpacity
                  onPress={() => setShowHomeRepairDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {HOME_REPAIR_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Automotive Sub-Services Modal */}
        <Modal
          visible={showAutomotiveDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowAutomotiveDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Automotive Experts</Text>
                <TouchableOpacity
                  onPress={() => setShowAutomotiveDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {AUTOMOTIVE_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Beauty Sub-Services Modal */}
        <Modal
          visible={showBeautyDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowBeautyDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Beauty & Wellness</Text>
                <TouchableOpacity
                  onPress={() => setShowBeautyDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {BEAUTY_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Education Sub-Services Modal */}
        <Modal
          visible={showEducationDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowEducationDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Education & Learning</Text>
                <TouchableOpacity
                  onPress={() => setShowEducationDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {EDUCATION_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* IT Sub-Services Modal */}
        <Modal
          visible={showITDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowITDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>IT & Digital Experts</Text>
                <TouchableOpacity
                  onPress={() => setShowITDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {IT_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Event Sub-Services Modal */}
        <Modal
          visible={showEventDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowEventDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Event & Party Services</Text>
                <TouchableOpacity
                  onPress={() => setShowEventDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {EVENT_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Moving Sub-Services Modal */}
        <Modal
          visible={showMovingDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowMovingDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Relocation Experts</Text>
                <TouchableOpacity
                  onPress={() => setShowMovingDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {MOVING_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* Emergency Sub-Services Modal */}
        <Modal
          visible={showEmergencyDetails}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowEmergencyDetails(false)}
        >
          <View style={styles.subModalOverlay}>
            <View style={styles.subModalContent}>
              <View style={styles.subModalHeader}>
                <View style={styles.titleLine} />
                <Text style={styles.subModalTitle}>Emergency Help 24/7</Text>
                <TouchableOpacity
                  onPress={() => setShowEmergencyDetails(false)}
                  style={styles.subModalClose}
                >
                  <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.subServicesGrid}>
                {EMERGENCY_SUB_SERVICES.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.subServiceItem}>
                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                    </View>
                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                    <View style={styles.bookNowSmall}>
                      <Text style={styles.bookNowText}>Book</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
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
  subModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    width: '100%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  subModalHeader: {
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
  },
  titleLine: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginBottom: 12,
  },
  subModalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  subModalClose: {
    position: 'absolute',
    right: -10,
    top: -5,
  },
  subServicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  subServiceItem: {
    width: (width - 40 - 48 - 12) / 2,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  subIconBadge: {
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  subServiceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  bookNowSmall: {
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
