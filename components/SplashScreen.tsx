import React, { useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
    onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
    const scale = useSharedValue(0.3);
    const opacity = useSharedValue(0);
    const rotation = useSharedValue(0);

    useEffect(() => {
        // Elegant entrance
        opacity.value = withTiming(1, { duration: 1000 });
        scale.value = withSpring(1, { damping: 12, stiffness: 90 });

        // Subtle rotation during entrance
        rotation.value = withTiming(360, { duration: 1500, easing: Easing.out(Easing.exp) });

        // Auto cleanup - Fade out and exit
        const animationTimeout = setTimeout(() => {
            opacity.value = withTiming(0, { duration: 800 }, (finished) => {
                // Ensure we always trigger complete even if interrupted
                runOnJS(onAnimationComplete)();
            });
        }, 3000);

        // Fail-safe: Force complete after 5 seconds no matter what
        const failSafeTimeout = setTimeout(() => {
            runOnJS(onAnimationComplete)();
        }, 5000);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(failSafeTimeout);
        };
    }, []);

    const logoAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { scale: scale.value },
            { rotate: `${rotation.value}deg` }
        ],
    }));

    const textAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: (1 - opacity.value) * 20 }]
    }));

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Premium Gradient-like Background with Pure CSS-Styles */}
            <View style={styles.background}>
                <View style={[styles.circle, { top: -50, left: -50, backgroundColor: '#1e293b' }]} />
                <View style={[styles.circle, { bottom: -100, right: -100, backgroundColor: '#0f172a' }]} />
            </View>

            <View style={styles.content}>
                {/* CSS-Built Logo Icon */}
                <Animated.View style={[styles.logoCircle, logoAnimatedStyle]}>
                    <View style={styles.iconElement}>
                        {/* Styled elements forming a geometric 'N' / link */}
                        <View style={[styles.bar, { transform: [{ rotate: '45deg' }] }]} />
                        <View style={[styles.bar, { transform: [{ rotate: '-45deg' }], marginTop: -15 }]} />
                    </View>
                </Animated.View>

                {/* Brand Text with Modern Styling */}
                <Animated.View style={[styles.brandContainer, textAnimatedStyle]}>
                    <Text style={styles.brandName}>NEARFIX</Text>
                    <View style={styles.underline} />
                    <Text style={styles.tagline}>YOUR REPAIR PARTNER</Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: -1,
    },
    circle: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.4,
    },
    content: {
        alignItems: 'center',
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 35,
        backgroundColor: '#38BDF8',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
        marginBottom: 30,
        // Modern "Glass" effect via CSS
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    iconElement: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        width: 40,
        height: 8,
        backgroundColor: '#FFF',
        borderRadius: 4,
    },
    brandContainer: {
        alignItems: 'center',
    },
    brandName: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 12,
        includeFontPadding: false,
        textShadowColor: 'rgba(56, 189, 248, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    underline: {
        width: 50,
        height: 4,
        backgroundColor: '#38BDF8',
        borderRadius: 2,
        marginVertical: 10,
    },
    tagline: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '800',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
});
