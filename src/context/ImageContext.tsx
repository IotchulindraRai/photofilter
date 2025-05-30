import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface ImageItem {
  id: string;
  originalImage: string;
  filteredImage?: string;
  timestamp: Date;
  status: 'initial' | 'processing' | 'completed' | 'error';
  name: string;
}

interface ImageContextType {
  currentImage: ImageItem | null;
  setCurrentImage: (image: ImageItem | null) => void;
  imageHistory: ImageItem[];
  addToHistory: (image: ImageItem) => void;
  updateImage: (id: string, updates: Partial<ImageItem>) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState<ImageItem | null>(null);
  const [imageHistory, setImageHistory] = useState<ImageItem[]>([]);

  const addToHistory = (image: ImageItem) => {
    setImageHistory(prev => [image, ...prev].slice(0, 6));
  };

  const updateImage = (id: string, updates: Partial<ImageItem>) => {
    setImageHistory(prev => 
      prev.map(img => img.id === id ? { ...img, ...updates } : img)
    );
    
    if (currentImage && currentImage.id === id) {
      setCurrentImage({ ...currentImage, ...updates });
    }
  };

  return (
    <ImageContext.Provider value={{ 
      currentImage, 
      setCurrentImage, 
      imageHistory, 
      addToHistory,
      updateImage
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};