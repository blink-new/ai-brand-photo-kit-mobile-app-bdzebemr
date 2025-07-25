import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Grid3X3, 
  User, 
  Briefcase, 
  Mic, 
  Video,
  Gift,
  Star
} from 'lucide-react-native';

interface BrandKitGalleryProps {
  photos: string[];
  packageType: string;
  generatedPhotos: any;
  onBack: () => void;
}

const { width } = Dimensions.get('window');
const photoWidth = (width - 48) / 2;

// Mock generated photos for demo
const mockGeneratedPhotos = {
  lifestyle: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
  ],
  desk: [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
  ],
  speaking: [
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=500&fit=crop',
  ],
  zoom: [
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=500&fit=crop',
  ],
  linkedin: [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
  ],
  instagram: [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  ]
};

const categories = [
  { id: 'all', name: 'All Photos', icon: Grid3X3, count: 15 },
  { id: 'lifestyle', name: 'Lifestyle', icon: User, count: 3 },
  { id: 'desk', name: 'Desk Scenes', icon: Briefcase, count: 2 },
  { id: 'speaking', name: 'Speaking', icon: Mic, count: 2 },
  { id: 'zoom', name: 'Zoom Calls', icon: Video, count: 2 },
  { id: 'bonus', name: 'Bonus Content', icon: Gift, count: 6 },
];

export function BrandKitGallery({ photos, packageType, generatedPhotos, onBack }: BrandKitGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const getPhotosForCategory = () => {
    // Use real generated photos if available, otherwise fallback to mock data
    const photosData = generatedPhotos || mockGeneratedPhotos;
    
    switch (selectedCategory) {
      case 'lifestyle':
        return photosData.lifestyle || [];
      case 'desk':
        return photosData.desk || [];
      case 'speaking':
        return photosData.speaking || [];
      case 'zoom':
        return photosData.zoom || [];
      case 'bonus':
        return [...(photosData.linkedin || []), ...(photosData.instagram || [])];
      default:
        return [
          ...(photosData.lifestyle || []),
          ...(photosData.desk || []),
          ...(photosData.speaking || []),
          ...(photosData.zoom || []),
        ];
    }
  };

  const currentPhotos = getPhotosForCategory();

  const handleDownloadAll = () => {
    // In a real app, this would trigger download of all photos
    console.log('Downloading all photos...');
  };

  const handleShare = () => {
    // In a real app, this would open share dialog
    console.log('Sharing photos...');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(600)}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            console.log('Gallery back button pressed');
            onBack();
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Your Brand Kit</Text>
          <View style={styles.successBadge}>
            <Star size={16} color="#F59E0B" />
            <Text style={styles.successText}>Ready!</Text>
          </View>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View 
        style={styles.actionsContainer}
        entering={FadeInDown.duration(600).delay(100)}
      >
        <View style={styles.actionButton}>
          <TouchableOpacity onPress={handleDownloadAll} activeOpacity={0.8} style={styles.actionTouchable}>
            <LinearGradient
              colors={['#6366F1', '#4F46E5']}
              style={styles.actionGradient}
            >
              <Download size={20} color="#FFFFFF" />
              <Text style={styles.actionText}>Download All</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share2 size={20} color="#6366F1" />
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Categories */}
      <Animated.View 
        style={styles.categoriesContainer}
        entering={FadeInDown.duration(600).delay(200)}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <category.icon 
                size={18} 
                color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.activeCategoryText
              ]}>
                {category.name}
              </Text>
              <View style={[
                styles.categoryCount,
                selectedCategory === category.id && styles.activeCategoryCount
              ]}>
                <Text style={[
                  styles.countText,
                  selectedCategory === category.id && styles.activeCountText
                ]}>
                  {category.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Photos Grid */}
      <ScrollView 
        style={styles.photosContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photosGrid}>
          {currentPhotos.map((photo, index) => (
            <Animated.View
              key={`${selectedCategory}-${index}`}
              entering={FadeInUp.duration(600).delay(index * 50)}
            >
              <TouchableOpacity
                style={styles.photoContainer}
                onPress={() => setSelectedPhoto(photo)}
                activeOpacity={0.9}
              >
                <Image source={{ uri: photo }} style={styles.photo} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.3)']}
                  style={styles.photoOverlay}
                >
                  <View style={styles.photoActions}>
                    <TouchableOpacity style={styles.photoAction}>
                      <Download size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoAction}>
                      <Share2 size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Bonus Content Section */}
        {selectedCategory === 'all' && (
          <Animated.View 
            style={styles.bonusSection}
            entering={FadeInDown.duration(600).delay(400)}
          >
            <View style={styles.bonusHeader}>
              <Gift size={24} color="#F59E0B" />
              <Text style={styles.bonusTitle}>Bonus Content</Text>
            </View>
            
            <Text style={styles.bonusSubtitle}>LinkedIn Banners</Text>
            <View style={styles.bonusGrid}>
              {((generatedPhotos && generatedPhotos.linkedin) || mockGeneratedPhotos.linkedin).map((banner, index) => (
                <TouchableOpacity key={index} style={styles.bannerContainer}>
                  <Image source={{ uri: banner }} style={styles.banner} />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.bonusSubtitle}>Instagram Bio Visuals</Text>
            <View style={styles.bonusGrid}>
              {((generatedPhotos && generatedPhotos.instagram) || mockGeneratedPhotos.instagram).map((visual, index) => (
                <TouchableOpacity key={index} style={styles.visualContainer}>
                  <Image source={{ uri: visual }} style={styles.visual} />
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎉 Your professional brand kit is ready! Perfect for websites, social media, and marketing materials.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  successText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionTouchable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366F1',
    gap: 8,
  },
  shareText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    gap: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#6366F1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  categoryCount: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  activeCategoryCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeCountText: {
    color: '#FFFFFF',
  },
  photosContainer: {
    flex: 1,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
  },
  photoContainer: {
    width: photoWidth,
    height: photoWidth * 1.25,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  photoActions: {
    flexDirection: 'row',
    gap: 8,
  },
  photoAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bonusSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  bonusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  bonusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  bonusSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
    marginTop: 16,
  },
  bonusGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  bannerContainer: {
    flex: 1,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  visualContainer: {
    width: photoWidth,
    height: photoWidth,
    borderRadius: 8,
    overflow: 'hidden',
  },
  visual: {
    width: '100%',
    height: '100%',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});