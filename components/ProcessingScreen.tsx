import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProcessingScreenProps {
  photos: string[];
  selectedPackage: 'starter' | 'professional' | 'premium';
  onComplete: (photos: any) => void;
  onBack: () => void;
}

export default function ProcessingScreen({ photos, selectedPackage, onComplete, onBack }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Analyzing photos...');
  const [rotateValue] = useState(new Animated.Value(0));

  const steps = [
    'Analyzing photos...',
    'Generating lifestyle shots...',
    'Creating desk scenes...',
    'Producing speaking images...',
    'Crafting Zoom backgrounds...',
    'Creating LinkedIn banners...',
    'Generating IG visuals...',
    'Finalizing your brand kit...'
  ];

  useEffect(() => {
    // Start rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    // Simulate processing steps
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex]);
        setProgress(((stepIndex + 1) / steps.length) * 100);
        stepIndex++;
      } else {
        clearInterval(interval);
        // Generate mock photos for testing
        const mockPhotos = {
          lifestyle: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          ],
          desk: [
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
          ],
          speaking: [
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
            'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400',
          ],
          zoom: [
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
            'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400',
          ],
          bonus: [
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
            'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400',
          ]
        };
        
        setTimeout(() => {
          onComplete(mockPhotos);
        }, 1000);
      }
    }, 1500);

    return () => {
      clearInterval(interval);
      rotateAnimation.stop();
    };
  }, []);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Creating Your Brand Kit</Text>
        <Text style={styles.subtitle}>
          Our AI is transforming your photos into professional brand images
        </Text>

        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressCircle, { transform: [{ rotate }] }]}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6', '#F59E0B']}
              style={styles.gradientCircle}
            >
              <View style={styles.innerCircle}>
                <Text style={styles.progressText}>{Math.round(progress)}%</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        <Text style={styles.stepText}>{currentStep}</Text>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[
                styles.stepIndicator,
                { backgroundColor: index <= (progress / 100) * steps.length - 1 ? '#10B981' : '#E5E7EB' }
              ]} />
              <Text style={[
                styles.stepLabel,
                { color: index <= (progress / 100) * steps.length - 1 ? '#374151' : '#9CA3AF' }
              ]}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            This usually takes 2-3 minutes. We're creating high-quality professional photos 
            tailored specifically for your {selectedPackage} package.
          </Text>
        </View>
      </View>
    </View>
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: '600',
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
    marginBottom: 48,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressCircle: {
    width: 120,
    height: 120,
  },
  gradientCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  stepText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 32,
  },
  stepsContainer: {
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  stepLabel: {
    fontSize: 14,
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});