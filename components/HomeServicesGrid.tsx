import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Service {
    id: number;
    name: string;
    icon: string;
    color: string;
    iconColor: string;
}

interface HomeServicesGridProps {
    services: Service[];
    onSeeAll: () => void;
    onServicePress: (serviceName: string) => void;
}

export const HomeServicesGrid: React.FC<HomeServicesGridProps> = ({ services, onSeeAll, onServicePress }) => {
    return (
        <View style={styles.sectionNoPadding}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Our Services</Text>
                <TouchableOpacity
                    style={styles.seeAllButton}
                    onPress={onSeeAll}
                >
                    <Text style={styles.seeAllText}>See All</Text>
                    <Ionicons name="chevron-forward" size={16} color="#0EA5E9" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContentContainer}
            >
                <View style={styles.minimalRowsContainer}>
                    {/* Row 1: First 3 Services */}
                    <View style={styles.minimalServiceRow}>
                        {services.slice(0, 3).map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                style={styles.minimalServiceItemHorizontal}
                                onPress={() => onServicePress(service.name)}
                            >
                                <View style={[styles.minimalIconWrapper, { backgroundColor: service.color }]}>
                                    <MaterialCommunityIcons
                                        name={service.icon as any}
                                        size={32}
                                        color={service.iconColor}
                                    />
                                </View>
                                <Text style={styles.minimalServiceText}>{service.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* Row 2: Next 3 Services */}
                    <View style={styles.minimalServiceRow}>
                        {services.slice(3, 6).map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                style={styles.minimalServiceItemHorizontal}
                                onPress={() => onServicePress(service.name)}
                            >
                                <View style={[styles.minimalIconWrapper, { backgroundColor: service.color }]}>
                                    <MaterialCommunityIcons
                                        name={service.icon as any}
                                        size={32}
                                        color={service.iconColor}
                                    />
                                </View>
                                <Text style={styles.minimalServiceText}>{service.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionNoPadding: {
        marginTop: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        gap: 2,
    },
    seeAllText: {
        fontSize: 15,
        color: '#0EA5E9',
        fontWeight: '800',
    },
    scrollContentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
    minimalRowsContainer: {
        flexDirection: 'column',
        gap: 20,
    },
    minimalServiceRow: {
        flexDirection: 'row',
        gap: 20,
    },
    minimalServiceItemHorizontal: {
        width: (width - 40 - 40) / 3, // Fits exactly 3 items
        alignItems: 'center',
    },
    minimalIconWrapper: {
        width: 75,
        height: 75,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    minimalServiceText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#475569',
        textAlign: 'center',
    },
});
