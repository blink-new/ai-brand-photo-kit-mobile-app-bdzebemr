import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface PhotoUploadProps {
  selectedPackage: Package | null;
  onPhotosUploaded: (photos: string[]) => void;
  onBack: () => void;
}

export default function PhotoUpload({ selectedPackage, onPhotosUploaded, onBack }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoSlotPress = async (index: number) => {
    console.log('Photo slot pressed:', index);
    
    Alert.alert(
      'Select Photo',
      'Choose how you want to add a photo',
      [
        { text: 'Camera', onPress: () => takePhoto(index) },
        { text: 'Photo Library', onPress: () => pickPhoto(index) },
        { text: 'Cancel', style: 'cancel' }
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

  const handleContinue = () => {
    console.log('Continue pressed with photos:', photos.length);
    if (photos.filter(p => p).length === 5) {
      onPhotosUploaded(photos);
    } else {
      Alert.alert('Incomplete', 'Please upload all 5 photos before continuing');
    }
  };

  const handleBack = () => {
    console.log('Back pressed from photo upload');
    onBack();
  };

  const photoCount = photos.filter(p => p).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
        
        <Text style={styles.title}>Upload Your Photos</Text>
        <Text style={styles.subtitle}>
          Upload 5 candid photos for your {selectedPackage?.name} brand photo kit
        </Text>
        <Text style={styles.progress}>Photos: {photoCount}/5</Text>
      </View>

      <View style={styles.photosGrid}>
        {[0, 1, 2, 3, 4].map((index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.photoSlot,
              pressed && styles.photoSlotPressed
            ]}
            onPress={() => handlePhotoSlotPress(index)}
          >
            {photos[index] ? (
              <Image source={{ uri: photos[index] }} style={styles.photoImage} />
            ) : (
              <View style={styles.emptySlot}>
                <Text style={styles.plusIcon}>+</Text>
                <Text style={styles.slotText}>Add Photo {index + 1}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.guidelines}>
        <Text style={styles.guidelinesTitle}>Photo Guidelines:</Text>
        <Text style={styles.guidelineText}>• Use high-quality, well-lit photos</Text>
        <Text style={styles.guidelineText}>• Include variety: close-up, full body, different angles</Text>
        <Text style={styles.guidelineText}>• Avoid sunglasses or heavy shadows on face</Text>
        <Text style={styles.guidelineText}>• Casual, natural expressions work best</Text>
      </View>

      {photoCount === 5 && (
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continueButtonPressed
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue to AI Processing</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    marginBottom: 8,
  },
  progress: {
    fontSize: 18,
    color: '#6366F1',
    fontWeight: '600',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  photoSlot: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoSlotPressed: {
    opacity: 0.8,
  },
  emptySlot: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  plusIcon: {
    fontSize: 32,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  slotText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  guidelines: {
    backgroundColor: '#F0F9FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  guidelineText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonPressed: {
    opacity: 0.8,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});