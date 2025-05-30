import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Image } from 'lucide-react';
import { useImageContext } from '../context/ImageContext';
import toast from 'react-hot-toast';

const ImageUploader: React.FC = () => {
  const { setCurrentImage, addToHistory } = useImageContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      const newImage = {
        id: `img_${Date.now()}`,
        originalImage: e.target.result as string,
        timestamp: new Date(),
        status: 'initial' as const,
        name: file.name
      };
      
      setCurrentImage(newImage);
      addToHistory(newImage);
      toast.success('Image uploaded successfully!');
    };
    
    reader.readAsDataURL(file);
  }, [setCurrentImage, addToHistory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Upload Your Image</h2>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive 
            ? 'border-purple-400 bg-purple-900/20' 
            : 'border-gray-600 hover:border-purple-500 hover:bg-purple-900/10'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center">
          {isDragActive ? (
            <>
              <Image className="h-12 w-12 text-purple-400 mb-4" />
              <p className="text-purple-300 text-lg">Drop your image here...</p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-300 text-lg mb-2">Drag & drop an image here, or click to select</p>
              <p className="text-gray-500 text-sm">Supports JPG, PNG, GIF (Max 5MB)</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageUploader;