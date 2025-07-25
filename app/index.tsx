import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import PackageSelection from '../components/PackageSelection';
import PhotoUpload from '../components/PhotoUpload';
import ProcessingScreen from '../components/ProcessingScreen';
import BrandKitGallery from '../components/BrandKitGallery';

type Screen = 'package' | 'upload' | 'processing' | 'gallery';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('package');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<any>(null);

  const handlePackageSelect = (pkg: Package) => {
    console.log('Package selected:', pkg);
    setSelectedPackage(pkg);
    setCurrentScreen('upload');
  };

  const handlePhotosUploaded = (photos: string[]) => {
    console.log('Photos uploaded:', photos);
    setUploadedPhotos(photos);
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = (photos: any) => {
    console.log('Processing complete:', photos);
    setGeneratedPhotos(photos);
    setCurrentScreen('gallery');
  };

  const handleBack = () => {
    console.log('Back pressed from:', currentScreen);
    switch (currentScreen) {
      case 'upload':
        setCurrentScreen('package');
        break;
      case 'processing':
        setCurrentScreen('upload');
        break;
      case 'gallery':
        setCurrentScreen('upload');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'package' && (
        <PackageSelection onSelectPackage={handlePackageSelect} />
      )}
      
      {currentScreen === 'upload' && (
        <PhotoUpload 
          selectedPackage={selectedPackage}
          onPhotosUploaded={handlePhotosUploaded}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'processing' && (
        <ProcessingScreen 
          photos={uploadedPhotos}
          selectedPackage={selectedPackage}
          onComplete={handleProcessingComplete}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'gallery' && (
        <BrandKitGallery 
          photos={generatedPhotos}
          selectedPackage={selectedPackage}
          onBack={handleBack}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});