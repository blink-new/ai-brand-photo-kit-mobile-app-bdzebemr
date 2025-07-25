import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BrandKitGalleryProps {
  photos: any;
  selectedPackage: 'starter' | 'professional' | 'premium';
  onBack: () => void;
}

export default function BrandKitGallery({ photos, selectedPackage, onBack }: BrandKitGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('lifestyle');

  const categories = [
    { id: 'lifestyle', name: 'Lifestyle', photos: photos?.lifestyle || [] },
    { id: 'desk', name: 'Desk Scenes', photos: photos?.desk || [] },
    { id: 'speaking', name: 'Speaking', photos: photos?.speaking || [] },
    { id: 'zoom', name: 'Zoom Calls', photos: photos?.zoom || [] },
    { id: 'bonus', name: 'Bonus Content', photos: photos?.bonus || [] },
  ];

  const handlePhotoPress = (photoUrl: string) => {
    Alert.alert(
      'Photo Options',
      'What would you like to do with this photo?',
      [
        {
          text: 'Download',
          onPress: () => {
            console.log('Download photo:', photoUrl);
            Alert.alert('Success', 'Photo downloaded to your device!');
          }
        },
        {
          text: 'Share',
          onPress: () => {
            console.log('Share photo:', photoUrl);
            Alert.alert('Share', 'Sharing options would open here');
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleDownloadAll = () => {
    Alert.alert(
      'Download All Photos',
      'Download all photos in your brand kit?',
      [
        {
          text: 'Download',
          onPress: () => {
            console.log('Download all photos');
            Alert.alert('Success', 'All photos downloaded to your device!');
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const activePhotos = categories.find(cat => cat.id === activeCategory)?.photos || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Your Brand Kit</Text>
        <Text style={styles.subtitle}>
          Professional photos for your {selectedPackage} package
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              activeCategory === category.id && styles.activeCategoryTab
            ]}
            onPress={() => setActiveCategory(category.id)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.categoryText,
              activeCategory === category.id && styles.activeCategoryText
            ]}>
              {category.name}
            </Text>
            <Text style={styles.photoCount}>
              {category.photos.length}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.photosContainer}>
        <View style={styles.photosGrid}>
          {activePhotos.map((photoUrl, index) => (
            <TouchableOpacity
              key={index}
              style={styles.photoItem}
              onPress={() => handlePhotoPress(photoUrl)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: photoUrl }} style={styles.photoImage} />
              <View style={styles.photoOverlay}>
                <Text style={styles.photoIndex}>{index + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {activePhotos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No photos in this category</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownloadAll}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.downloadGradient}
          >
            <Text style={styles.downloadText}>
              Download All Photos
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Total Photos: {Object.values(photos || {}).flat().length}
          </Text>
          <Text style={styles.statsText}>
            Package: {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)}
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
  header: {
    padding: 24,
    paddingBottom: 16,
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
  categoriesContainer: {
    maxHeight: 60,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeCategoryTab: {
    backgroundColor: '#6366F1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  photoCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  photosContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  photoItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  photoIndex: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 24,
    paddingTop: 16,
  },
  downloadButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  downloadGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  downloadText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});