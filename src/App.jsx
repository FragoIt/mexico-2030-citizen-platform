import React, { useState, useEffect } from 'react';
import {
  MapPin, AlertTriangle, Lightbulb, Camera, TrendingDown, Clock,
  ThumbsUp, CheckCircle, XCircle, Menu, Activity, DollarSign,
  Smile, Construction, TreePine, Shield, Trash2, Users, Award,
  ChevronRight, AlertCircle, RefreshCw, Eye
} from 'lucide-react';

/**
 * CivicaLab - Governance as a Service Platform
 * 
 * Architecture: Offline-First Simulation
 * - All data is stored in React state (useState)
 * - Real-time updates between citizen and government views
 * - No backend required for MVP demo
 * 
 * Core Features:
 * 1. Citizen Mobile Experience - Report submission
 * 2. Executive Dashboard - ROI metrics and heat map
 * 3. Crisis Management - Report triage and approval
 */

const App = () => {
  // View State: 'citizen' or 'mayor'
  const [currentView, setCurrentView] = useState('citizen');
  
  // Citizen View State
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reportNote, setReportNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [citizenLevel, setCitizenLevel] = useState('Alto');
  
  // Mayor Dashboard State
  const [hoveredReport, setHoveredReport] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Categories for reporting - Colombian municipality context
  const categories = [
    { id: 1, name: 'Malla Vial', icon: Construction, color: 'bg-orange-500', description: 'Baches, pavimento' },
    { id: 2, name: 'Alumbrado Público', icon: Lightbulb, color: 'bg-yellow-500', description: 'Postes, luminarias' },
    { id: 3, name: 'Arborización', icon: TreePine, color: 'bg-green-500', description: 'Árboles, zonas verdes' },
    { id: 4, name: 'Seguridad', icon: Shield, color: 'bg-red-500', description: 'Vigilancia, emergencias' },
    { id: 5, name: 'Aseo', icon: Trash2, color: 'bg-blue-500', description: 'Recolección, limpieza' },
  ];

  // Mock Data - Realistic Colombian municipality (Rionegro, Antioquia)
  const [reports, setReports] = useState([
    {
      id: 1025,
      title: 'Bache grande en la Autopista Aeropuerto',
      category: 'Malla Vial',
      location: 'Autopista José María Córdoba Km 2.5, Rionegro',
      coordinates: { lat: 6.1549, lng: -75.4194 },
      status: 'Pendiente',
      priority: 'Alta',
      reporter: 'María Gómez',
      created: '2024-11-18 08:30',
      votes: 45,
      description: 'Bache de aproximadamente 50cm que causa daños a vehículos',
      image: '🚗'
    },
    {
      id: 1024,
      title: 'Luminaria apagada en Parque Principal',
      category: 'Alumbrado Público',
      location: 'Calle 50 con Carrera 48, Centro, Rionegro',
      coordinates: { lat: 6.1561, lng: -75.3736 },
      status: 'En Reparación',
      priority: 'Media',
      reporter: 'Carlos Ruiz',
      created: '2024-11-17 19:45',
      votes: 23,
      description: 'Poste de luz apagado hace 3 días, zona oscura en la noche',
      image: '💡'
    },
    {
      id: 1023,
      title: 'Árbol caído en zona peatonal',
      category: 'Arborización',
      location: 'Av. Las Acacias con Calle 45, Rionegro',
      coordinates: { lat: 6.1498, lng: -75.3801 },
      status: 'Resuelto',
      priority: 'Alta',
      reporter: 'Juan Pérez',
      created: '2024-11-16 14:20',
      votes: 67,
      description: 'Árbol obstruye paso peatonal después de tormenta',
      image: '🌳'
    },
    {
      id: 1022,
      title: 'Acumulación de basura en esquina',
      category: 'Aseo',
      location: 'Carrera 52 # 49-23, Rionegro',
      coordinates: { lat: 6.1575, lng: -75.3689 },
      status: 'Pendiente',
      priority: 'Media',
      reporter: 'Ana Martínez',
      created: '2024-11-15 10:15',
      votes: 12,
      description: 'Basuras sin recoger durante 2 días generan malos olores',
      image: '🗑️'
    },
  ]);

  // Calculate metrics based on current reports
  const calculateMetrics = () => {
    const total = reports.length;
    const resolved = reports.filter(r => r.status === 'Resuelto').length;
    const inProgress = reports.filter(r => r.status === 'En Reparación').length;
    const pending = reports.filter(r => r.status === 'Pendiente').length;
    
    // Simulated ROI calculation
    const avgCostPerReport = 850000; // COP
    const operationalSaving = resolved * avgCostPerReport * 0.35; // 35% savings
    const monthlySaving = (operationalSaving / 1000000).toFixed(1); // Convert to millions
    
    // Average response time (simulated improvement)
    const avgResponseDays = 2.5;
    const improvement = 40; // 40% improvement
    
    // NPS Score (simulated)
    const npsScore = 72;
    
    return {
      totalReports: total,
      resolved,
      inProgress,
      pending,
      monthlySaving,
      avgResponseDays,
      improvement,
      npsScore
    };
  };

  const metrics = calculateMetrics();

  // Handle new report submission
  const handleSubmitReport = () => {
    if (!selectedCategory || !reportNote.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }

    const newReport = {
      id: 1026 + reports.length,
      title: reportNote.substring(0, 50),
      category: selectedCategory.name,
      location: 'Ubicación Detectada: Centro, Rionegro',
      coordinates: { lat: 6.1549 + Math.random() * 0.01, lng: -75.3736 + Math.random() * 0.01 },
      status: 'Pendiente',
      priority: 'Media',
      reporter: 'Ciudadano Activo',
      created: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5),
      votes: 1,
      description: reportNote,
      image: selectedCategory.id === 1 ? '🚗' : selectedCategory.id === 2 ? '💡' : selectedCategory.id === 3 ? '🌳' : selectedCategory.id === 4 ? '🛡️' : '🗑️'
    };

    setReports([newReport, ...reports]);
    setShowSuccess(true);
    setReportNote('');
    setSelectedCategory(null);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Handle report approval
  const handleApproveReport = (reportId) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'En Reparación' } : r
    ));
  };

  // Handle report rejection
  const handleRejectReport = (reportId) => {
    if (window.confirm('¿Está seguro de rechazar este reporte?')) {
      setReports(reports.filter(r => r.id !== reportId));
    }
  };

  // Toggle between views
  const toggleView = () => {
    setCurrentView(currentView === 'citizen' ? 'mayor' : 'citizen');
  };

  // Citizen Mobile View Component
  const CitizenView = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="mobile-frame bg-white w-full max-w-md h-[700px] overflow-y-auto">
        {!showSuccess ? (
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-8 pt-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">CivicaLab</h1>
              <p className="text-slate-600 text-sm">Reporta y Mejora tu Ciudad</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Nivel de Confianza: {citizenLevel}</span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Selecciona Categoría</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedCategory?.id === cat.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <cat.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">{cat.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{cat.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Report Form */}
            {selectedCategory && (
              <div className="mb-6 animate-slide-up">
                <label className="text-sm font-semibold text-slate-700 mb-2 block uppercase tracking-wide">
                  Describe el Problema
                </label>
                <textarea
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Ej: Bache grande en la entrada del barrio..."
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm resize-none"
                  rows="4"
                />
              </div>
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
              className={`w-full p-4 rounded-xl font-semibold text-white transition-all ${
                selectedCategory && reportNote.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Enviar Reporte
            </button>
          </div>
        ) : (
          // Success Screen
          <div className="h-full flex items-center justify-center p-6 animate-slide-up">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">¡Reporte Enviado!</h2>
              <div className="inline-block px-6 py-3 bg-slate-100 rounded-lg mb-4">
                <p className="text-sm text-slate-600">Reporte <span className="font-bold text-blue-600">#{reports[0]?.id}</span></p>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Mayor Dashboard View Component
  const MayorDashboardView = () => (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CivicaLab Dashboard</h1>
              <p className="text-xs text-slate-400">Municipio de Rionegro - Centro de Control</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-900/30 border border-emerald-700 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-400">Sistema Activo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* ROI Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Metric 1: Operational Savings */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="px-3 py-1 bg-emerald-900/30 rounded-full">
                <span className="text-xs font-semibold text-emerald-400">+35%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Ahorro Operativo (Mes)</h3>
            <p className="text-3xl font-bold text-white mb-1">${metrics.monthlySaving}M</p>
            <p className="text-xs text-slate-500">COP · Inteligencia Ciudadana</p>
          </div>

          {/* Metric 2: Response Time */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div className="px-3 py-1 bg-blue-900/30 rounded-full flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400">{metrics.improvement}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Tiempo Respuesta Promedio</h3>
            <p className="text-3xl font-bold text-white mb-1">{metrics.avgResponseDays} días</p>
            <p className="text-xs text-slate-500">Comparativa vs. trimestre anterior</p>
          </div>

          {/* Metric 3: Citizen Satisfaction (NPS) */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-rose-900/30 rounded-xl flex items-center justify-center">
                <Smile className="w-6 h-6 text-rose-400" />
              </div>
              <div className="px-3 py-1 bg-rose-900/30 rounded-full">
                <span className="text-xs font-semibold text-rose-400">Excelente</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Satisfacción Ciudadana (NPS)</h3>
            <p className="text-3xl font-bold text-white mb-1">{metrics.npsScore}</p>
            <p className="text-xs text-slate-500">Net Promoter Score · Último mes</p>
          </div>
        </div>

        {/* Main Content: Heat Map + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Heat Map */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Mapa de Calor Operacional</h2>
                <p className="text-xs text-slate-400">Reportes Geo-referenciados · Rionegro</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">Alta</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">Media</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">Baja</span>
                </div>
              </div>
            </div>
            
            {/* Simulated Map */}
            <div 
              className="relative bg-slate-900 rounded-xl h-96 overflow-hidden border border-slate-700"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="border border-slate-600"></div>
                  ))}
                </div>
              </div>

              {/* Map markers */}
              {reports.map((report, index) => {
                const xPos = 20 + (index * 18) % 70;
                const yPos = 15 + (index * 23) % 65;
                const priorityColor = report.priority === 'Alta' ? 'bg-red-500' : 
                                     report.priority === 'Media' ? 'bg-yellow-500' : 'bg-green-500';
                
                return (
                  <div
                    key={report.id}
                    className={`absolute w-4 h-4 ${priorityColor} rounded-full cursor-pointer transition-transform hover:scale-150 shadow-lg`}
                    style={{ left: `${xPos}%`, top: `${yPos}%` }}
                    onMouseEnter={() => setHoveredReport(report)}
                    onMouseLeave={() => setHoveredReport(null)}
                  >
                    <div className={`absolute inset-0 ${priorityColor} rounded-full animate-ping opacity-75`}></div>
                  </div>
                );
              })}

              {/* Tooltip */}
              {hoveredReport && (
                <div
                  className="tooltip absolute bg-slate-800 border-2 border-slate-600 rounded-lg p-3 shadow-2xl z-50 w-64"
                  style={{
                    left: `${mousePosition.x + 10}px`,
                    top: `${mousePosition.y + 10}px`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{hoveredReport.image}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-1">{hoveredReport.title}</h4>
                      <p className="text-xs text-slate-400 mb-2">{hoveredReport.location}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-[10px] font-semibold rounded ${
                          hoveredReport.status === 'Pendiente' ? 'bg-yellow-900/50 text-yellow-400' :
                          hoveredReport.status === 'En Reparación' ? 'bg-blue-900/50 text-blue-400' :
                          'bg-green-900/50 text-green-400'
                        }`}>
                          {hoveredReport.status}
                        </span>
                        <span className="text-xs text-slate-500">#{hoveredReport.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Actividad en Tiempo Real</h2>
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {reports.slice(0, 6).map((report, index) => (
                <div key={report.id} className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{report.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-white text-xs truncate">{report.title}</h4>
                        {index === 0 && (
                          <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 text-[10px] font-bold rounded-full whitespace-nowrap">
                            NUEVO
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mb-2">{report.category} · {report.created}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                          report.status === 'Pendiente' ? 'bg-yellow-900/50 text-yellow-400' :
                          report.status === 'En Reparación' ? 'bg-blue-900/50 text-blue-400' :
                          'bg-green-900/50 text-green-400'
                        }`}>
                          {report.status}
                        </span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-slate-500" />
                          <span className="text-[10px] text-slate-500">{report.votes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crisis Management / Triage Table */}
        <div className="mt-6 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Centro de Triaje · Gestión de Crisis</h2>
              <p className="text-xs text-slate-400">Órdenes de Trabajo Pendientes</p>
            </div>
            <div className="px-4 py-2 bg-slate-700 rounded-lg">
              <span className="text-sm font-semibold text-white">{metrics.pending} Pendientes</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 px-4">ID</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 px-4">Reporte</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 px-4">Categoría</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 px-4">Ubicación</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 px-4">Prioridad</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 px-4">Estado</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reports.filter(r => r.status !== 'Resuelto').map((report) => (
                  <tr key={report.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-sm font-mono text-slate-300">#{report.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{report.image}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{report.title}</p>
                          <p className="text-xs text-slate-400">{report.reporter} · {report.created}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-300">{report.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-xs text-slate-400 max-w-xs truncate">{report.location}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        report.priority === 'Alta' ? 'bg-red-900/30 text-red-400' :
                        report.priority === 'Media' ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-green-900/30 text-green-400'
                      }`}>
                        {report.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'Pendiente' ? 'bg-yellow-900/30 text-yellow-400' :
                        report.status === 'En Reparación' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-green-900/30 text-green-400'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {report.status === 'Pendiente' && (
                          <button
                            onClick={() => handleApproveReport(report.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Aprobar
                          </button>
                        )}
                        <button
                          onClick={() => handleRejectReport(report.id)}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Main Content */}
      {currentView === 'citizen' ? <CitizenView /> : <MayorDashboardView />}

      {/* Role Toggle Button (Demo Control) */}
      <button
        onClick={toggleView}
        className="fixed bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-full shadow-2xl transition-all flex items-center gap-2 z-50 border-2 border-purple-400"
      >
        <RefreshCw className="w-5 h-5" />
        <span>Cambiar Rol (Demo)</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Current View Indicator */}
      <div className="fixed top-6 right-6 px-4 py-2 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-full shadow-lg z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-white">
            {currentView === 'citizen' ? '📱 Vista Ciudadano' : '🏛️ Vista Alcalde'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
