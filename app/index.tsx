import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('test');
  const [counter, setCounter] = useState(0);

  console.log('App render - Current screen:', currentScreen, 'Counter:', counter);

  const handleTestPress = () => {
    console.log('TEST BUTTON PRESSED!');
    setCounter(prev => prev + 1);
    Alert.alert('Success!', `Button pressed ${counter + 1} times`);
  };

  const handleNavigatePress = () => {
    console.log('NAVIGATE BUTTON PRESSED!');
    setCurrentScreen(currentScreen === 'test' ? 'second' : 'test');
  };

  if (currentScreen === 'second') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.content}>
          <Text style={styles.title}>Second Screen</Text>
          <Text style={styles.subtitle}>Navigation is working!</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleNavigatePress}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Touch Test</Text>
        <Text style={styles.subtitle}>Testing button responsiveness</Text>
        <Text style={styles.counter}>Button pressed: {counter} times</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleTestPress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Test Button</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={handleNavigatePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Navigate Test</Text>
        </TouchableOpacity>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            If these buttons work, we'll add back the full app features step by step.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  counter: {
    fontSize: 18,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  instructionText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});