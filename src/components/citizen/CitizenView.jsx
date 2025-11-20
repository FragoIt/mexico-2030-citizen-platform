import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { CATEGORIES } from '../../data/constants';
import { MapPin, Camera, Award, CheckCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const CitizenView = () => {
  const { currentUser, addReport, reports } = useDemo();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reportNote, setReportNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastReportId, setLastReportId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmitReport = () => {
    if (!selectedCategory || !reportNote.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }

    const newReport = {
      title: reportNote.substring(0, 50),
      category: selectedCategory.name,
      location: 'Ubicación Detectada: Centro, Rionegro',
      coordinates: { lat: 6.1549 + Math.random() * 0.01, lng: -75.3736 + Math.random() * 0.01 },
      priority: 'Media',
      reporter: currentUser.name,
      description: reportNote,
      image: selectedCategory.id === 1 ? '🚗' : selectedCategory.id === 2 ? '💡' : selectedCategory.id === 3 ? '🌳' : selectedCategory.id === 4 ? '🛡️' : '🗑️'
    };

    const createdReport = addReport(newReport);
    setLastReportId(createdReport.id);
    setShowSuccess(true);
    setShowConfetti(true);
    setReportNote('');
    setSelectedCategory(null);

    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse-custom"></div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: -20,
                x: Math.random() * window.innerWidth,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5
              }}
              className={`absolute w-2 h-2 rounded-full ${['bg-blue-500', 'bg-emerald-500', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]
                }`}
            />
          ))}
        </div>
      )}

      <div className="mobile-frame bg-white w-full max-w-md h-[800px] overflow-y-auto rounded-[36px] shadow-2xl border-8 border-slate-800 relative z-10">
        {/* Dynamic Island / Notch Simulation */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>

        {!showSuccess ? (
          <div className="p-6 pt-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">CivicaLab</h1>
              <p className="text-slate-600 text-sm">Reporta y Mejora tu Ciudad</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Nivel de Confianza: {currentUser.level}</span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Selecciona Categoría</h2>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all ${selectedCategory?.id === cat.id
                        ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                      }`}
                  >
                    <motion.div
                      className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md`}
                      animate={selectedCategory?.id === cat.id ? { rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <cat.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <p className="text-xs font-semibold text-slate-700">{cat.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{cat.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Report Form */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <label className="text-sm font-semibold text-slate-700 mb-2 block uppercase tracking-wide">
                  Describe el Problema
                </label>
                <textarea
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Ej: Bache grande en la entrada del barrio..."
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm resize-none text-slate-800"
                  rows="4"
                />
              </motion.div>
            )}

            {/* Location Simulation */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-700">Ubicación Detectada</p>
                  <p className="text-[11px] text-slate-500">Centro, Rionegro, Antioquia</p>
                </div>
                <div className="animate-pulse-custom">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Camera Button */}
            <button className="w-full mb-4 p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all">
              <div className="flex items-center justify-center gap-2">
                <Camera className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-600">Agregar Foto (Opcional)</span>
              </div>
            </button>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReport}
              disabled={!selectedCategory || !reportNote.trim()}
              className={`w-full p-4 rounded-xl font-semibold text-white transition-all ${selectedCategory && reportNote.trim()
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg scale-100'
                : 'bg-slate-300 cursor-not-allowed scale-95'
                }`}
            >
              Enviar Reporte
            </button>
          </div>
        ) : (
          // Success Screen
          <div className="h-full flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">¡Reporte Enviado!</h2>
              <div className="inline-block px-6 py-3 bg-slate-100 rounded-lg mb-4">
                <p className="text-sm text-slate-600">Reporte <span className="font-bold text-blue-600">#{lastReportId}</span></p>
              </div>
              <p className="text-sm text-slate-600 mb-2">enviado a la</p>
              <p className="text-lg font-bold text-slate-800 mb-6">Secretaría de Infraestructura</p>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Tiempo estimado de respuesta:</span> 2-3 días hábiles
                </p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="mt-6 px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium text-slate-700 transition-all"
              >
                Crear Nuevo Reporte
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenView;
