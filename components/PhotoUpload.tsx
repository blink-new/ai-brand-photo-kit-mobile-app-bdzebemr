import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

interface PhotoUploadProps {
  selectedPackage: 'starter' | 'professional' | 'premium';
  onPhotosUploaded: (photos: string[]) => void;
  onBack: () => void;
}

export default function PhotoUpload({ selectedPackage, onPhotosUploaded, onBack }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);

  const pickImage = async (index: number) => {
    console.log('Pick image for slot:', index);
    
    Alert.alert(
      'Select Photo',
      'Choose how you want to add a photo',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(index),
        },
        {
          text: 'Photo Library',
          onPress: () => openLibrary(index),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async (index: number) => {
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
        console.log('Photo added from camera:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const openLibrary = async (index: number) => {
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
        console.log('Photo added from library:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Library error:', error);
      Alert.alert('Error', 'Failed to open photo library');
    }
  };

  const handleContinue = () => {
    const validPhotos = photos.filter(photo => photo && photo.length > 0);
    if (validPhotos.length < 5) {
      Alert.alert('Incomplete', 'Please upload all 5 photos before continuing');
      return;
    }
    
    console.log('Continuing with photos:', validPhotos.length);
    onPhotosUploaded(validPhotos);
  };

  const validPhotosCount = photos.filter(photo => photo && photo.length > 0).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>Upload Your Photos</Text>
          <Text style={styles.subtitle}>
            Upload 5 candid photos for your {selectedPackage} package
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Photos: {validPhotosCount}/5
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(validPhotosCount / 5) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.photosGrid}>
          {[0, 1, 2, 3, 4].map((index) => (
            <TouchableOpacity
              key={index}
              style={styles.photoSlot}
              onPress={() => pickImage(index)}
              activeOpacity={0.7}
            >
              {photos[index] ? (
                <Image source={{ uri: photos[index] }} style={styles.photoImage} />
              ) : (
                <View style={styles.emptySlot}>
                  <Text style={styles.plusIcon}>+</Text>
                  <Text style={styles.slotText}>Photo {index + 1}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.guidelines}>
          <Text style={styles.guidelinesTitle}>Photo Guidelines:</Text>
          <Text style={styles.guidelineText}>• Use clear, well-lit photos</Text>
          <Text style={styles.guidelineText}>• Face should be clearly visible</Text>
          <Text style={styles.guidelineText}>• Variety of angles and expressions</Text>
          <Text style={styles.guidelineText}>• Casual, natural poses work best</Text>
        </View>

        {validPhotosCount === 5 && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>
                Continue to Processing
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
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
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  photoSlot: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  emptySlot: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  guidelines: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 4,
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});