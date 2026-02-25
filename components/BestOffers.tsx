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
}

interface BestOffersProps {
    offers: Offer[];
}

export const BestOffers: React.FC<BestOffersProps> = ({ offers }) => {
    return (
        <View style={styles.section}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Exclusive Offers</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.offersContainer}
            >
                {offers.map((offer) => (
                    <TouchableOpacity key={offer.id} style={styles.offerCard}>
                        <LinearGradient
                            colors={offer.gradient ? [offer.gradient[0], offer.gradient[1]] : [offer.color, offer.color]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBg}
                        />
                        <View style={styles.offerContent}>
                            <View style={styles.offerTextContainer}>
                                <Text style={styles.offerTitle}>{offer.title}</Text>
                                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                                <TouchableOpacity style={styles.offerBadge}>
                                    <Text style={styles.offerBadgeText}>Claim Now</Text>
                                </TouchableOpacity>
                            </View>
                            {offer.image && (
                                <Image source={offer.image} style={styles.offerImage} resizeMode="contain" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 30,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    viewAll: {
        fontSize: 14,
        fontWeight: '600',
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
});

