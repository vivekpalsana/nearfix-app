import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Linking,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const CONTACT_METHODS = [
    {
        title: 'Email Us',
        val: 'support@nearfix.com',
        icon: 'mail-outline',
        color: '#3B82F6',
        action: () => Linking.openURL('mailto:support@nearfix.com')
    },
    {
        title: 'Call Us',
        val: '+1 (555) 123-4567',
        icon: 'call-outline',
        color: '#10B981',
        action: () => Linking.openURL('tel:+15551234567')
    },
    {
        title: 'Visit Us',
        val: '123 Service St, Tech City, NY',
        icon: 'location-outline',
        color: '#F59E0B',
        action: () => { }
    },
];

const SOCIALS = [
    { name: 'logo-facebook', color: '#1877F2' },
    { name: 'logo-instagram', color: '#E4405F' },
    { name: 'logo-twitter', color: '#1DA1F2' },
    { name: 'logo-whatsapp', color: '#25D366' },
];

export default function ContactUsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Animated.View entering={FadeInDown.duration(800)} style={styles.heroSection}>
                    <View style={styles.illustrationContainer}>
                        <View style={styles.circle1} />
                        <View style={styles.circle2} />
                        <Ionicons name="headset-outline" size={80} color="#3B82F6" />
                    </View>
                    <Text style={styles.heroTitle}>Get in Touch</Text>
                    <Text style={styles.heroSubtitle}>We're here to help and answer any question you might have.</Text>
                </Animated.View>

                <View style={styles.section}>
                    {CONTACT_METHODS.map((item, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInRight.delay(200 + index * 100)}
                        >
                            <TouchableOpacity
                                style={styles.contactMethodCard}
                                onPress={item.action}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.methodIcon, { backgroundColor: item.color + '15' }]}>
                                    <Ionicons name={item.icon as any} size={24} color={item.color} />
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodTitle}>{item.title}</Text>
                                    <Text style={styles.methodValue}>{item.val}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                <Animated.View entering={FadeInDown.delay(600)} style={styles.socialSection}>
                    <Text style={styles.socialTitle}>Follow us on Social Media</Text>
                    <View style={styles.socialIcons}>
                        {SOCIALS.map((social, index) => (
                            <TouchableOpacity key={index} style={styles.socialButton}>
                                <Ionicons name={social.name as any} size={28} color={social.color} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>

                <View style={styles.officeHours}>
                    <Text style={styles.hoursTitle}>Support Hours</Text>
                    <View style={styles.hoursRow}>
                        <Text style={styles.hoursDay}>Monday - Friday</Text>
                        <Text style={styles.hoursTime}>9 AM - 8 PM</Text>
                    </View>
                    <View style={styles.hoursRow}>
                        <Text style={styles.hoursDay}>Saturday - Sunday</Text>
                        <Text style={styles.hoursTime}>10 AM - 6 PM</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
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
        paddingVertical: 15,
        backgroundColor: '#FFF',
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
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 30,
    },
    illustrationContainer: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    circle1: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#EFF6FF',
    },
    circle2: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#DBEAFE',
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1E293B',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 24,
    },
    section: {
        paddingHorizontal: 20,
        gap: 12,
    },
    contactMethodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 18,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    methodIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    methodInfo: {
        flex: 1,
        marginLeft: 16,
    },
    methodTitle: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '600',
    },
    methodValue: {
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '700',
        marginTop: 2,
    },
    socialSection: {
        marginTop: 50,
        alignItems: 'center',
    },
    socialTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 20,
    },
    socialIcons: {
        flexDirection: 'row',
        gap: 20,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    officeHours: {
        margin: 20,
        marginTop: 50,
        padding: 24,
        backgroundColor: '#F1F5F9',
        borderRadius: 24,
    },
    hoursTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 16,
    },
    hoursRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    hoursDay: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
    },
    hoursTime: {
        fontSize: 14,
        color: '#1E293B',
        fontWeight: '700',
    },
});
