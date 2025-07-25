import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

interface PhotoUploadProps {
  selectedPackage: 'starter' | 'professional' | 'premium';
  onPhotosUploaded: (photos: string[]) => void;
  onBack: () => void;
}

export default function PhotoUpload({ selectedPackage, onPhotosUploaded, onBack }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleBackPress = () => {
    console.log('Back button pressed');
    onBack();
  };

  const handlePhotoSlotPress = async (index: number) => {
    console.log('Photo slot pressed:', index);
    
    Alert.alert(
      'Select Photo',
      'Choose how you want to add a photo',
      [
        {
          text: 'Camera',
          onPress: () => takePhoto(index)
        },
        {
          text: 'Photo Library',
          onPress: () => pickPhoto(index)
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const takePhoto = async (index: number) => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhotos = [...photos];
        newPhotos[index] = result.assets[0].uri;
        setPhotos(newPhotos);
        console.log('Photo taken and added at index:', index);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickPhoto = async (index: number) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhotos = [...photos];
        newPhotos[index] = result.assets[0].uri;
        setPhotos(newPhotos);
        console.log('Photo picked and added at index:', index);
      }
    } catch (error) {
      console.error('Error picking photo:', error);
      Alert.alert('Error', 'Failed to pick photo');
    }
  };

  const handleContinuePress = () => {
    console.log('Continue button pressed, photos:', photos.length);
    
    const validPhotos = photos.filter(photo => photo && photo.length > 0);
    
    if (validPhotos.length < 5) {
      Alert.alert('More Photos Needed', `Please upload all 5 photos. You have ${validPhotos.length} photos.`);
      return;
    }

    onPhotosUploaded(validPhotos);
  };

  const renderPhotoSlot = (index: number) => {
    const hasPhoto = photos[index] && photos[index].length > 0;
    
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => handlePhotoSlotPress(index)}
        className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 justify-center items-center"
      >
        {hasPhoto ? (
          <Image
            source={{ uri: photos[index] }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <View className="w-12 h-12 bg-gray-300 rounded-full justify-center items-center mb-2">
              <Text className="text-gray-600 text-2xl">+</Text>
            </View>
            <Text className="text-gray-500 text-sm">Photo {index + 1}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const validPhotosCount = photos.filter(photo => photo && photo.length > 0).length;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-8 pb-6">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBackPress}
            className="w-10 h-10 bg-gray-100 rounded-full justify-center items-center mr-4"
          >
            <Text className="text-gray-600 text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 flex-1">
            Upload Your Photos
          </Text>
        </View>

        <View className="bg-indigo-50 rounded-xl p-4 mb-6">
          <Text className="text-indigo-800 font-semibold mb-2">
            {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} Package Selected
          </Text>
          <Text className="text-indigo-600 text-sm">
            Upload 5 candid photos for your AI brand photo transformation
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Upload Photos ({validPhotosCount}/5)
          </Text>
          
          <View className="grid grid-cols-2 gap-4 mb-4">
            {[0, 1, 2, 3].map(renderPhotoSlot)}
          </View>
          
          <View className="flex-row justify-center">
            {renderPhotoSlot(4)}
          </View>
        </View>

        <View className="bg-yellow-50 rounded-xl p-4 mb-6">
          <Text className="text-yellow-800 font-semibold mb-2">Photo Tips</Text>
          <Text className="text-yellow-700 text-sm mb-1">• Use clear, well-lit photos</Text>
          <Text className="text-yellow-700 text-sm mb-1">• Face should be clearly visible</Text>
          <Text className="text-yellow-700 text-sm mb-1">• Variety of angles and expressions</Text>
          <Text className="text-yellow-700 text-sm">• Avoid sunglasses or hats</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleContinuePress}
          disabled={validPhotosCount < 5}
          className="rounded-xl overflow-hidden"
        >
          <LinearGradient
            colors={validPhotosCount >= 5 ? ['#6366F1', '#8B5CF6'] : ['#D1D5DB', '#9CA3AF']}
            className="py-4 px-6"
          >
            <Text className="text-white text-lg font-semibold text-center">
              {validPhotosCount >= 5 ? 'Continue to Processing' : `Upload ${5 - validPhotosCount} More Photos`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}