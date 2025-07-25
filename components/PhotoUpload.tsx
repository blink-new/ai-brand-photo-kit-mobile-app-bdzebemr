import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Camera, Upload, X, ArrowLeft, CheckCircle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { blink } from '@/lib/blink';

interface PhotoUploadProps {
  onPhotosUploaded: (photos: string[]) => void;
  onBack: () => void;
  packageType: string;
}

export function PhotoUpload({ onPhotosUploaded, onBack, packageType }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async (slot: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhotos = [...photos];
      newPhotos[slot] = result.assets[0].uri;
      setPhotos(newPhotos);
    }
  };

  const takePhoto = async (slot: number) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhotos = [...photos];
      newPhotos[slot] = result.assets[0].uri;
      setPhotos(newPhotos);
    }
  };

  const removePhoto = (slot: number) => {
    const newPhotos = [...photos];
    newPhotos[slot] = '';
    setPhotos(newPhotos);
  };

  const showImageOptions = (slot: number) => {
    Alert.alert(
      'Add Photo',
      'Choose how you want to add your photo',
      [
        { text: 'Camera', onPress: () => takePhoto(slot) },
        { text: 'Photo Library', onPress: () => pickImage(slot) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleContinue = async () => {
    const validPhotos = photos.filter(photo => photo && photo.length > 0);
    
    if (validPhotos.length < 5) {
      Alert.alert('More photos needed', 'Please upload all 5 photos to continue.');
      return;
    }

    setIsUploading(true);
    
    try {
      console.log('Starting photo upload process...');
      
      // For now, let's pass the local URIs directly to test the flow
      // In a real app, you'd upload to storage first
      onPhotosUploaded(validPhotos);
      
      /* TODO: Uncomment when storage upload is working
      // Upload photos to storage first
      const uploadedPhotoUrls: string[] = [];
      
      for (let i = 0; i < validPhotos.length; i++) {
        const photo = validPhotos[i];
        console.log(`Uploading photo ${i + 1}:`, photo);
        
        // Convert local URI to blob for upload
        const response = await fetch(photo);
        const blob = await response.blob();
        console.log(`Blob created for photo ${i + 1}, size:`, blob.size);
        
        // Upload to Blink storage using blob directly
        const { publicUrl } = await blink.storage.upload(
          blob,
          `brand-photos/${Date.now()}-photo-${i + 1}.jpg`,
          { upsert: true }
        );
        
        console.log(`Photo ${i + 1} uploaded:`, publicUrl);
        uploadedPhotoUrls.push(publicUrl);
      }
      
      // Pass the uploaded URLs to the next screen
      onPhotosUploaded(uploadedPhotoUrls);
      */
      
    } catch (error) {
      console.error('Error uploading photos:', error);
      Alert.alert('Upload Error', `Failed to upload photos: ${error.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const filledSlots = photos.filter(photo => photo && photo.length > 0).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(600)}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            console.log('Back button pressed');
            onBack();
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Your Photos</Text>
        <Text style={styles.subtitle}>
          Add 5 candid photos of yourself for the best results
        </Text>
      </Animated.View>

      <Animated.View 
        style={styles.progressContainer}
        entering={FadeInDown.duration(600).delay(100)}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(filledSlots / 5) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{filledSlots}/5 photos uploaded</Text>
      </Animated.View>

      <View style={styles.photosGrid}>
        {[0, 1, 2, 3, 4].map((slot, index) => (
          <Animated.View
            key={slot}
            style={styles.photoSlot}
            entering={FadeInUp.duration(600).delay(index * 100)}
          >
            {photos[slot] ? (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photos[slot] }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePhoto(slot)}
                >
                  <X size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.checkmark}>
                  <CheckCircle size={20} color="#10B981" />
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.emptySlot}
                onPress={() => {
                  console.log('Photo slot pressed:', slot);
                  showImageOptions(slot);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.uploadIcon}>
                  <Camera size={32} color="#9CA3AF" />
                </View>
                <Text style={styles.slotText}>Photo {slot + 1}</Text>
                <Text style={styles.slotSubtext}>Tap to add</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        ))}
      </View>

      <Animated.View 
        style={styles.guidelines}
        entering={FadeInDown.duration(600).delay(300)}
      >
        <Text style={styles.guidelinesTitle}>Photo Guidelines</Text>
        <View style={styles.guidelinesList}>
          <Text style={styles.guideline}>• Use clear, well-lit photos</Text>
          <Text style={styles.guideline}>• Include different angles and expressions</Text>
          <Text style={styles.guideline}>• Avoid sunglasses or heavy shadows</Text>
          <Text style={styles.guideline}>• Show your face clearly in each photo</Text>
          <Text style={styles.guideline}>• Mix casual and semi-professional looks</Text>
        </View>
      </Animated.View>

      <Animated.View 
        style={styles.footer}
        entering={FadeInDown.duration(600).delay(400)}
      >
        <View style={[styles.continueButton, filledSlots < 5 && styles.disabledButton]}>
          <TouchableOpacity
            onPress={() => {
              console.log('Continue button pressed, filled slots:', filledSlots);
              handleContinue();
            }}
            disabled={filledSlots < 5 || isUploading}
            activeOpacity={0.8}
            style={styles.continueButtonTouchable}
          >
            <LinearGradient
              colors={filledSlots >= 5 ? ['#6366F1', '#4F46E5'] : ['#D1D5DB', '#9CA3AF']}
              style={styles.continueGradient}
            >
              {isUploading ? (
                <Text style={styles.continueText}>Uploading...</Text>
              ) : (
                <>
                  <Upload size={20} color="#FFFFFF" />
                  <Text style={styles.continueText}>Generate Brand Kit</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  photosGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  photoSlot: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoContainer: {
    flex: 1,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
  },
  emptySlot: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    marginBottom: 12,
  },
  slotText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 4,
  },
  slotSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  guidelines: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  guidelinesList: {
    gap: 8,
  },
  guideline: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  continueButtonTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  continueGradient: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});