import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (email === 'admin@nearfix.com' && password === 'admin123') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                router.replace('/admin/dashboard');
            }, 1500);
        } else {
            Alert.alert('Access Denied', 'Invalid Admin Credentials.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <View style={styles.content}>
                    <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="shield-checkmark" size={40} color="#FFFFFF" />
                        </View>
                        <Text style={styles.title}>Admin Panel</Text>
                        <Text style={styles.subtitle}>Secure Access Only</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400)} style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#94A3B8" />
                            <TextInput
                                style={styles.input}
                                placeholder="Admin Email"
                                placeholderTextColor="#94A3B8"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#94A3B8"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity 
                            style={[styles.loginBtn, loading && { opacity: 0.7 }]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.loginBtnText}>Login to Dashboard</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <Text style={styles.backBtnText}>Back to App</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A', // Deep dark for admin
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8',
        marginTop: 5,
    },
    form: {
        backgroundColor: '#1E293B',
        padding: 30,
        borderRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 20,
        height: 56,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#FFFFFF',
        fontSize: 15,
    },
    loginBtn: {
        backgroundColor: '#3B82F6',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    backBtn: {
        marginTop: 20,
        alignItems: 'center',
    },
    backBtnText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '600',
    },
});
