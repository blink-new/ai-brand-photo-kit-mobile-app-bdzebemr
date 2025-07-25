import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Check, Star, Zap, Crown } from 'lucide-react-native';

interface PackageSelectionProps {
  onPackageSelect: (packageId: string) => void;
}

const packages = [
  {
    id: 'starter',
    name: 'Starter Kit',
    price: '$39',
    icon: Zap,
    color: '#10B981',
    features: [
      '5 AI-generated brand photos',
      'Lifestyle & desk scenes',
      '2 LinkedIn banners',
      'Basic IG bio visuals',
      'HD downloads'
    ],
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional Kit',
    price: '$69',
    icon: Star,
    color: '#6366F1',
    features: [
      '10 AI-generated brand photos',
      'All photo categories',
      '5 LinkedIn banners',
      'Premium IG bio visuals',
      'Zoom call mockups',
      'HD + 4K downloads'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Kit',
    price: '$99',
    icon: Crown,
    color: '#F59E0B',
    features: [
      '15 AI-generated brand photos',
      'All photo categories',
      '10 LinkedIn banners',
      'Premium IG + Story visuals',
      'Speaking event photos',
      '4K downloads + raw files',
      'Priority processing'
    ],
    popular: false
  }
];

export function PackageSelection({ onPackageSelect }: PackageSelectionProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(600)}
      >
        <Text style={styles.title}>AI Brand Photo Kit</Text>
        <Text style={styles.subtitle}>
          Transform your candid photos into professional brand assets
        </Text>
      </Animated.View>

      <View style={styles.packagesContainer}>
        {packages.map((pkg, index) => (
          <Animated.View
            key={pkg.id}
            entering={FadeInDown.duration(600).delay(index * 100)}
          >
            <View
              style={[
                styles.packageCard,
                pkg.popular && styles.popularCard
              ]}
            >
              {pkg.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              
              <View style={styles.packageHeader}>
                <View style={[styles.iconContainer, { backgroundColor: pkg.color + '20' }]}>
                  <pkg.icon size={24} color={pkg.color} />
                </View>
                <View style={styles.packageInfo}>
                  <Text style={styles.packageName}>{pkg.name}</Text>
                  <Text style={styles.packagePrice}>{pkg.price}</Text>
                </View>
              </View>

              <View style={styles.featuresContainer}>
                {pkg.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <Check size={16} color="#10B981" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  console.log('Package selected:', pkg.id);
                  onPackageSelect(pkg.id);
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[pkg.color, pkg.color + 'CC']}
                  style={styles.selectButtonGradient}
                >
                  <Text style={styles.selectButtonText}>Choose {pkg.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </View>

      <Animated.View 
        style={styles.footer}
        entering={FadeInDown.duration(600).delay(400)}
      >
        <Text style={styles.footerText}>
          Perfect for coaches, freelancers & content creators
        </Text>
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
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  packagesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
  },
  popularCard: {
    borderColor: '#6366F1',
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 24,
    right: 24,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6366F1',
  },
  featuresContainer: {
    marginBottom: 24,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#4B5563',
    flex: 1,
  },
  selectButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});