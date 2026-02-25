import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

const TAGS = ['Professional', 'Fast Service', 'Affordable', 'Honest', 'Clean Work', 'Good Value'];

export default function ReviewScreen() {
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [comment, setComment] = useState('');

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rate Your Experience</Text>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Rating Section */}
                    <View style={styles.ratingSection}>
                        <Animated.View entering={ZoomIn.duration(600)} style={styles.emojiContainer}>
                            <Text style={styles.emojiText}>
                                {rating === 5 ? '🤩' : rating === 4 ? '😊' : rating === 3 ? '😐' : rating === 2 ? '☹️' : rating === 1 ? '😡' : '👋'}
                            </Text>
                        </Animated.View>
                        <Text style={styles.ratingTitle}>How was your experience?</Text>
                        <Text style={styles.ratingSubtitle}>Your feedback helps us improve!</Text>

                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => setRating(star)}
                                    activeOpacity={0.7}
                                    style={styles.starWrapper}
                                >
                                    <Ionicons
                                        name={star <= rating ? "star" : "star-outline"}
                                        size={42}
                                        color={star <= rating ? "#F59E0B" : "#CBD5E1"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Tags Section */}
                    <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
                        <Text style={styles.sectionLabel}>What did you like most?</Text>
                        <View style={styles.tagsContainer}>
                            {TAGS.map((tag) => (
                                <TouchableOpacity
                                    key={tag}
                                    onPress={() => toggleTag(tag)}
                                    style={[
                                        styles.tag,
                                        selectedTags.includes(tag) && styles.tagSelected
                                    ]}
                                >
                                    <Text style={[
                                        styles.tagText,
                                        selectedTags.includes(tag) && styles.tagTextSelected
                                    ]}>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Comment Section */}
                    <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
                        <Text style={styles.sectionLabel}>Write a review (Optional)</Text>
                        <TextInput
                            placeholder="Tell us more about your experience..."
                            placeholderTextColor="#94A3B8"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            style={styles.commentInput}
                            value={comment}
                            onChangeText={setComment}
                        />
                    </Animated.View>

                    {/* Submit Button */}
                    <Animated.View entering={FadeInDown.delay(600)} style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
                            disabled={rating === 0}
                            onPress={() => {
                                alert('Thank you for your review!');
                                router.back();
                            }}
                        >
                            <Text style={styles.submitButtonText}>Submit Review</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    ratingSection: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
    },
    emojiContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emojiText: {
        fontSize: 50,
    },
    ratingTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
        textAlign: 'center',
    },
    ratingSubtitle: {
        fontSize: 15,
        color: '#64748B',
        marginTop: 6,
        textAlign: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 8,
    },
    starWrapper: {
        padding: 4,
    },
    section: {
        marginBottom: 30,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 16,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#F8FAFC',
    },
    tagSelected: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    tagText: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
    },
    tagTextSelected: {
        color: '#FFFFFF',
    },
    commentInput: {
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 20,
        fontSize: 15,
        color: '#1E293B',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        minHeight: 120,
    },
    buttonContainer: {
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: '#1E293B',
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    submitButtonDisabled: {
        backgroundColor: '#CBD5E1',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});
