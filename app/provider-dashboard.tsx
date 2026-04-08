import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuthStore } from '../hooks/useAuthStore';

const { width } = Dimensions.get('window');

// Mock Data for Bookings
const MOCK_BOOKINGS = [
    {
        id: '1',
        service: 'AC Deep Cleaning',
        customer: 'John Doe',
        date: 'Oct 24, 2023',
        time: '10:00 AM',
        price: '₹499',
        address: '123, Skyline Apartments, Ahmedabad',
        status: 'pending',
        icon: 'snowflake',
        color: '#E0F2FE'
    },
    {
        id: '2',
        service: 'Full House Cleaning',
        customer: 'Jane Smith',
        date: 'Oct 25, 2023',
        time: '02:00 PM',
        price: '₹1,200',
        address: '45, Green Valley, Satellite, Ahmedabad',
        status: 'pending',
        icon: 'broom',
        color: '#F5F3FF'
    },
    {
        id: '3',
        service: 'Tap Repair',
        customer: 'Robert Brown',
        date: 'Oct 24, 2023',
        time: '11:30 AM',
        price: '₹199',
        address: 'B-402, Royal Residency, Gota, Ahmedabad',
        status: 'accepted',
        icon: 'water-pump',
        color: '#ECFDF5'
    }
];

export default function ProviderDashboard() {
    const { user, logout } = useAuthStore();
    const [bookings, setBookings] = useState(MOCK_BOOKINGS);
    const [activeTab, setActiveTab] = useState<'requests' | 'active'>('requests');

    const handleAction = (id: string, action: 'accept' | 'reject') => {
        setBookings(prev => prev.map(booking => {
            if (booking.id === id) {
                return { ...booking, status: action === 'accept' ? 'accepted' : 'rejected' };
            }
            return booking;
        }));
    };

    const pendingRequests = bookings.filter(b => b.status === 'pending');
    const activeBookings = bookings.filter(b => b.status === 'accepted');

    const renderBookingItem = ({ item }: { item: typeof MOCK_BOOKINGS[0] }) => (
        <Animated.View entering={FadeInDown} style={styles.bookingCard}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={24} color="#1E293B" />
                </View>
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{item.service}</Text>
                    <Text style={styles.customerName}>Customer: {item.customer}</Text>
                </View>
                <Text style={styles.price}>{item.price}</Text>
            </View>

            <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color="#64748B" />
                <Text style={styles.detailText}>{item.date} at {item.time}</Text>
            </View>

            <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={16} color="#64748B" />
                <Text style={styles.detailText} numberOfLines={1}>{item.address}</Text>
            </View>

            {item.status === 'pending' ? (
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={[styles.actionBtn, styles.rejectBtn]} 
                        onPress={() => handleAction(item.id, 'reject')}
                    >
                        <Text style={styles.rejectBtnText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionBtn, styles.acceptBtn]} 
                        onPress={() => handleAction(item.id, 'accept')}
                    >
                        <Text style={styles.acceptBtnText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.statusBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text style={styles.statusText}>Accepted & Scheduled</Text>
                </View>
            )}
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.providerName}>{user?.name || 'Service Partner'}</Text>
                </View>
                <TouchableOpacity onPress={() => logout()}>
                    <View style={styles.profileBox}>
                        <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
                    <Text style={styles.statValue}>{bookings.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: '#FEF2F2' }]}>
                    <Text style={[styles.statValue, { color: '#EF4444' }]}>{pendingRequests.length}</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
                    <Text style={[styles.statValue, { color: '#10B981' }]}>₹4.2k</Text>
                    <Text style={styles.statLabel}>Earnings</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
                    onPress={() => setActiveTab('requests')}
                >
                    <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
                        New Requests ({pendingRequests.length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'active' && styles.activeTab]}
                    onPress={() => setActiveTab('active')}
                >
                    <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
                        Active ({activeBookings.length})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
                data={activeTab === 'requests' ? pendingRequests : activeBookings}
                renderItem={renderBookingItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="clipboard-outline" size={64} color="#CBD5E1" />
                        <Text style={styles.emptyText}>No {activeTab} at the moment</Text>
                    </View>
                }
            />

            {/* Floating Switch Role (For Demo) */}
            <TouchableOpacity style={styles.switchBtn} onPress={() => router.replace('/(tabs)')}>
                <Ionicons name="swap-horizontal" size={20} color="#FFF" />
                <Text style={styles.switchText}>Switch to Customer</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 25,
        backgroundColor: '#FFF',
    },
    welcomeText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    providerName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E293B',
    },
    profileBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#FEF2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginTop: 20,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
        fontWeight: '600',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: 30,
        gap: 15,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    activeTab: {
        backgroundColor: '#1E293B',
        borderColor: '#1E293B',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748B',
    },
    activeTabText: {
        color: '#FFF',
    },
    listContent: {
        padding: 24,
        paddingBottom: 100,
    },
    bookingCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceInfo: {
        flex: 1,
        marginLeft: 15,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E293B',
    },
    customerName: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: '#10B981',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    detailText: {
        fontSize: 13,
        color: '#475569',
        fontWeight: '500',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    actionBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptBtn: {
        backgroundColor: '#10B981',
    },
    rejectBtn: {
        backgroundColor: '#F1F5F9',
    },
    acceptBtnText: {
        color: '#FFF',
        fontWeight: '700',
    },
    rejectBtnText: {
        color: '#EF4444',
        fontWeight: '700',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 15,
        padding: 10,
        backgroundColor: '#F0FDF4',
        borderRadius: 12,
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 12,
        color: '#10B981',
        fontWeight: '700',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#94A3B8',
        marginTop: 15,
        fontWeight: '600',
    },
    switchBtn: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#1E293B',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 20,
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
    },
    switchText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
});
