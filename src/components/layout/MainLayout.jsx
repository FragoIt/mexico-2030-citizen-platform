import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ChevronRight, MapPin } from 'lucide-react';

const MainLayout = ({ children }) => {
  const { currentUser, toggleRole } = useDemo();

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* View Transition Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentUser.role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Demo Controls (Always Visible) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        {/* Current View Indicator */}
        <div className="px-4 py-2 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-white">
              {currentUser.role === 'citizen' ? '📱 Vista Ciudadano' : '🏛️ Vista Alcalde'}
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleRole}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-full shadow-2xl transition-all flex items-center gap-2 border-2 border-purple-400 hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Cambiar Rol (Demo)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MainLayout;
