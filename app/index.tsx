import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  const handlePress = (packageName: string) => {
    console.log('Button pressed:', packageName);
    Alert.alert('Button Pressed!', `You pressed ${packageName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Button Test</Text>
        
        {/* Simple test button first */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#10B981' }]}
          onPress={() => handlePress('Test Button')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Simple Test Button</Text>
        </TouchableOpacity>
        
        {/* Package selection buttons */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6366F1' }]}
          onPress={() => handlePress('Starter Package')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Starter - $39</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#F59E0B' }]}
          onPress={() => handlePress('Professional Package')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Professional - $69</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#EF4444' }]}
          onPress={() => handlePress('Premium Package')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Premium - $99</Text>
        </TouchableOpacity>
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
    marginBottom: 32,
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