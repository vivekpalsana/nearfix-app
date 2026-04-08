import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Offer {
    id: number;
    color: string;
    title: string;
    subtitle: string;
    image?: any;
    gradient?: string[];
    isExclusive?: boolean;
}

interface BestOffersProps {
    offers: Offer[];
    onViewAll?: () => void;
    onClaim: (offer: any) => void;
}

export const BestOffers: React.FC<BestOffersProps> = ({ offers, onViewAll, onClaim }) => {
    return (
        <View style={styles.section}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Exclusive Offers</Text>
                <TouchableOpacity
                    onPress={() => {
                        console.log('View All Tapped');
                        if (onViewAll) onViewAll();
                    }}
                    style={styles.viewAllWrapper}
                    hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                    activeOpacity={0.5}
                >
                    <View style={styles.viewAllContainer}>
                        <Text style={styles.viewAll}>View All</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.offersContainer}
                decelerationRate="fast"
                snapToInterval={width * 0.85 + 15}
            >
                {offers.map((offer) => (
                    <View key={offer.id} style={styles.offerCard}>
                        <LinearGradient
                            colors={offer.gradient ? [offer.gradient[0], offer.gradient[1]] : [offer.color, offer.color]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBg}
                        />
                        <View style={styles.offerContent}>
                            <View style={styles.offerTextContainer}>
                                {offer.isExclusive && (
                                    <View style={styles.exclusiveBadge}>
                                        <Text style={styles.exclusiveBadgeText}>PREMIUM</Text>
                                    </View>
                                )}
                                <Text style={[
                                    styles.offerTitle,
                                    offer.isExclusive && { color: '#FFFFFF' }
                                ]}>
                                    {offer.title}
                                </Text>
                                <Text style={[
                                    styles.offerSubtitle,
                                    offer.isExclusive && { color: 'rgba(255,255,255,0.8)' }
                                ]}>
                                    {offer.subtitle}
                                </Text>
                                <TouchableOpacity
                                    style={[
                                        styles.offerBadge,
                                        offer.isExclusive && { backgroundColor: '#FFFFFF' }
                                    ]}
                                    onPress={() => onClaim({
                                        id: offer.id,
                                        name: offer.subtitle, // Using subtitle as service name for offers
                                        icon: 'tag',
                                        color: offer.color,
                                        iconColor: offer.isExclusive ? (offer.gradient ? offer.gradient[0] : '#1E293B') : '#FFFFFF'
                                    })}
                                >
                                    <Text style={[
                                        styles.offerBadgeText,
                                        offer.isExclusive && { color: offer.gradient ? offer.gradient[0] : '#1E293B' }
                                    ]}>
                                        Claim Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {offer.image && (
                                <Image source={offer.image} style={styles.offerImage} resizeMode="contain" />
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 30,
        zIndex: 5,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
        zIndex: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    viewAllWrapper: {
        zIndex: 20,
        elevation: 5,
    },
    viewAllContainer: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    viewAll: {
        fontSize: 12,
        fontWeight: '700',
        color: '#3B82F6',
    },
    offersContainer: {
        paddingLeft: 20,
        paddingRight: 5,
    },
    offerCard: {
        width: width * 0.85,
        height: 160,
        borderRadius: 28,
        marginRight: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    gradientBg: {
        ...StyleSheet.absoluteFillObject,
    },
    offerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },
    offerTextContainer: {
        flex: 1,
        zIndex: 1,
    },
    offerTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#1E293B',
        lineHeight: 30,
    },
    offerSubtitle: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
        marginTop: 6,
        marginBottom: 16,
    },
    offerImage: {
        width: 120,
        height: 120,
        marginLeft: 10,
    },
    offerBadge: {
        backgroundColor: '#1E293B',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    offerBadgeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    exclusiveBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    exclusiveBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
});


