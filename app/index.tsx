import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import PackageSelection from '../components/PackageSelection';
import PhotoUpload from '../components/PhotoUpload';
import ProcessingScreen from '../components/ProcessingScreen';
import BrandKitGallery from '../components/BrandKitGallery';

type Screen = 'package' | 'upload' | 'processing' | 'gallery';
type Package = 'starter' | 'professional' | 'premium';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('package');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<any>(null);

  console.log('App render - currentScreen:', currentScreen, 'selectedPackage:', selectedPackage);

  const handlePackageSelect = (packageType: Package) => {
    console.log('Package selected:', packageType);
    setSelectedPackage(packageType);
    setCurrentScreen('upload');
  };

  const handlePhotosUploaded = (photos: string[]) => {
    console.log('Photos uploaded:', photos.length);
    setUploadedPhotos(photos);
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = (photos: any) => {
    console.log('Processing complete');
    setGeneratedPhotos(photos);
    setCurrentScreen('gallery');
  };

  const handleBackToPackages = () => {
    console.log('Back to packages');
    setCurrentScreen('package');
    setSelectedPackage(null);
  };

  const handleBackToUpload = () => {
    console.log('Back to upload');
    setCurrentScreen('upload');
  };

  const handleBackToGallery = () => {
    console.log('Back to gallery');
    setCurrentScreen('gallery');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'package':
        return <PackageSelection onSelectPackage={handlePackageSelect} />;
      case 'upload':
        return (
          <PhotoUpload
            selectedPackage={selectedPackage!}
            onPhotosUploaded={handlePhotosUploaded}
            onBack={handleBackToPackages}
          />
        );
      case 'processing':
        return (
          <ProcessingScreen
            photos={uploadedPhotos}
            selectedPackage={selectedPackage!}
            onComplete={handleProcessingComplete}
            onBack={handleBackToUpload}
          />
        );
      case 'gallery':
        return (
          <BrandKitGallery
            photos={generatedPhotos}
            selectedPackage={selectedPackage!}
            onBack={handleBackToGallery}
          />
        );
      default:
        return <PackageSelection onSelectPackage={handlePackageSelect} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
});