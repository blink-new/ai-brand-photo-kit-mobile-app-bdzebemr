import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  interpolate,
  Easing
} from 'react-native-reanimated';
import { Sparkles, Image as ImageIcon, Zap, Crown } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface ProcessingScreenProps {
  onComplete: (generatedPhotos: any) => void;
  packageType: string;
  photos: string[];
}

const processingSteps = [
  { id: 1, text: 'Analyzing your photos...', duration: 2000 },
  { id: 2, text: 'Generating lifestyle shots...', duration: 3000 },
  { id: 3, text: 'Creating desk scenes...', duration: 2500 },
  { id: 4, text: 'Crafting speaking photos...', duration: 3000 },
  { id: 5, text: 'Building Zoom mockups...', duration: 2000 },
  { id: 6, text: 'Designing LinkedIn banners...', duration: 2500 },
  { id: 7, text: 'Creating IG bio visuals...', duration: 2000 },
  { id: 8, text: 'Finalizing your brand kit...', duration: 1500 }
];

export function ProcessingScreen({ onComplete, packageType, photos }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Start rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );

    // Start scale animation
    scale.value = withRepeat(
      withTiming(1.1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;
    let hasStartedGeneration = false;

    const runProcessing = async () => {
      if (currentStep < processingSteps.length) {
        const step = processingSteps[currentStep];
        
        // Start AI generation on the first step
        if (currentStep === 0 && !hasStartedGeneration) {
          hasStartedGeneration = true;
          generateBrandPhotos();
        }
        
        // Update progress gradually during each step
        const progressIncrement = 100 / processingSteps.length;
        const startProgress = currentStep * progressIncrement;
        const endProgress = (currentStep + 1) * progressIncrement;
        
        let currentProgress = startProgress;
        const progressStep = (endProgress - startProgress) / (step.duration / 50);
        
        progressTimer = setInterval(() => {
          currentProgress += progressStep;
          if (currentProgress <= endProgress) {
            setProgress(Math.min(currentProgress, 100));
          }
        }, 50);

        stepTimer = setTimeout(() => {
          clearInterval(progressTimer);
          setCurrentStep(prev => prev + 1);
        }, step.duration);
      }
    };

    const generateBrandPhotos = async () => {
      try {
        console.log('Starting AI generation with photos:', photos);
        
        // For now, simulate the generation process and return mock data
        // TODO: Uncomment when ready to use real AI generation
        
        setTimeout(() => {
          // Mock generated photos for testing
          const mockGeneratedPhotos = {
            lifestyle: [
              { id: '1', url: photos[0], title: 'Professional Portrait' },
              { id: '2', url: photos[1], title: 'Casual Lifestyle' },
            ],
            desk: [
              { id: '3', url: photos[2], title: 'Workspace Setup' },
              { id: '4', url: photos[3], title: 'Desk Scene' },
            ],
            speaking: [
              { id: '5', url: photos[4], title: 'Speaking Engagement' },
              { id: '6', url: photos[0], title: 'Presentation Mode' },
            ],
            zoom: [
              { id: '7', url: photos[1], title: 'Video Call Ready' },
              { id: '8', url: photos[2], title: 'Professional Zoom' },
            ],
            bonus: {
              linkedin: [
                { id: '9', url: photos[3], title: 'LinkedIn Banner' },
              ],
              instagram: [
                { id: '10', url: photos[4], title: 'IG Bio Visual' },
              ]
            }
          };
          
          onComplete(mockGeneratedPhotos);
        }, processingSteps.length * 300); // Shorter time for testing
        
        /* TODO: Uncomment for real AI generation
        const user = await blink.auth.me();
        
        // Call the edge function to generate photos
        const response = await fetch('https://bdzebemr--generate-brand-photos.functions.blink.new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${blink.auth.getToken()}`,
          },
          body: JSON.stringify({
            photos,
            packageType,
            userId: user.id
          })
        });

        const result = await response.json();
        
        if (result.success) {
          // Wait for all processing steps to complete, then show results
          setTimeout(() => {
            onComplete(result.photos);
          }, processingSteps.length * 2500); // Total processing time
        } else {
          throw new Error(result.error || 'Failed to generate photos');
        }
        */
        
      } catch (error) {
        console.error('Error generating photos:', error);
        Alert.alert(
          'Generation Error', 
          'Failed to generate your brand photos. Please try again.',
          [
            { text: 'OK', onPress: () => onComplete(null) }
          ]
        );
      }
    };

    runProcessing();

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [currentStep, onComplete, photos, packageType]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
    };
  });

  const getPackageIcon = () => {
    switch (packageType) {
      case 'premium':
        return Crown;
      case 'professional':
        return Sparkles;
      default:
        return Zap;
    }
  };

  const getPackageColor = () => {
    switch (packageType) {
      case 'premium':
        return '#F59E0B';
      case 'professional':
        return '#6366F1';
      default:
        return '#10B981';
    }
  };

  const PackageIcon = getPackageIcon();
  const packageColor = getPackageColor();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9']}
        style={styles.background}
      >
        <Animated.View 
          style={styles.content}
          entering={FadeInDown.duration(800)}
        >
          {/* Main Icon */}
          <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
            <LinearGradient
              colors={[packageColor, packageColor + 'CC']}
              style={styles.iconGradient}
            >
              <PackageIcon size={48} color="#FFFFFF" />
            </LinearGradient>
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Creating Your Brand Kit</Text>
          <Text style={styles.subtitle}>
            Our AI is crafting professional photos just for you
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${progress}%`,
                    backgroundColor: packageColor
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}% Complete</Text>
          </View>

          {/* Current Step */}
          <View style={styles.stepContainer}>
            <View style={styles.stepIndicator}>
              <ImageIcon size={20} color={packageColor} />
            </View>
            <Text style={styles.stepText}>
              {currentStep < processingSteps.length 
                ? processingSteps[currentStep].text 
                : 'Your brand kit is ready!'
              }
            </Text>
          </View>

          {/* Features Being Generated */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>What's being created:</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: packageColor }]} />
                <Text style={styles.featureText}>Professional lifestyle photos</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: packageColor }]} />
                <Text style={styles.featureText}>Desk & workspace scenes</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: packageColor }]} />
                <Text style={styles.featureText}>Public speaking images</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: packageColor }]} />
                <Text style={styles.featureText}>Zoom call mockups</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: packageColor }]} />
                <Text style={styles.featureText}>LinkedIn banners</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: packageColor }]} />
                <Text style={styles.featureText}>Instagram bio visuals</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 32,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  stepIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
});