import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const FEATURE_CARDS = [
    {
        title: 'Trusted Experts',
        desc: 'All our professionals are background-checked and highly skilled.',
        icon: 'checkmark-circle' as const,
        color: '#3B82F6',
    },
    {
        title: 'Safety First',
        desc: 'We prioritize your safety with strict protocols and insured services.',
        icon: 'shield-checkmark' as const,
        color: '#10B981',
    },
    {
        title: 'Quick Respose',
        desc: 'NearFix ensures help reaches you in the shortest time possible.',
        icon: 'flash' as const,
        color: '#F59E0B',
    },
];

export default function AboutUsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <LinearGradient
                        colors={['#1E293B', '#0F172A']}
                        style={styles.heroGradient}
                    />

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>About Us</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    <Animated.View
                        entering={FadeInUp.duration(600)}
                        style={styles.heroContent}
                    >
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>NearFix</Text>
                            <View style={styles.logoDot} />
                        </View>
                        <Text style={styles.heroSubtitle}>Your Trusted Home Service Partner</Text>
                    </Animated.View>
                </View>

                {/* Our Story */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600)}
                    style={styles.section}
                >
                    <Text style={styles.sectionTitle}>Our Story</Text>
                    <View style={styles.storyCard}>
                        <Text style={styles.storyText}>
                            NearFix was born from a simple idea: making home services reliable, transparent, and accessible to everyone. We noticed the struggle of finding trustworthy experts for everyday fixes.
                            {"\n\n"}
                            Today, we are a growing community of professionals and happy homeowners, dedicated to bringing quality service to your doorstep with just a tap.
                        </Text>
                    </View>
                </Animated.View>

                {/* Why Choose Us */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Why Choose NearFix?</Text>
                    {FEATURE_CARDS.map((item, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInDown.delay(400 + index * 100).duration(600)}
                            style={styles.featureCard}
                        >
                            <View style={[styles.featureIconContainer, { backgroundColor: item.color + '15' }]}>
                                <Ionicons name={item.icon} size={24} color={item.color} />
                            </View>
                            <View style={styles.featureContent}>
                                <Text style={styles.featureTitle}>{item.title}</Text>
                                <Text style={styles.featureDesc}>{item.desc}</Text>
                            </View>
                        </Animated.View>
                    ))}
                </View>

                {/* Mission & Vision */}
                <Animated.View
                    entering={FadeInDown.delay(800).duration(600)}
                    style={styles.missionVisionContainer}
                >
                    <LinearGradient
                        colors={['#F8FAFC', '#F1F5F9']}
                        style={styles.missionCard}
                    >
                        <Text style={styles.missionTitle}>Our Mission</Text>
                        <Text style={styles.missionText}>
                            To empower local professionals and provide users with seamless home maintenance experiences.
                        </Text>
                    </LinearGradient>
                </Animated.View>

                <View style={styles.footer}>
                    <Text style={styles.footerVersion}>NearFix v1.0.0</Text>
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
    scrollContent: {
        flexGrow: 1,
    },
    heroContainer: {
        height: 280,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    header: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
    },
    heroContent: {
        alignItems: 'center',
        marginTop: 40,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    logoText: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    logoDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
        marginLeft: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#94A3B8',
        marginTop: 8,
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 16,
    },
    storyCard: {
        backgroundColor: '#F8FAFC',
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    storyText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#475569',
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    featureIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureContent: {
        flex: 1,
        marginLeft: 16,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
    },
    featureDesc: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },
    missionVisionContainer: {
        paddingHorizontal: 20,
        marginTop: 32,
        marginBottom: 20,
    },
    missionCard: {
        padding: 24,
        borderRadius: 24,
        alignItems: 'center',
    },
    missionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 8,
    },
    missionText: {
        fontSize: 14,
        color: '#475569',
        textAlign: 'center',
        lineHeight: 22,
    },
    footer: {
        paddingVertical: 30,
        alignItems: 'center',
    },
    footerVersion: {
        fontSize: 14,
        fontWeight: '600',
        color: '#CBD5E1',
    },
});
