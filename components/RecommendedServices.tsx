import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ALL_SUB_SERVICES } from '../constants/ServicesData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

interface RecommendedServicesProps {
    onBookNow: (service: any) => void;
    refreshKey?: number;
}

export const RecommendedServices: React.FC<RecommendedServicesProps> = ({ onBookNow, refreshKey }) => {
    const [displayedServices, setDisplayedServices] = React.useState<any[]>([]);

    React.useEffect(() => {
        // Shuffle and pick 5 random services with stable random ratings
        const shuffled = [...ALL_SUB_SERVICES]
            .sort(() => 0.5 - Math.random())
            .slice(0, 5)
            .map(s => ({
                ...s,
                stableRating: (4 + (Math.random() * 0.9)).toFixed(1)
            }));
        setDisplayedServices(shuffled);
    }, [refreshKey]);

    return (
        <View style={styles.section}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <Text style={styles.swipeHint}>Swipe to see more <Ionicons name="arrow-forward" size={12} /></Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
                snapToInterval={CARD_WIDTH + 15}
                decelerationRate="fast"
            >
                {displayedServices.map((item, index) => (
                    <TouchableOpacity
                        key={`${item.id}-${index}`}
                        style={[styles.recommendedCard, { width: CARD_WIDTH }]}
                        activeOpacity={0.8}
                        onPress={() => onBookNow(item)}
                    >
                        <View style={styles.recommendedImageContainer}>
                            <View style={[styles.placeholderImage, { backgroundColor: item.color }]}>
                                <MaterialCommunityIcons name={item.icon || 'star'} size={40} color={item.iconColor} />
                            </View>
                        </View>
                        <View style={styles.recommendedInfo}>
                            <Text style={styles.recommendedTitle} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.recommendedSubtitle} numberOfLines={1}>Top rated in {item.category}</Text>
                            <View style={styles.footerRow}>
                                <View style={styles.ratingRow}>
                                    <Ionicons name="star" size={14} color="#F59E0B" />
                                    <Text style={styles.ratingText}>{item.stableRating}</Text>
                                </View>
                                <View style={styles.bookBtnSmall}>
                                    <Text style={styles.bookBtnTextSmall}>Book Now</Text>
                                </View>
                            </View>
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
        paddingBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    swipeHint: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '600',
    },
    horizontalScrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    recommendedCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 12,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
    },
    recommendedImageContainer: {
        width: 70,
        height: 70,
        borderRadius: 16,
        overflow: 'hidden',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendedInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    recommendedTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
    },
    recommendedSubtitle: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
    },
    bookBtnSmall: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    bookBtnTextSmall: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
});

