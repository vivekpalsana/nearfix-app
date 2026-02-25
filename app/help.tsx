import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

const FAQ_DATA = [
    {
        question: 'How do I book a service?',
        answer: 'You can book a service by selecting a category from the home screen, choosing your specific service, and clicking on the "Book Now" button.',
    },
    {
        question: 'Are the professionals safe?',
        answer: 'Yes, all NearFix professionals undergo a rigorous background check and training process to ensure your safety and quality of service.',
    },
    {
        question: 'What if I am not satisfied?',
        answer: 'We offer a service guarantee. If you are not satisfied with the work, contact us within 24 hours, and we will make it right.',
    },
    {
        question: 'How do I pay for the service?',
        answer: 'We support various payment methods including credit cards, digital wallets, and cash on delivery after the service is completed.',
    },
];

const HELP_CATEGORIES = [
    { title: 'Payments', icon: 'card-outline', color: '#6366F1' },
    { title: 'Booking', icon: 'calendar-outline', color: '#F59E0B' },
    { title: 'Refunds', icon: 'refresh-outline', color: '#EF4444' },
    { title: 'Account', icon: 'person-outline', color: '#10B981' },
];

export default function HelpScreen() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <TouchableOpacity style={styles.supportButton}>
                    <Ionicons name="chatbubbles-outline" size={24} color="#3B82F6" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search Bar */}
                <Animated.View entering={FadeInDown.duration(600)} style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search-outline" size={20} color="#94A3B8" />
                        <TextInput
                            placeholder="How can we help you?"
                            placeholderTextColor="#94A3B8"
                            style={styles.searchInput}
                        />
                    </View>
                </Animated.View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <View style={styles.categoryGrid}>
                        {HELP_CATEGORIES.map((cat, index) => (
                            <TouchableOpacity key={index} style={styles.categoryCard}>
                                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '15' }]}>
                                    <Ionicons name={cat.icon as any} size={24} color={cat.color} />
                                </View>
                                <Text style={styles.categoryText}>{cat.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* FAQs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    {FAQ_DATA.map((faq, index) => (
                        <Animated.View
                            key={index}
                            layout={Layout.springify()}
                            entering={FadeInDown.delay(200 + index * 100)}
                            style={styles.faqCard}
                        >
                            <TouchableOpacity
                                onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                style={styles.faqHeader}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.faqQuestion}>{faq.question}</Text>
                                <Ionicons
                                    name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color="#64748B"
                                />
                            </TouchableOpacity>
                            {expandedIndex === index && (
                                <View style={styles.faqAnswerContainer}>
                                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                                </View>
                            )}
                        </Animated.View>
                    ))}
                </View>

                {/* Contact Support CTA */}
                <View style={styles.contactCard}>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactTitle}>Still need help?</Text>
                        <Text style={styles.contactDesc}>Our support team is available 24/7</Text>
                    </View>
                    <TouchableOpacity style={styles.contactButton}>
                        <Text style={styles.contactButtonText}>Contact Us</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    supportButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    searchContainer: {
        padding: 20,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 15,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#1E293B',
    },
    section: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 16,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    categoryCard: {
        width: '48%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    categoryIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#475569',
    },
    faqCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
    },
    faqQuestion: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
        flex: 1,
        paddingRight: 10,
    },
    faqAnswerContainer: {
        paddingHorizontal: 18,
        paddingBottom: 18,
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
    },
    faqAnswer: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 22,
        marginTop: 10,
    },
    contactCard: {
        margin: 20,
        marginTop: 40,
        padding: 24,
        backgroundColor: '#1E293B',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contactInfo: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
    },
    contactDesc: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 4,
    },
    contactButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    contactButtonText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 13,
    },
});
