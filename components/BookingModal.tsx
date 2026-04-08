import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useAuthStore } from '../hooks/useAuthStore';

const MOCK_PROVIDERS = [
    {
        id: 1,
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?u=michael',
        rating: '4.9',
        reviews: '124+',
        experience: '8 Years',
        distance: '1.2 km away',
        bio: 'Certified professional specializing in quick diagnostics and highly durable repairs.'
    },
    {
        id: 2,
        name: 'Sarah Jenkins',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        rating: '4.8',
        reviews: '89+',
        experience: '5 Years',
        distance: '2.5 km away',
        bio: 'Expert in modern installations and general fixing. Friendly and highly efficient.'
    },
    {
        id: 3,
        name: 'David R.',
        avatar: 'https://i.pravatar.cc/150?u=david',
        rating: '4.7',
        reviews: '210+',
        experience: '12 Years',
        distance: '3.8 km away',
        bio: 'Veteran repair specialist with expertise in complex problem resolving and long-term fixes.'
    }
];

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

const PAYMENT_OPTIONS = [
    { id: 'card', title: 'Credit / Debit Card', icon: 'card-outline', color: '#3B82F6' },
    { id: 'upi', title: 'UPI (GPay, PhonePe, Paytm)', icon: 'phone-portrait-outline', color: '#10B981' },
    { id: 'paypal', title: 'PayPal', icon: 'logo-paypal', color: '#00457C' },
    { id: 'cash', title: 'Cash on Service', icon: 'cash-outline', color: '#F59E0B' },
];

