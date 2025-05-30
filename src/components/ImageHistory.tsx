import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { useImageContext, ImageItem } from '../context/ImageContext';

const ImageHistory: React.FC = () => {
  const { imageHistory, setCurrentImage } = useImageContext();

  if (imageHistory.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          Recent History
        </h2>
        <p className="text-gray-400 text-center py-8">No image transformations yet</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-6"
    >
      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-gray-400" />
        Recent History
      </h2>
      
      <div className="space-y-4">
        {imageHistory.map((image, index) => (
          <HistoryItem 
            key={image.id} 
            image={image} 
            onClick={() => setCurrentImage(image)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface HistoryItemProps {
  image: ImageItem;
  onClick: () => void;
  delay: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ image, onClick, delay }) => {
  const statusIcon = () => {
    switch (image.status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-400" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-yellow-400 animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={onClick}
      className="flex items-center bg-gray-700 bg-opacity-50 hover:bg-gray-700 rounded-lg p-3 cursor-pointer transition-colors"
    >
      <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden mr-4 flex-shrink-0">
        <img 
          src={image.originalImage} 
          alt={image.name || 'Image'} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-gray-300 font-medium truncate">
          {image.name || 'Unnamed Image'}
        </p>
        <div className="flex items-center mt-1">
          {statusIcon()}
          <span className="text-xs text-gray-400 ml-1">
            {image.status === 'completed' 
              ? 'Transformed' 
              : image.status === 'processing' 
                ? 'Processing...' 
                : image.status === 'error' 
                  ? 'Failed' 
                  : 'Uploaded'}
          </span>
        </div>
      </div>
      
      {image.animeImage && (
        <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden ml-2 flex-shrink-0">
          <img 
            src={image.animeImage} 
            alt="Anime version" 
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};

export default ImageHistory;