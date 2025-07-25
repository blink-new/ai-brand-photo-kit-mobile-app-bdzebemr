import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface ProcessingScreenProps {
  photos: string[];
  selectedPackage: Package | null;
  onComplete: (photos: any) => void;
  onBack: () => void;
}

const processingSteps = [
  'Analyzing your photos...',
  'Generating lifestyle shots...',
  'Creating desk scenes...',
  'Producing speaking photos...',
  'Crafting Zoom mockups...',
  'Creating LinkedIn banners...',
  'Designing IG bio visuals...',
  'Finalizing your brand kit...'
];

export default function ProcessingScreen({ photos, selectedPackage, onComplete, onBack }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Generate mock photos for demo
          const mockPhotos = {
            lifestyle: photos.slice(0, 2).map(p => ({ url: p, category: 'lifestyle' })),
            desk: photos.slice(2, 3).map(p => ({ url: p, category: 'desk' })),
            speaking: photos.slice(3, 4).map(p => ({ url: p, category: 'speaking' })),
            zoom: photos.slice(4, 5).map(p => ({ url: p, category: 'zoom' })),
            bonus: {
              linkedin: [{ url: photos[0], category: 'linkedin' }],
              instagram: photos.slice(0, 3).map(p => ({ url: p, category: 'instagram' }))
            }
          };
          
          setTimeout(() => {
            console.log('Processing complete, calling onComplete');
            onComplete(mockPhotos);
          }, 1000);
          
          return 100;
        }
        return prev + 2;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [photos, onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 1500);

    return () => clearInterval(stepInterval);
  }, []);

  const handleBack = () => {
    console.log('Back pressed from processing');
    Alert.alert(
      'Cancel Processing?',
      'Are you sure you want to go back? Your progress will be lost.',
      [
        { text: 'Continue Processing', style: 'cancel' },
        { text: 'Go Back', onPress: onBack }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        
        <Text style={styles.title}>Creating Your Brand Kit</Text>
        <Text style={styles.subtitle}>
          AI is generating your {selectedPackage?.name} brand photo kit
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6', '#EC4899']}
            style={[styles.progressRing, { transform: [{ rotate: `${progress * 3.6}deg` }] }]}
          >
            <View style={styles.progressInner}>
              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.currentStep}>{processingSteps[currentStep]}</Text>
        
        <View style={styles.stepsList}>
          {processingSteps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={[
                styles.stepIndicator,
                index <= currentStep && styles.stepIndicatorActive
              ]}>
                {index < currentStep ? (
                  <Text style={styles.stepCheckmark}>✓</Text>
                ) : (
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                )}
              </View>
              <Text style={[
                styles.stepText,
                index <= currentStep && styles.stepTextActive
              ]}>
                {step}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This usually takes 2-3 minutes. Please don't close the app.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 20,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressCircle: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
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
  stepContainer: {
    flex: 1,
  },
  currentStep: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6366F1',
    textAlign: 'center',
    marginBottom: 30,
  },
  stepsList: {
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepIndicatorActive: {
    backgroundColor: '#6366F1',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  stepCheckmark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stepText: {
    fontSize: 16,
    color: '#9CA3AF',
    flex: 1,
  },
  stepTextActive: {
    color: '#1F2937',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});