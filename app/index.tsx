import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const navigateToReadMinds = () => {
    router.push('/read-minds');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={navigateToSettings}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={navigateToReadMinds}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Read Minds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 40,
  },
  button: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
