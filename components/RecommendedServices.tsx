import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ALL_SUB_SERVICES } from '../constants/ServicesData';

interface RecommendedServicesProps {
    onBookNow: (service: any) => void;
    refreshKey?: number;
}

export const RecommendedServices: React.FC<RecommendedServicesProps> = ({ onBookNow, refreshKey }) => {
    const [displayedServices, setDisplayedServices] = React.useState<any[]>([]);

    React.useEffect(() => {
        // Shuffle and pick 2 random services
        const shuffled = [...ALL_SUB_SERVICES].sort(() => 0.5 - Math.random());
        setDisplayedServices(shuffled.slice(0, 2));
    }, [refreshKey]);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            {displayedServices.map((item, index) => (
                <TouchableOpacity key={`${item.id}-${index}`} style={[styles.recommendedCard, index > 0 && { marginTop: 15 }]}>
                    <View style={styles.recommendedImageContainer}>
                        <View style={[styles.placeholderImage, { backgroundColor: item.color }]}>
                            <MaterialCommunityIcons name={item.icon || 'star'} size={40} color={item.iconColor} />
                        </View>
                    </View>
                    <View style={styles.recommendedInfo}>
                        <Text style={styles.recommendedTitle}>{item.name}</Text>
                        <Text style={styles.recommendedSubtitle}>Top rated in {item.category}</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={14} color="#F59E0B" />
                            <Text style={styles.ratingText}>4.{7 + Math.floor(Math.random() * 3)} ({Math.floor(Math.random() * 20) + 1}k reviews)</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bookBtnSmall}
                        onPress={() => onBookNow(item)}
                    >
                        <Text style={styles.bookBtnTextSmall}>Book</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
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
        marginBottom: 15,
    },
    recommendedCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
        elevation: 2,
    },
    recommendedImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        overflow: 'hidden',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F3FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendedInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    recommendedTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
    },
    recommendedSubtitle: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
    },
    bookBtnSmall: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        justifyContent: 'center',
    },
    bookBtnTextSmall: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '800',
    },
});
