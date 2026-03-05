import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface BookingModalProps {
    visible: boolean;
    onClose: () => void;
    subService: {
        id: number;
        name: string;
        icon: string;
        color: string;
        iconColor: string;
    } | null;
}

const TIME_SLOTS = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export const BookingModal: React.FC<BookingModalProps> = ({ visible, onClose, subService }) => {
    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isEmergency, setIsEmergency] = useState(false);

    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.getDate(),
            full: date.toISOString().split('T')[0]
        };
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleBooking = () => {
        if (!selectedSlot) {
            Alert.alert('Selection Required', 'Please choose a time slot');
            return;
        }

        Alert.alert(
            'Booking Confirmed',
            `Your ${subService?.name} is scheduled for ${dates[selectedDate].day}, ${dates[selectedDate].date} at ${selectedSlot}.`,
            [{ text: 'Great!', onPress: onClose }]
        );
    };

    if (!subService) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Ionicons name="close" size={24} color="#1E293B" />
                        </TouchableOpacity>
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerTitle}>Customize Booking</Text>
                            <Text style={styles.headerSubTitle}>{subService.name}</Text>
                        </View>
                        <View style={[styles.miniIcon, { backgroundColor: subService.color }]}>
                            <MaterialCommunityIcons name={subService.icon as any} size={20} color={subService.iconColor} />
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Date Selection */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Select Date</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateContainer}>
                                {dates.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setSelectedDate(index)}
                                        style={[
                                            styles.dateItem,
                                            selectedDate === index && styles.dateItemSelected
                                        ]}
                                    >
                                        <Text style={[styles.dayText, selectedDate === index && styles.textSelected]}>{item.day}</Text>
                                        <Text style={[styles.dateText, selectedDate === index && styles.textSelected]}>{item.date}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Time Slot */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Available Slots</Text>
                            <View style={styles.slotsGrid}>
                                {TIME_SLOTS.map((slot) => (
                                    <TouchableOpacity
                                        key={slot}
                                        onPress={() => setSelectedSlot(slot)}
                                        style={[
                                            styles.slotItem,
                                            selectedSlot === slot && styles.slotItemSelected
                                        ]}
                                    >
                                        <Text style={[styles.slotText, selectedSlot === slot && styles.textSelectedSlot]}>{slot}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Description */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Problem Description</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Describe the issue in detail..."
                                placeholderTextColor="#94A3B8"
                                multiline
                                numberOfLines={4}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        {/* Image Upload */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Upload Reference Image</Text>
                            <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.previewImage} />
                                ) : (
                                    <>
                                        <Ionicons name="camera-outline" size={32} color="#0EA5E9" />
                                        <Text style={styles.uploadText}>Add Photos</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Emergency Toggle */}
                        <View style={styles.emergencyContainer}>
                            <View style={styles.emergencyText}>
                                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                                <View style={{ marginLeft: 8 }}>
                                    <Text style={styles.emergencyLabel}>Emergency Service</Text>
                                    <Text style={styles.emergencySub}>Faster response (Additional charges may apply)</Text>
                                </View>
                            </View>
                            <Switch
                                value={isEmergency}
                                onValueChange={setIsEmergency}
                                trackColor={{ false: '#E2E8F0', true: '#FECACA' }}
                                thumbColor={isEmergency ? '#EF4444' : '#94A3B8'}
                            />
                        </View>
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
                            <Text style={styles.bookBtnText}>Confirm Booking</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: height * 0.85,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    closeBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        marginLeft: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    headerSubTitle: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },
    miniIcon: {
        padding: 8,
        borderRadius: 12,
    },
    scrollContent: {
        padding: 24,
    },
    section: {
        marginBottom: 25,
    },
    sectionLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 12,
    },
    dateContainer: {
        gap: 12,
    },
    dateItem: {
        width: 60,
        height: 75,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    dateItemSelected: {
        backgroundColor: '#0EA5E9',
        borderColor: '#0EA5E9',
    },
    dayText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
    },
    dateText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginTop: 4,
    },
    textSelected: {
        color: '#FFFFFF',
    },
    slotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    slotItem: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        width: (width - 48 - 20) / 3, // 3 column
        alignItems: 'center',
    },
    slotItemSelected: {
        backgroundColor: '#F0F9FF',
        borderColor: '#0EA5E9',
    },
    slotText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    textSelectedSlot: {
        color: '#0EA5E9',
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 16,
        fontSize: 14,
        color: '#1E293B',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        textAlignVertical: 'top',
        minHeight: 100,
    },
    uploadBtn: {
        height: 120,
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#CBD5E1',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    uploadText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0EA5E9',
        marginTop: 8,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    emergencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF1F2',
        padding: 16,
        borderRadius: 20,
        marginBottom: 20,
    },
    emergencyText: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    emergencyLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#9F1239',
    },
    emergencySub: {
        fontSize: 11,
        color: '#BE123C',
        marginTop: 2,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    bookBtn: {
        backgroundColor: '#1E293B',
        height: 58,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    bookBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
    },
});
