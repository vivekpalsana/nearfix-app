import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { BookingModal } from '../components/BookingModal';
import { EXCLUSIVE_OFFERS } from '../constants/ServicesData';

const { width } = Dimensions.get('window');

export default function ExclusiveOffersScreen() {
    const [bookingService, setBookingService] = React.useState<any>(null);

    const handleClaim = (offer: any) => {
        setBookingService({
            id: offer.id,
            name: offer.title,
            icon: 'tag',
            color: offer.color || '#3B82F6',
            iconColor: '#FFFFFF'
        });
    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#0F172A', '#1E293B', '#334155']}
                style={StyleSheet.absoluteFill}
            />

            {/* Decorative Background Glows */}
            <View style={[styles.glow, { top: -100, left: -100, backgroundColor: '#3B82F633' }]} pointerEvents="none" />
            <View style={[styles.glow, { bottom: 100, right: -100, backgroundColor: '#F43F5E22' }]} pointerEvents="none" />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Animated.Text entering={FadeInDown.delay(200)} style={styles.headerTitle}>Premium Deals</Animated.Text>
                    <TouchableOpacity style={styles.infoButton}>
                        <Ionicons name="information-circle-outline" size={24} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Animated.View entering={FadeInDown.delay(300)} style={styles.introContainer}>
                        <Text style={styles.introTitle}>Elite{'\n'}Privileges</Text>
                        <View style={styles.titleUnderline} />
                        <Text style={styles.introSubtitle}>
                            Handpicked premium deals for our most valued customers.
                        </Text>
                    </Animated.View>

                    {/* Horizontal Flash Deals */}
                    <Animated.View entering={FadeInRight.delay(400)}>
                        <View style={styles.sectionHeaderLine}>
                            <Text style={styles.sectionHeading}>FLASH DEALS</Text>
                            <View style={styles.liveBadge}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveText}>LIVE</Text>
                            </View>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flashScrollContent}
                        >
                            {EXCLUSIVE_OFFERS.slice(0, 3).map((offer) => (
                                <View key={`flash-${offer.id}`} style={styles.flashCard}>
                                    <LinearGradient
                                        colors={offer.gradient as [string, string]}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.flashCardContent}>
                                        <Text style={styles.flashTitle}>{offer.title}</Text>
                                        <Text style={styles.flashCode}>{offer.code}</Text>
                                        <TouchableOpacity
                                            style={styles.flashBtn}
                                            onPress={() => handleClaim(offer)}
                                        >
                                            <Text style={[styles.flashBtnText, { color: offer.color }]}>Claim</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    <Text style={[styles.sectionHeading, { marginTop: 30, marginBottom: 15 }]}>ALL EXCLUSIVE OFFERS</Text>


                    {EXCLUSIVE_OFFERS.map((offer, index) => (
                        <Animated.View
                            key={offer.id}
                            entering={FadeInDown.delay(400 + index * 100)}
                            style={styles.offerCard}
                        >
                            <LinearGradient
                                colors={offer.gradient as [string, string]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.cardGradient}
                            />

                            {/* Glassmorphism Pattern */}
                            <View style={styles.patternOverlay} pointerEvents="none">
                                <View style={[styles.patternCircle, { top: -20, left: -20, opacity: 0.1 }]} />
                                <View style={[styles.patternCircle, { bottom: -50, right: -30, opacity: 0.05, width: 150, height: 150 }]} />
                            </View>

                            <View style={styles.cardMainContent}>
                                <View style={styles.textSection}>
                                    <View style={[styles.labelBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                        <Text style={styles.labelText}>{offer.label || 'OFFER'}</Text>
                                    </View>

                                    <Text style={styles.offerTitle}>{offer.title}</Text>
                                    <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>

                                    <View style={styles.metaRow}>
                                        <View style={styles.expiryBox}>
                                            <Ionicons name="flash" size={12} color="#FDE047" />
                                            <Text style={styles.expiryText}>{offer.expiry}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.imageContainer}>
                                    <View style={styles.imageBg} />
                                    <Image
                                        source={offer.image}
                                        style={styles.offerImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                            <View style={styles.cardFooter}>
                                <View style={styles.codeSection}>
                                    <Text style={styles.codeLabel}>PROMO CODE</Text>
                                    <View style={styles.codeWrapper}>
                                        <Text style={styles.codeValue}>{offer.code}</Text>
                                        <TouchableOpacity style={styles.copyIconButton}>
                                            <Ionicons name="copy-outline" size={16} color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.claimButton}
                                    onPress={() => handleClaim(offer)}
                                >
                                    <Text style={[styles.claimButtonText, { color: offer.color }]}>Activate</Text>
                                    <View style={[styles.claimIconCircle, { backgroundColor: offer.color }]}>
                                        <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    ))}

                    <Animated.View entering={FadeInDown.delay(1000)} style={styles.footerSection}>
                        <View style={styles.trustBadge}>
                            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                            <Text style={styles.trustText}>Verified NearFix Partner Offers</Text>
                        </View>
                        <Text style={styles.termsText}>*T&C Apply. Offers cannot be combined with other discounts.</Text>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>

            <BookingModal
                visible={bookingService !== null}
                onClose={() => setBookingService(null)}
                subService={bookingService}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    glow: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    infoButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    introContainer: {
        marginTop: 15,
        marginBottom: 35,
    },
    introTitle: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 52,
    },
    titleUnderline: {
        width: 60,
        height: 6,
        backgroundColor: '#3B82F6',
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 20,
    },
    introSubtitle: {
        fontSize: 15,
        color: '#94A3B8',
        lineHeight: 22,
        maxWidth: '90%',
    },
    offerCard: {
        borderRadius: 30,
        marginBottom: 25,
        overflow: 'hidden',
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
    },
    cardGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    patternOverlay: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    patternCircle: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
    },
    cardMainContent: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 15,
        alignItems: 'flex-start',
    },
    textSection: {
        flex: 1,
        paddingRight: 10,
    },
    labelBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    labelText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    offerTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 8,
        lineHeight: 30,
    },
    offerSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: '500',
        marginBottom: 15,
        lineHeight: 18,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expiryBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'rgba(0,0,0,0.15)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    expiryText: {
        fontSize: 11,
        color: '#FFFFFF',
        fontWeight: '700',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    imageBg: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    offerImage: {
        width: 80,
        height: 80,
    },
    cardFooter: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 25,
        paddingVertical: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    codeSection: {
        gap: 4,
    },
    codeLabel: {
        fontSize: 9,
        fontWeight: '800',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 0.5,
    },
    codeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    codeValue: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    copyIconButton: {
        opacity: 0.7,
    },
    claimButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        gap: 8,
        elevation: 5,
    },
    claimIconCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    claimButtonText: {
        fontSize: 14,
        fontWeight: '800',
    },
    footerSection: {
        marginTop: 20,
        alignItems: 'center',
        gap: 12,
    },
    trustBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    trustText: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '600',
    },
    termsText: {
        color: '#64748B',
        fontSize: 11,
        textAlign: 'center',
    },
    // NEW STYLES
    sectionHeaderLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    sectionHeading: {
        fontSize: 13,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 2,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EF444422',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#EF4444',
    },
    liveText: {
        color: '#EF4444',
        fontSize: 10,
        fontWeight: '900',
    },
    flashScrollContent: {
        gap: 15,
        paddingRight: 20,
    },
    flashCard: {
        width: 160,
        height: 100,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    flashCardContent: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    flashTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
        textAlign: 'center',
    },
    flashCode: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontWeight: '700',
    },
    flashBtn: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 5,
    },
    flashBtnText: {
        fontSize: 10,
        fontWeight: '900',
    },
});

