import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Service {
    id: number;
    name: string;
    icon: string;
    color: string;
    iconColor: string;
}

interface AllServicesModalProps {
    visible: boolean;
    onClose: () => void;
    services: Service[];
    onServicePress: (serviceName: string) => void;
}

export const AllServicesModal: React.FC<AllServicesModalProps> = ({ visible, onClose, services, onServicePress }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>All Services</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={24} color="#1E293B" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.modalScrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.servicesGrid}>
                            {services.map((service) => (
                                <TouchableOpacity
                                    key={service.id}
                                    style={styles.gridServiceItem}
                                    onPress={() => onServicePress(service.name)}
                                >
                                    <View style={[styles.gridIconWrapper, { backgroundColor: service.color }]}>
                                        <MaterialCommunityIcons
                                            name={service.icon as any}
                                            size={32}
                                            color={service.iconColor}
                                        />
                                    </View>
                                    <Text style={styles.gridServiceText}>{service.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        height: height * 0.8,
        paddingTop: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    closeButton: {
        padding: 4,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
    },
    modalScrollContent: {
        padding: 24,
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'space-between',
    },
    gridServiceItem: {
        width: (width - 48 - 32) / 3, // 3 column grid
        alignItems: 'center',
        marginBottom: 20,
    },
    gridIconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    gridServiceText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
        textAlign: 'center',
    },
});
