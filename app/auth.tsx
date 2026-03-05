import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert, BackHandler,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AuthInput } from '../components/AuthInput';
import { useAuthStore } from '../hooks/useAuthStore';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login, isLoggedIn, user, logout } = useAuthStore();

    useEffect(() => {
        const backAction = () => {
            handleBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)');
        }
    };

    const toggleAuth = () => {
        setIsLogin(!isLogin);
    };

    const handleAuth = () => {
        if (isLogin) {
            if (!email || !password) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
            }
            // Simulate Login
            login({
                id: '1',
                name: 'Vivek Palsana',
                email: email,
                avatar: 'https://i.pravatar.cc/150?u=vivek'
            });
            Alert.alert('Success', 'Welcome back, Vivek!');
            router.replace('/(tabs)');
        } else {
            if (!name || !email || !password) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
            }
            // Simulate Sign Up
            login({
                id: '1',
                name: name,
                email: email,
                avatar: `https://i.pravatar.cc/150?u=${name}`
            });
            Alert.alert('Success', `Welcome to NearFix, ${name}!`);
            router.replace('/(tabs)');
        }
    };

    const handleLogout = () => {
        logout();
        Alert.alert('Success', 'Logged out successfully');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Top Bar */}
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#1E293B" />
                        </TouchableOpacity>
                    </View>

                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <Animated.Text entering={FadeInDown.delay(200)} style={styles.title}>
                            {isLoggedIn ? `Hello, ${user?.name}!` : (isLogin ? 'Welcome Back!' : 'Create Account')}
                        </Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(300)} style={styles.subtitle}>
                            {isLoggedIn
                                ? 'You are currently signed in to your account'
                                : (isLogin
                                    ? 'Sign in to your account to continue'
                                    : 'Join NearFix to find your perfect repair partner')}
                        </Animated.Text>
                    </View>

                    {/* Form Section */}
                    {!isLoggedIn ? (
                        <Animated.View entering={FadeInDown.delay(400)} style={styles.formContainer}>
                            {!isLogin && (
                                <AuthInput
                                    placeholder="Full Name"
                                    icon="person-outline"
                                    value={name}
                                    onChangeText={setName}
                                />
                            )}

                            <AuthInput
                                placeholder="Email Address"
                                icon="mail-outline"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <AuthInput
                                placeholder="Password"
                                icon="lock-closed-outline"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            {isLogin && (
                                <TouchableOpacity style={styles.forgotPassword}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity style={styles.mainButton} onPress={handleAuth}>
                                <Text style={styles.mainButtonText}>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ) : (
                        <View style={styles.loggedInContainer}>
                            <View style={styles.profileBadge}>
                                <Ionicons name="person-circle" size={80} color="#38BDF8" />
                                <Text style={styles.profileName}>{user?.name}</Text>
                                <Text style={styles.profileEmail}>{user?.email}</Text>
                            </View>
                            <TouchableOpacity style={[styles.mainButton, { backgroundColor: '#EF4444', shadowColor: '#EF4444' }]} onPress={handleLogout}>
                                <Text style={styles.mainButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Bottom Section */}
                    {!isLoggedIn && (
                        <Animated.View entering={FadeInUp.delay(500)} style={styles.bottomSection}>
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>OR</Text>
                                <View style={styles.divider} />
                            </View>

                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Ionicons name="logo-google" size={24} color="#EF4444" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Ionicons name="logo-facebook" size={24} color="#3B82F6" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Ionicons name="logo-apple" size={24} color="#000000" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                </Text>
                                <TouchableOpacity onPress={toggleAuth}>
                                    <Text style={styles.toggleText}>
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    )}
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
    flex: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    topBar: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 15,
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
    headerSection: {
        paddingHorizontal: 30,
        marginTop: 20,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1E293B',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 10,
        lineHeight: 24,
    },
    formContainer: {
        paddingHorizontal: 30,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#38BDF8',
        fontWeight: '700',
    },
    mainButton: {
        backgroundColor: '#38BDF8',
        borderRadius: 16,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 8,
    },
    mainButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    bottomSection: {
        marginTop: 40,
        paddingHorizontal: 30,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#F1F5F9',
    },
    dividerText: {
        marginHorizontal: 15,
        color: '#94A3B8',
        fontSize: 12,
        fontWeight: '700',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    socialButton: {
        width: (width - 100) / 3,
        height: 58,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    toggleText: {
        fontSize: 14,
        color: '#38BDF8',
        fontWeight: '700',
    },
    loggedInContainer: {
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    profileBadge: {
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        padding: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    profileName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1E293B',
        marginTop: 15,
    },
    profileEmail: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 5,
    },
});
