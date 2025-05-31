import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Download, Loader2, CreditCard } from 'lucide-react';
import { useImageContext } from '../context/ImageContext';
import { transformImage } from '../services/imageService';
import { createPaymentSession } from '../services/stripeService';
import toast from 'react-hot-toast';

const ImageTransformer: React.FC = () => {
  const { currentImage, updateImage } = useImageContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const handleTransform = async () => {
    if (!currentImage || !currentImage.originalImage) return;
    
    setIsProcessing(true);
    updateImage(currentImage.id, { status: 'processing' });
    
    try {
      const result = await transformImage(currentImage.originalImage);
      
      if (result.success && result.filteredImage) {
        updateImage(currentImage.id, { 
          filteredImage: result.filteredImage,
          status: 'completed'
        });
        toast.success('Image transformed successfully!');
      } else {
        throw new Error(result.error || 'Failed to transform image');
      }
    } catch (error) {
      console.error('Error transforming image:', error);
      updateImage(currentImage.id, { status: 'error' });
      toast.error('Failed to transform image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!currentImage?.filteredImage) return;
    
    setIsPaying(true);
    try {
      await createPaymentSession();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  const handleDownload = () => {
    if (!currentImage?.filteredImage) return;
    
    const link = document.createElement('a');
    link.href = currentImage.filteredImage;
    link.download = `filtered-${currentImage.name || 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Image downloaded successfully!');
  };

  if (!currentImage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-8 text-center"
      >
        <p className="text-gray-400">Upload an image to begin transformation</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-300 mb-3">Original Image</h3>
          <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src={currentImage.originalImage} 
              alt="Original" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-300 mb-3">Filtered Version</h3>
          <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
            {currentImage.status === 'processing' || isProcessing ? (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="h-12 w-12 animate-spin mb-3" />
                <p>Applying filters...</p>
              </div>
            ) : currentImage.filteredImage ? (
              <img 
                src={currentImage.filteredImage} 
                alt="Filtered Version" 
                className="max-w-full max-h-full object-contain"
              />
            ) : currentImage.status === 'error' ? (
              <div className="text-red-400 p-4">
                <p>Error applying filters.</p>
                <button 
                  onClick={handleTransform}
                  className="mt-4 text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <p>Click transform to apply filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleTransform}
          disabled={isProcessing || currentImage.status === 'processing'}
          className={`py-3 px-6 rounded-lg flex items-center justify-center font-medium ${
            isProcessing || currentImage.status === 'processing'
              ? 'bg-purple-700 bg-opacity-50 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {isProcessing || currentImage.status === 'processing' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 mr-2" />
              Apply Filters
            </>
          )}
        </motion.button>

        {currentImage.filteredImage && (
          <>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="py-3 px-6 rounded-lg flex items-center justify-center font-medium bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Image
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={isPaying}
              className="py-3 px-6 rounded-lg flex items-center justify-center font-medium bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPaying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pay NPR 5 to Download HD
                </>
              )}
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ImageTransformer;