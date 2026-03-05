import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuthStore } from '../hooks/useAuthStore';

const MENU_ITEMS = [
    {
        id: 'help',
        title: 'Help',
        subtitle: 'Get support or report an issue',
        icon: 'help-circle-outline',
        color: '#E0F2FE',
        iconColor: '#0EA5E9',
    },
    {
        id: 'about',
        title: 'About Us',
        subtitle: 'Learn more about NearFix',
        icon: 'information-circle-outline',
        color: '#F5F3FF',
        iconColor: '#8B5CF6',
    },
    {
        id: 'review',
        title: 'Review',
        subtitle: 'Rate your experience with us',
        icon: 'star-outline',
        color: '#FFF7ED',
        iconColor: '#F59E0B',
    },
    {
        id: 'contact',
        title: 'Contact Us',
        subtitle: 'Talk to our friendly team',
        icon: 'mail-outline',
        color: '#ECFDF5',
        iconColor: '#10B981',
    },
];

export default function MenuScreen() {
    const { isLoggedIn, user } = useAuthStore();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Menu</Text>
                <View style={{ width: 40 }} /> {/* Spacer for centering */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                {isLoggedIn && (
                    <Animated.View entering={FadeInDown.delay(50)} style={styles.profileSection}>
                        <TouchableOpacity
                            style={styles.profileCard}
                            onPress={() => router.push('/auth')}
                        >
                            <View style={styles.profileAvatar}>
                                <Ionicons name="person-circle" size={60} color="#38BDF8" />
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{user?.name}</Text>
                                <Text style={styles.profileSubtitle}>{user?.email}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.loginActionBtn}
                                onPress={() => router.push('/auth')}
                            >
                                <Text style={styles.loginActionText}>View Profile</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                <View style={styles.menuList}>
                    {MENU_ITEMS.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            entering={FadeInDown.delay(index * 100)}
                        >
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => router.push(`/${item.id}` as any)}
                            >
                                <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
                                    <Ionicons name={item.icon as any} size={28} color={item.iconColor} />
                                </View>

                                <View style={styles.itemContent}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                                </View>

                                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Footer Info */}
                <View style={styles.footer}>
                    <Text style={styles.versionText}>NearFix v1.0.1</Text>
                    <Text style={styles.copyrightText}>© 2026 NearFix App. All rights reserved.</Text>
                </View>
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
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    menuList: {
        gap: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    iconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        marginLeft: 16,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
    },
    itemSubtitle: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94A3B8',
    },
    copyrightText: {
        fontSize: 12,
        color: '#CBD5E1',
        marginTop: 4,
    },
    profileSection: {
        marginBottom: 25,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1E293B',
    },
    profileSubtitle: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },
    loginActionBtn: {
        backgroundColor: '#38BDF8',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    loginActionText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '800',
    },
});
