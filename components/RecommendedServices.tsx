import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const RecommendedServices = () => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <TouchableOpacity style={styles.recommendedCard}>
                <View style={styles.recommendedImageContainer}>
                    <View style={styles.placeholderImage}>
                        <MaterialCommunityIcons name="vacuum" size={40} color="#8B5CF6" />
                    </View>
                </View>
                <View style={styles.recommendedInfo}>
                    <Text style={styles.recommendedTitle}>Intense Cleaning</Text>
                    <Text style={styles.recommendedSubtitle}>Bathroom & Kitchen Cleaning</Text>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text style={styles.ratingText}>4.8 (12k reviews)</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
});
