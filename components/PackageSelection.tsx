import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          AI Brand Photo Kit
        </Text>
        <Text style={styles.subtitle}>
          Transform your candid photos into professional brand images
        </Text>

        <View style={styles.packagesContainer}>
          {packages.map((pkg) => (
            <View key={pkg.id} style={styles.packageWrapper}>
              {pkg.popular && (
                <View style={styles.popularBadge}>
                  <View style={styles.popularBadgeInner}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                </View>
              )}
              
              <View style={styles.packageCard}>
                <View style={styles.packageHeader}>
                  <Text style={styles.packageName}>{pkg.name}</Text>
                  <Text style={styles.packagePrice}>{pkg.price}</Text>
                </View>

                <View style={styles.featuresContainer}>
                  {pkg.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <View style={styles.featureBullet} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePackagePress(pkg.id)}
                  style={styles.selectButton}
                >
                  <LinearGradient
                    colors={pkg.gradient}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>
                      Select {pkg.name}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Perfect for coaches, freelancers, and content creators who need professional photos for their brand
          </Text>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  packagesContainer: {
    gap: 16,
  },
  packageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    marginLeft: -50,
    zIndex: 10,
  },
  popularBadgeInner: {
    backgroundColor: '#F97316',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  packageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  packageName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
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
    marginBottom: 8,
  },
  featureBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
    marginRight: 12,
  },
  featureText: {
    color: '#374151',
    flex: 1,
    fontSize: 16,
  },
  selectButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    marginTop: 32,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  footerText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
});