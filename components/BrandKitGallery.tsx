import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Alert } from 'react-native';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface BrandKitGalleryProps {
  photos: any;
  selectedPackage: Package | null;
  onBack: () => void;
}

const categories = [
  { id: 'lifestyle', name: 'Lifestyle', icon: '🌟' },
  { id: 'desk', name: 'Desk Scenes', icon: '💻' },
  { id: 'speaking', name: 'Speaking', icon: '🎤' },
  { id: 'zoom', name: 'Zoom Calls', icon: '📹' },
  { id: 'bonus', name: 'Bonus Content', icon: '🎁' }
];

export default function BrandKitGallery({ photos, selectedPackage, onBack }: BrandKitGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('lifestyle');

  const handleCategoryPress = (categoryId: string) => {
    console.log('Category pressed:', categoryId);
    setActiveCategory(categoryId);
  };

  const handlePhotoPress = (photo: any) => {
    console.log('Photo pressed:', photo);
    Alert.alert(
      'Photo Options',
      'What would you like to do with this photo?',
      [
        { text: 'Download', onPress: () => handleDownload(photo) },
        { text: 'Share', onPress: () => handleShare(photo) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleDownload = (photo: any) => {
    console.log('Download photo:', photo);
    Alert.alert('Download', 'Photo downloaded to your device!');
  };

  const handleShare = (photo: any) => {
    console.log('Share photo:', photo);
    Alert.alert('Share', 'Photo shared successfully!');
  };

  const handleDownloadAll = () => {
    console.log('Download all pressed');
    Alert.alert('Download All', 'All photos from your brand kit have been downloaded!');
  };

  const handleBack = () => {
    console.log('Back pressed from gallery');
    onBack();
  };

  const renderPhotos = () => {
    if (!photos) return null;

    if (activeCategory === 'bonus') {
      return (
        <View>
          <Text style={styles.sectionTitle}>LinkedIn Banners</Text>
          <View style={styles.photosGrid}>
            {photos.bonus?.linkedin?.map((photo: any, index: number) => (
              <Pressable
                key={`linkedin-${index}`}
                style={({ pressed }) => [
                  styles.photoContainer,
                  styles.bannerPhoto,
                  pressed && styles.photoPressed
                ]}
                onPress={() => handlePhotoPress(photo)}
              >
                <Image source={{ uri: photo.url }} style={styles.bannerImage} />
              </Pressable>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Instagram Bio Visuals</Text>
          <View style={styles.photosGrid}>
            {photos.bonus?.instagram?.map((photo: any, index: number) => (
              <Pressable
                key={`instagram-${index}`}
                style={({ pressed }) => [
                  styles.photoContainer,
                  pressed && styles.photoPressed
                ]}
                onPress={() => handlePhotoPress(photo)}
              >
                <Image source={{ uri: photo.url }} style={styles.photoImage} />
              </Pressable>
            ))}
          </View>
        </View>
      );
    }

    const categoryPhotos = photos[activeCategory] || [];
    return (
      <View style={styles.photosGrid}>
        {categoryPhotos.map((photo: any, index: number) => (
          <Pressable
            key={`${activeCategory}-${index}`}
            style={({ pressed }) => [
              styles.photoContainer,
              pressed && styles.photoPressed
            ]}
            onPress={() => handlePhotoPress(photo)}
          >
            <Image source={{ uri: photo.url }} style={styles.photoImage} />
          </Pressable>
        ))}
      </View>
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
        
        <Text style={styles.title}>Your Brand Kit</Text>
        <Text style={styles.subtitle}>
          {selectedPackage?.name} package - Professional photos ready to use
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={({ pressed }) => [
              styles.categoryTab,
              activeCategory === category.id && styles.categoryTabActive,
              pressed && styles.categoryTabPressed
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              activeCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.photosContainer} contentContainerStyle={styles.photosContent}>
        {renderPhotos()}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.downloadAllButton,
            pressed && styles.downloadAllButtonPressed
          ]}
          onPress={handleDownloadAll}
        >
          <Text style={styles.downloadAllButtonText}>Download All Photos</Text>
        </Pressable>
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
    alignItems: 'center',
    padding: 20,
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
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTabActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  categoryTabPressed: {
    opacity: 0.8,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  photosContainer: {
    flex: 1,
  },
  photosContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    marginTop: 20,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoContainer: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
  },
  photoPressed: {
    opacity: 0.8,
  },
  photoImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  bannerPhoto: {
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    aspectRatio: 3,
    borderRadius: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  downloadAllButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  downloadAllButtonPressed: {
    opacity: 0.8,
  },
  downloadAllButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});