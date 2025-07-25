import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [lastPressed, setLastPressed] = useState('None');

  const handlePress = (packageName: string) => {
    console.log('Button pressed:', packageName);
    setLastPressed(packageName);
    setCounter(prev => prev + 1);
    Alert.alert('Button Pressed!', `You pressed ${packageName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Button Test App</Text>
        <Text style={styles.subtitle}>Counter: {counter}</Text>
        <Text style={styles.subtitle}>Last Pressed: {lastPressed}</Text>
        
        {/* Simple test button using Pressable */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#059669' : '#10B981' }
          ]}
          onPress={() => handlePress('Test Button')}
        >
          <Text style={styles.buttonText}>Simple Test Button</Text>
        </Pressable>
        
        {/* Package selection buttons using Pressable */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#4F46E5' : '#6366F1' }
          ]}
          onPress={() => handlePress('Starter Package')}
        >
          <Text style={styles.buttonText}>Starter - $39</Text>
        </Pressable>
        
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#D97706' : '#F59E0B' }
          ]}
          onPress={() => handlePress('Professional Package')}
        >
          <Text style={styles.buttonText}>Professional - $69</Text>
        </Pressable>
        
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#DC2626' : '#EF4444' }
          ]}
          onPress={() => handlePress('Premium Package')}
        >
          <Text style={styles.buttonText}>Premium - $99</Text>
        </Pressable>

        {/* Alternative button using onTouchEnd */}
        <View
          style={[styles.button, { backgroundColor: '#8B5CF6' }]}
          onTouchEnd={() => handlePress('Touch End Button')}
        >
          <Text style={styles.buttonText}>Touch End Test</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});