import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import ImageTransformer from './components/ImageTransformer';
import ImageHistory from './components/ImageHistory';
import { ImageProvider } from './context/ImageContext';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center mb-3"
            >
              <Sparkles className="h-8 w-8 text-purple-400 mr-2" />
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500">
                PhotoFilter Pro
              </h1>
              <Sparkles className="h-8 w-8 text-purple-400 ml-2" />
            </motion.div>
            <motion.p 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-300 text-xl max-w-2xl mx-auto"
            >
              Transform your photos with stunning filters and artistic effects
            </motion.p>
          </header>

          <main className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ImageUploader />
                <ImageTransformer />
              </div>
              <div>
                <ImageHistory />
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </ImageProvider>
  );
};

export default App;