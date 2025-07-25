import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [lastPressed, setLastPressed] = useState('None');

  const handlePress = (buttonName: string) => {
    console.log(`${buttonName} button pressed`);
    setCounter(prev => prev + 1);
    setLastPressed(buttonName);
    Alert.alert('Button Pressed', `You pressed: ${buttonName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button Test App</Text>
      <Text style={styles.counter}>Counter: {counter}</Text>
      <Text style={styles.lastPressed}>Last Pressed: {lastPressed}</Text>

      {/* Simple button without any complex styling */}
      <Pressable
        style={styles.simpleButton}
        onPress={() => handlePress('Simple')}
      >
        <Text style={styles.buttonText}>Simple Button</Text>
      </Pressable>

      {/* Button with background color */}
      <Pressable
        style={styles.colorButton}
        onPress={() => handlePress('Color')}
      >
        <Text style={styles.buttonText}>Color Button</Text>
      </Pressable>

      {/* Button with press state */}
      <Pressable
        style={({ pressed }) => [
          styles.stateButton,
          pressed && styles.stateButtonPressed
        ]}
        onPress={() => handlePress('State')}
      >
        <Text style={styles.buttonText}>State Button</Text>
      </Pressable>

      {/* Package selection buttons - simplified */}
      <View style={styles.packageSection}>
        <Text style={styles.sectionTitle}>Package Selection Test</Text>
        
        <Pressable
          style={styles.packageButton}
          onPress={() => handlePress('Starter Package')}
        >
          <Text style={styles.packageButtonText}>Starter - $39</Text>
        </Pressable>

        <Pressable
          style={styles.packageButton}
          onPress={() => handlePress('Professional Package')}
        >
          <Text style={styles.packageButtonText}>Professional - $69</Text>
        </Pressable>

        <Pressable
          style={styles.packageButton}
          onPress={() => handlePress('Premium Package')}
        >
          <Text style={styles.packageButtonText}>Premium - $99</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  counter: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#4B5563',
  },
  lastPressed: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#6B7280',
  },
  simpleButton: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  colorButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  stateButton: {
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: 'center',
  },
  stateButtonPressed: {
    backgroundColor: '#059669',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  packageSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  packageButton: {
    backgroundColor: '#6366F1',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  packageButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});