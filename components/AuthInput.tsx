import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface AuthInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    icon: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const AuthInput: React.FC<AuthInputProps> = ({
    placeholder,
    value,
    onChangeText,
    icon,
    secureTextEntry,
    keyboardType,
    autoCapitalize
}) => {
    return (
        <View style={styles.inputWrapper}>
            <Ionicons name={icon as any} size={20} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        height: 58,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#1E293B',
        fontWeight: '600',
    },
});
