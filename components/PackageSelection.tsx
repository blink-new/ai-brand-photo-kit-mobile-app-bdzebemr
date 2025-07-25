import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PackageSelectionProps {
  onSelectPackage: (packageType: 'starter' | 'professional' | 'premium') => void;
}

export default function PackageSelection({ onSelectPackage }: PackageSelectionProps) {
  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$39',
      features: [
        '5 Professional Photos',
        'Lifestyle & Desk Scenes',
        'Basic LinkedIn Banner',
        'Standard Resolution'
      ],
      gradient: ['#6366F1', '#8B5CF6'],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$69',
      features: [
        '10 Professional Photos',
        'All 4 Categories',
        'LinkedIn + IG Banners',
        'High Resolution',
        'Bonus Zoom Backgrounds'
      ],
      gradient: ['#F59E0B', '#EF4444'],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$99',
      features: [
        '15 Professional Photos',
        'All Categories + Extras',
        'Complete Social Kit',
        'Ultra High Resolution',
        'Custom Backgrounds',
        'Priority Processing'
      ],
      gradient: ['#10B981', '#059669'],
      popular: false
    }
  ];

  const handlePackagePress = (packageId: string) => {
    console.log('Package button pressed:', packageId);
    Alert.alert('Package Selected', `You selected ${packageId}`, [
      {
        text: 'Continue',
        onPress: () => onSelectPackage(packageId as any)
      },
      {
        text: 'Cancel',
        style: 'cancel'
      }
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-8 pb-6">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
          AI Brand Photo Kit
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-8">
          Transform your candid photos into professional brand images
        </Text>

        <View className="space-y-4">
          {packages.map((pkg) => (
            <View key={pkg.id} className="relative">
              {pkg.popular && (
                <View className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <View className="bg-orange-500 px-4 py-1 rounded-full">
                    <Text className="text-white text-sm font-semibold">Most Popular</Text>
                  </View>
                </View>
              )}
              
              <View className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-2xl font-bold text-gray-900">{pkg.name}</Text>
                  <Text className="text-3xl font-bold text-indigo-600">{pkg.price}</Text>
                </View>

                <View className="mb-6">
                  {pkg.features.map((feature, index) => (
                    <View key={index} className="flex-row items-center mb-2">
                      <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      <Text className="text-gray-700 flex-1">{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePackagePress(pkg.id)}
                  className="rounded-xl overflow-hidden"
                >
                  <LinearGradient
                    colors={pkg.gradient}
                    className="py-4 px-6"
                  >
                    <Text className="text-white text-lg font-semibold text-center">
                      Select {pkg.name}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-8 bg-gray-50 rounded-xl p-4">
          <Text className="text-center text-gray-600 text-sm">
            Perfect for coaches, freelancers, and content creators who need professional photos for their brand
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}