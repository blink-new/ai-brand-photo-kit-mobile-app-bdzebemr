import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProcessingScreenProps {
  photos: string[];
  selectedPackage: 'starter' | 'professional' | 'premium';
  onComplete: (photos: any) => void;
  onBack: () => void;
}

export default function ProcessingScreen({ photos, selectedPackage, onComplete, onBack }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Analyzing your photos...',
    'Generating lifestyle shots...',
    'Creating desk scenes...',
    'Producing speaking photos...',
    'Crafting Zoom backgrounds...',
    'Creating bonus content...',
    'Finalizing your brand kit...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Generate mock photos for testing
          const mockPhotos = {
            lifestyle: photos.slice(0, 3).map(photo => ({ url: photo, category: 'lifestyle' })),
            desk: photos.slice(0, 2).map(photo => ({ url: photo, category: 'desk' })),
            speaking: photos.slice(0, 2).map(photo => ({ url: photo, category: 'speaking' })),
            zoom: photos.slice(0, 2).map(photo => ({ url: photo, category: 'zoom' })),
            bonus: {
              linkedinBanners: photos.slice(0, 2).map(photo => ({ url: photo, type: 'linkedin' })),
              igBioVisuals: photos.slice(0, 2).map(photo => ({ url: photo, type: 'instagram' }))
            }
          };
          
          setTimeout(() => {
            onComplete(mockPhotos);
          }, 1000);
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [photos, onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(stepTimer);
  }, []);

  const handleBackPress = () => {
    console.log('Back button pressed from processing');
    onBack();
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-8 pb-6 flex-1">
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBackPress}
            className="w-10 h-10 bg-gray-100 rounded-full justify-center items-center mr-4"
          >
            <Text className="text-gray-600 text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 flex-1">
            Processing Photos
          </Text>
        </View>

        <View className="flex-1 justify-center items-center">
          <View className="w-32 h-32 mb-8">
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              className="w-full h-full rounded-full justify-center items-center"
              style={{
                transform: [{ rotate: `${progress * 3.6}deg` }]
              }}
            >
              <View className="w-24 h-24 bg-white rounded-full justify-center items-center">
                <Text className="text-2xl font-bold text-indigo-600">
                  {Math.round(progress)}%
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Creating Your Brand Photos
          </Text>

          <Text className="text-lg text-indigo-600 mb-8 text-center">
            {steps[currentStep]}
          </Text>

          <View className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <View 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </View>

          <View className="bg-indigo-50 rounded-xl p-6 w-full">
            <Text className="text-indigo-800 font-semibold mb-2 text-center">
              {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} Package
            </Text>
            <Text className="text-indigo-600 text-center">
              Generating professional photos for your brand
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}