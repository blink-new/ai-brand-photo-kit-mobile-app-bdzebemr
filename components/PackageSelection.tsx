import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface PackageSelectionProps {
  onSelectPackage: (pkg: Package) => void;
}

const packages: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 39,
    features: ['5 Brand Photos', '2 Lifestyle Shots', '1 Desk Scene', '1 Speaking Photo', 'Basic LinkedIn Banner']
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 69,
    features: ['10 Brand Photos', '4 Lifestyle Shots', '3 Desk Scenes', '2 Speaking Photos', '1 Zoom Mockup', 'Premium LinkedIn Banner', '3 IG Bio Visuals']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    features: ['20 Brand Photos', '8 Lifestyle Shots', '5 Desk Scenes', '4 Speaking Photos', '3 Zoom Mockups', 'Custom LinkedIn Banner', '5 IG Bio Visuals', 'Bonus Social Media Kit']
  }
];

export default function PackageSelection({ onSelectPackage }: PackageSelectionProps) {
  const handleSelectPackage = (pkg: Package) => {
    console.log('Package button pressed:', pkg.name);
    Alert.alert('Package Selected', `You selected the ${pkg.name} package for $${pkg.price}`, [
      { text: 'OK', onPress: () => onSelectPackage(pkg) }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Brand Photo Kit</Text>
        <Text style={styles.subtitle}>Choose your perfect package for professional brand photos</Text>
      </View>

      <View style={styles.packagesContainer}>
        {packages.map((pkg, index) => (
          <View key={pkg.id} style={styles.packageCard}>
            <View style={styles.packageHeader}>
              <Text style={styles.packageName}>{pkg.name}</Text>
              {pkg.id === 'professional' && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              <Text style={styles.packagePrice}>${pkg.price}</Text>
            </View>

            <View style={styles.featuresContainer}>
              {pkg.features.map((feature, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.selectButton,
                pressed && styles.selectButtonPressed
              ]}
              onPress={() => handleSelectPackage(pkg)}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.gradientButton}
              >
                <Text style={styles.selectButtonText}>Select {pkg.name}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        ))}
      </View>
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
  packagesContainer: {
    gap: 20,
  },
  packageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  packageHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  packageName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  popularBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  packagePrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#4B5563',
    flex: 1,
  },
  selectButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectButtonPressed: {
    opacity: 0.8,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});