export const BookingModal: React.FC<BookingModalProps> = ({ visible, onClose, subService }) => {
    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isEmergency, setIsEmergency] = useState(false);
    const [step, setStep] = useState<'details' | 'provider' | 'payment'>('details');
    const [selectedProvider, setSelectedProvider] = useState<number>(0);
    const [selectedPayment, setSelectedPayment] = useState<string>('card');
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (visible && !isLoggedIn) {
            onClose();
            router.push('/auth');
        }
    }, [visible, isLoggedIn]);

    const handleClose = () => {
        setStep('details');
        onClose();
    };

    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' }),
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
        if (step === 'details') {
            if (!selectedSlot) {
                Alert.alert('Selection Required', 'Please choose a time slot');
                return;
            }
            setStep('provider');
        } else if (step === 'provider') {
            setStep('payment');
        } else {
            const paymentMethodName = PAYMENT_OPTIONS.find(p => p.id === selectedPayment)?.title || 'Selected Method';
            Alert.alert(
                'Booking Confirmed',
                `Your ${subService?.name} is scheduled for ${dates[selectedDate].day}, ${dates[selectedDate].date} at ${selectedSlot} with ${MOCK_PROVIDERS[selectedProvider].name}.\nPayment mode: ${paymentMethodName}`,
                [{ text: 'Great!', onPress: handleClose }]
            );
        }
    };

    if (!subService) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity 
                            onPress={() => {
                                if (step === 'payment') setStep('provider');
                                else if (step === 'provider') setStep('details');
                                else handleClose();
                            }} 
                            style={styles.closeBtn}
                        >
                            <Ionicons name={step === 'details' ? "close" : "arrow-back"} size={24} color="#1E293B" />
                        </TouchableOpacity>
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerTitle}>{step === 'details' ? 'Customize Booking' : step === 'provider' ? 'Matched Professional' : 'Payment Details'}</Text>
                            <Text style={styles.headerSubTitle}>{subService.name}</Text>
                        </View>
                        <View style={[styles.miniIcon, { backgroundColor: subService.color }]}>
                            <MaterialCommunityIcons name={subService.icon as any} size={20} color={subService.iconColor} />
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {step === 'details' ? (
                        <>
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
                                        <Text style={[styles.monthText, selectedDate === index && styles.textSelected]}>{item.month}</Text>
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
                        </>
                    ) : step === 'provider' ? (
                        <Animated.View key="provider-step" entering={FadeInRight} style={styles.providerContainer}>
                            <Text style={styles.sectionLabel}>Available Professionals Near You</Text>
                            {MOCK_PROVIDERS.map((provider, index) => (
                                <TouchableOpacity 
                                    key={provider.id} 
                                    style={[styles.providerListCard, selectedProvider === index && styles.providerListCardSelected]}
                                    onPress={() => setSelectedProvider(index)}
                                >
                                    <View style={styles.providerListHeader}>
                                        <Image source={{ uri: provider.avatar }} style={styles.providerListAvatar} />
                                        <View style={styles.providerListInfo}>
                                            <Text style={styles.providerNameText}>{provider.name}</Text>
                                            <Text style={styles.providerDistanceText}>{provider.distance} • {provider.experience} Exp.</Text>
                                            <View style={styles.providerListStats}>
                                                <Ionicons name="star" size={14} color="#F59E0B" />
                                                <Text style={styles.providerListRating}>{provider.rating} ({provider.reviews} Reviews)</Text>
                                            </View>
                                        </View>
                                        <View style={styles.radioCircle}>
                                            {selectedProvider === index && <View style={styles.radioInner} />}
                                        </View>
                                    </View>
                                    {selectedProvider === index && (
                                        <Animated.View entering={FadeInRight} style={styles.providerListDetails}>
                                            <View style={styles.statDividerHoriz} />
                                            <Text style={styles.providerBio}>{provider.bio}</Text>
                                            <View style={styles.guaranteeRow}>
                                                <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                                                <Text style={[styles.guaranteeText, {color: '#10B981'}]}>Background Checked & Verified</Text>
                                            </View>
                                        </Animated.View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    ) : (
                        <Animated.View key="payment-step" entering={FadeInRight} style={styles.paymentContainer}>
                            <Text style={styles.sectionLabel}>Select Payment Method</Text>
                            {PAYMENT_OPTIONS.map((option) => (
                                <TouchableOpacity 
                                    key={option.id}
                                    style={[styles.paymentCard, selectedPayment === option.id && styles.paymentCardSelected]}
                                    onPress={() => setSelectedPayment(option.id)}
                                >
                                    <View style={[styles.paymentIconContainer, { backgroundColor: `${option.color}15` }]}>
                                        <Ionicons name={option.icon as any} size={24} color={option.color} />
                                    </View>
                                    <Text style={styles.paymentTitle}>{option.title}</Text>
                                    <View style={styles.radioCircle}>
                                        {selectedPayment === option.id && <View style={styles.radioInner} />}
                                    </View>
                                </TouchableOpacity>
                            ))}

                            <View style={styles.priceSummaryContainer}>
                                <Text style={styles.priceSummaryTitle}>Price Summary</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Service Fee</Text>
                                    <Text style={styles.priceValue}>$49.00</Text>
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Taxes & Fees</Text>
                                    <Text style={styles.priceValue}>$5.00</Text>
                                </View>
                                <View style={styles.priceDivider} />
                                <View style={[styles.priceRow, styles.totalRow]}>
                                    <Text style={styles.totalLabel}>Total Amount</Text>
                                    <Text style={styles.totalValue}>$54.00</Text>
                                </View>
                            </View>
                        </Animated.View>
                    )}
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
                            <Text style={styles.bookBtnText}>{step === 'details' ? 'Find Provider' : step === 'provider' ? 'Proceed to Pay' : 'Confirm & Pay'}</Text>
                            <Ionicons name={step === 'details' ? "search" : step === 'provider' ? "card-outline" : "checkmark-circle"} size={20} color="#FFFFFF" />
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
        width: 65,
        height: 85,
        borderRadius: 18,
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
        fontWeight: '800',
        color: '#1E293B',
        marginTop: 2,
    },
    monthText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#475569',
        marginTop: 2,
        textTransform: 'uppercase',
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
    providerContainer: {
        paddingBottom: 20,
    },
    providerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    providerAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    providerName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
    },
    providerSubText: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
        marginBottom: 20,
    },
    providerStats: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 16,
        width: '100%',
        marginBottom: 24,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 10,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginTop: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    providerBioBox: {
        width: '100%',
        alignItems: 'flex-start',
    },
    providerBio: {
        fontSize: 14,
        lineHeight: 22,
        color: '#475569',
        marginBottom: 20,
    },
    guaranteeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    guaranteeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0EA5E9',
        marginLeft: 8,
    },
    providerListCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 1,
    },
    providerListCardSelected: {
        borderColor: '#0EA5E9',
        backgroundColor: '#F8FAFC',
    },
    providerListHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    providerListAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    providerListInfo: {
        flex: 1,
        marginLeft: 16,
    },
    providerNameText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E293B',
    },
    providerDistanceText: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },
    providerListStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    providerListRating: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
        marginLeft: 4,
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#CBD5E1',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    radioInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#0EA5E9',
    },
    providerListDetails: {
        marginTop: 16,
    },
    statDividerHoriz: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginBottom: 16,
    },
    paymentContainer: {
        paddingBottom: 20,
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 5,
        elevation: 1,
    },
    paymentCardSelected: {
        borderColor: '#0EA5E9',
        backgroundColor: '#F8FAFC',
    },
    paymentIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    paymentTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
    priceSummaryContainer: {
        marginTop: 24,
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    priceSummaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    priceLabel: {
        fontSize: 14,
        color: '#64748B',
    },
    priceValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    priceDivider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 12,
    },
    totalRow: {
        marginBottom: 0,
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0EA5E9',
    },
});
