import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [screen, setScreen] = useState('main');

  const handleTestPress = () => {
    console.log('Test button pressed!');
    setCounter(prev => prev + 1);
    Alert.alert('Success!', `Button pressed ${counter + 1} times`);
  };

  const handleNavigatePress = () => {
    console.log('Navigate button pressed!');
    setScreen(screen === 'main' ? 'second' : 'main');
    Alert.alert('Navigation', `Switched to ${screen === 'main' ? 'second' : 'main'} screen`);
  };

  const handlePackagePress = (packageName: string) => {
    console.log('Package button pressed:', packageName);
    Alert.alert('Package Selected', `You selected ${packageName} package!`);
  };

  if (screen === 'second') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Second Screen</Text>
          <Text style={styles.subtitle}>Navigation test successful!</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigatePress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Back to Main</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Brand Photo Kit</Text>
        <Text style={styles.subtitle}>Touch Test & Package Selection</Text>
        
        {/* Touch Test Buttons */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>Touch Test</Text>
          <Text style={styles.counter}>Counter: {counter}</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.testButton]}
            onPress={handleTestPress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Test Button</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.navButton]}
            onPress={handleNavigatePress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Navigate Test</Text>
          </TouchableOpacity>
        </View>

        {/* Package Selection */}
        <View style={styles.packageSection}>
          <Text style={styles.sectionTitle}>Package Selection</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.starterButton]}
            onPress={() => handlePackagePress('Starter')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Starter - $39</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.proButton]}
            onPress={() => handlePackagePress('Professional')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Professional - $69</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.premiumButton]}
            onPress={() => handlePackagePress('Premium')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Premium - $99</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  testSection: {
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  packageSection: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  counter: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButton: {
    backgroundColor: '#10B981',
  },
  navButton: {
    backgroundColor: '#3B82F6',
  },
  starterButton: {
    backgroundColor: '#6366F1',
  },
  proButton: {
    backgroundColor: '#F59E0B',
  },
  premiumButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});