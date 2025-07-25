import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BrandKitGalleryProps {
  photos: any;
  selectedPackage: 'starter' | 'professional' | 'premium';
  onBack: () => void;
}

export default function BrandKitGallery({ photos, selectedPackage, onBack }: BrandKitGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('lifestyle');

  const categories = [
    { id: 'lifestyle', name: 'Lifestyle', icon: '🌟' },
    { id: 'desk', name: 'Desk Scenes', icon: '💻' },
    { id: 'speaking', name: 'Speaking', icon: '🎤' },
    { id: 'zoom', name: 'Zoom Calls', icon: '📹' },
    { id: 'bonus', name: 'Bonus Content', icon: '🎁' }
  ];

  const handleBackPress = () => {
    console.log('Back button pressed from gallery');
    onBack();
  };

  const handleCategoryPress = (categoryId: string) => {
    console.log('Category selected:', categoryId);
    setSelectedCategory(categoryId);
  };

  const handlePhotoPress = (photo: any) => {
    console.log('Photo pressed:', photo);
    Alert.alert(
      'Photo Options',
      'What would you like to do with this photo?',
      [
        {
          text: 'Download',
          onPress: () => Alert.alert('Download', 'Photo download feature coming soon!')
        },
        {
          text: 'Share',
          onPress: () => Alert.alert('Share', 'Photo sharing feature coming soon!')
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleDownloadAllPress = () => {
    console.log('Download all pressed');
    Alert.alert('Download All', 'Downloading all photos from your brand kit!');
  };

  const renderPhotos = () => {
    if (!photos) return null;

    if (selectedCategory === 'bonus') {
      return (
        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-4">LinkedIn Banners</Text>
          <View className="grid grid-cols-1 gap-4 mb-6">
            {photos.bonus?.linkedinBanners?.map((photo: any, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handlePhotoPress(photo)}
                className="aspect-[3/1] bg-gray-100 rounded-xl overflow-hidden"
              >
                <Image
                  source={{ uri: photo.url }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-lg font-semibold text-gray-900 mb-4">Instagram Bio Visuals</Text>
          <View className="grid grid-cols-2 gap-4">
            {photos.bonus?.igBioVisuals?.map((photo: any, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handlePhotoPress(photo)}
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
              >
                <Image
                  source={{ uri: photo.url }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    const categoryPhotos = photos[selectedCategory] || [];
    
    return (
      <View className="grid grid-cols-2 gap-4">
        {categoryPhotos.map((photo: any, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => handlePhotoPress(photo)}
            className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
          >
            <Image
              source={{ uri: photo.url }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
            Your Brand Kit
          </Text>
        </View>

        <View className="bg-green-50 rounded-xl p-4 mb-6">
          <Text className="text-green-800 font-semibold mb-2">
            🎉 Brand Kit Complete!
          </Text>
          <Text className="text-green-700 text-sm">
            Your professional photos are ready for download and use across all your platforms
          </Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          <View className="flex-row space-x-3">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.8}
                onPress={() => handleCategoryPress(category.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category.id 
                    ? 'bg-indigo-600' 
                    : 'bg-gray-100'
                }`}
              >
                <Text className={`font-medium ${
                  selectedCategory === category.id 
                    ? 'text-white' 
                    : 'text-gray-700'
                }`}>
                  {category.icon} {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View className="mb-6">
          {renderPhotos()}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDownloadAllPress}
          className="rounded-xl overflow-hidden mb-4"
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            className="py-4 px-6"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Download All Photos
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View className="bg-gray-50 rounded-xl p-4">
          <Text className="text-center text-gray-600 text-sm">
            Perfect for your website, social media, speaking engagements, and professional profiles
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}