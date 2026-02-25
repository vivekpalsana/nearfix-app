import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Offer {
    id: number;
    color: string;
    title: string;
    subtitle: string;
}

interface BestOffersProps {
    offers: Offer[];
}

export const BestOffers: React.FC<BestOffersProps> = ({ offers }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Offers</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.offersContainer}
            >
                {offers.map((offer) => (
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
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    offersContainer: {
        paddingRight: 20,
        marginTop: 15,
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
});
