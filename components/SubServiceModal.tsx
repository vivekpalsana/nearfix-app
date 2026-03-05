import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BookingModal } from './BookingModal';

const { width } = Dimensions.get('window');

interface SubService {
    id: number;
    name: string;
    icon: string;
    color: string;
    iconColor: string;
}

interface SubServiceModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    data: SubService[];
}

export const SubServiceModal: React.FC<SubServiceModalProps> = ({ visible, onClose, title, data }) => {
    const [bookingVisible, setBookingVisible] = useState(false);
    const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);

    const handleSubServicePress = (item: SubService) => {
        setSelectedSubService(item);
        setBookingVisible(true);
    };

    return (
        <View>
            <Modal
                visible={visible}
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
            >
                <View style={styles.subModalOverlay}>
                    <View style={styles.subModalContent}>
                        <View style={styles.subModalHeader}>
                            <View style={styles.titleLine} />
                            <Text style={styles.subModalTitle}>{title}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.subModalClose}>
                                <Ionicons name="close-circle" size={32} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.subServicesGrid}>
                            {data && data.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.subServiceItem}
                                    onPress={() => handleSubServicePress(item)}
                                >
                                    <View style={[styles.subIconBadge, { backgroundColor: item.color }]}>
                                        <MaterialCommunityIcons name={item.icon as any} size={36} color={item.iconColor} />
                                    </View>
                                    <Text style={styles.subServiceTitle}>{item.name}</Text>
                                    <View style={styles.bookNowSmall}>
                                        <Text style={styles.bookNowText}>Book</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>

            <BookingModal
                visible={bookingVisible}
                onClose={() => setBookingVisible(false)}
                subService={selectedSubService}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    subModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subModalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 36,
        width: '100%',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    subModalHeader: {
        alignItems: 'center',
        marginBottom: 25,
        position: 'relative',
    },
    titleLine: {
        width: 40,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        marginBottom: 12,
    },
    subModalTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#1E293B',
        letterSpacing: -0.5,
    },
    subModalClose: {
        position: 'absolute',
        right: -10,
        top: -5,
    },
    subServicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    subServiceItem: {
        width: (width - 40 - 48 - 12) / 2,
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    subIconBadge: {
        width: 65,
        height: 65,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    subServiceTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 10,
    },
    bookNowSmall: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 10,
    },
    bookNowText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
});
