import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const MANAGEMENT_OPTIONS = [
    { id: '1', title: 'Manage Users', icon: 'person-group', count: '1,240', color: '#3B82F6', route: '/admin/manage-users' },
    { id: '2', title: 'Manage Providers', icon: 'briefcase-check', count: '85', color: '#10B981', route: '/admin/manage-providers' },
    { id: '3', title: 'Manage Categories', icon: 'grid', count: '15', color: '#F59E0B', route: '/admin/manage-categories' },
    { id: '4', title: 'Manage Services', icon: 'cog', count: '112', color: '#8B5CF6', route: '/admin/manage-services' },
    { id: '5', title: 'Manage Bookings', icon: 'calendar-clock', count: '482', color: '#EC4899', route: '/admin/manage-bookings' },
    { id: '6', title: 'Reports / Analytics', icon: 'trending-up', count: 'Overview', color: '#F43F5E', route: '/admin/reports' },
];

const ANALYTICS_DATA = [
    { label: 'Revenue', value: '₹1.2M', growth: '+12%', color: '#10B981' },
    { label: 'Active Jobs', value: '54', growth: '+5%', color: '#3B82F6' },
    { label: 'Satisfaction', value: '4.8', growth: 'Excellent', color: '#F59E0B' },
];

export default function AdminDashboard() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>System Admin</Text>
                    <Text style={styles.headerSubtitle}>NearFix Control Center</Text>
                </View>
                <TouchableOpacity onPress={() => router.replace('/admin/login')} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color="#F43F5E" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {ANALYTICS_DATA.map((item, index) => (
                        <Animated.View 
                            key={index} 
                            entering={FadeInDown.delay(index * 100)} 
                            style={[styles.statCard, { borderLeftColor: item.color }]}
                        >
                            <Text style={styles.statLabel}>{item.label}</Text>
                            <Text style={styles.statValue}>{item.value}</Text>
                            <Text style={[styles.statGrowth, { color: item.color }]}>{item.growth}</Text>
                        </Animated.View>
                    ))}
                </View>

                {/* Management Grid */}
                <Text style={styles.sectionTitle}>Management Console</Text>
                <View style={styles.managementGrid}>
                    {MANAGEMENT_OPTIONS.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.manageCard}
                            onPress={() => console.log('Navigate to:', item.route)}
                        >
                            <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
                                <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                            </View>
                            <Text style={styles.manageTitle}>{item.title}</Text>
                            <View style={styles.manageFooter}>
                                <Text style={styles.manageCount}>{item.count}</Text>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recent Activity Section (Placeholder) */}
                <View style={styles.activitySection}>
                    <Text style={styles.sectionTitle}>Recent System Alerts</Text>
                    <View style={styles.alertCard}>
                        <Ionicons name="alert-circle" size={20} color="#F59E0B" />
                        <Text style={styles.alertText}>New provider application pending: "ElectroFix Solutions"</Text>
                    </View>
                    <View style={styles.alertCard}>
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        <Text style={styles.alertText}>Daily server backup completed successfully.</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 25,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '500',
    },
    logoutBtn: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 30,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#1E293B',
        padding: 16,
        borderRadius: 20,
        borderLeftWidth: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '600',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginTop: 4,
    },
    statGrowth: {
        fontSize: 10,
        fontWeight: '700',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 20,
        marginTop: 10,
    },
    managementGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'space-between',
    },
    manageCard: {
        width: (width - 48 - 16) / 2,
        backgroundColor: '#1E293B',
        borderRadius: 24,
        padding: 20,
        marginBottom: 4,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    manageTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#E2E8F0',
        marginBottom: 12,
    },
    manageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    manageCount: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '600',
    },
    activitySection: {
        marginTop: 30,
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        gap: 12,
    },
    alertText: {
        flex: 1,
        fontSize: 13,
        color: '#94A3B8',
        lineHeight: 18,
    },
});
