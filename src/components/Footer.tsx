import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-16 py-6 border-t border-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PhotoFilter Pro
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Transform your photos with stunning filters and effects
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <div className="text-gray-400 flex items-center text-sm">
              <span className="mr-1">Made with</span>
              <Heart className="h-4 w-4 text-pink-500 mx-1" />
              <span>in 2025</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;