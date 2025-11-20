import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { MapPin, DollarSign, Clock, TrendingDown, Smile, ThumbsUp, CheckCircle, XCircle, RefreshCw, Play, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import MapView from '../map/MapView';
import LiveCharts from './LiveCharts';

const MayorDashboard = () => {
  const { reports, getMetrics, updateReportStatus, isSimulationMode, setIsSimulationMode } = useDemo();
  const metrics = getMetrics();

  // Local UI state
  const [hoveredReport, setHoveredReport] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handlers
  const handleApproveReport = (reportId) => {
    updateReportStatus(reportId, 'En Reparación');
  };

  const handleRejectReport = (reportId) => {
    if (window.confirm('¿Está seguro de rechazar este reporte?')) {
      updateReportStatus(reportId, 'Rechazado');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CivicaLab Dashboard</h1>
              <p className="text-xs text-slate-400">Municipio de Rionegro - Centro de Control</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSimulationMode(!isSimulationMode)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-all ${isSimulationMode
                ? 'bg-rose-900/30 border-rose-700 text-rose-400 hover:bg-rose-900/50'
                : 'bg-blue-900/30 border-blue-700 text-blue-400 hover:bg-blue-900/50'
                }`}
            >
              {isSimulationMode ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-xs font-semibold">{isSimulationMode ? 'Detener Simulación' : 'Iniciar Simulación'}</span>
            </button>

            <div className="px-4 py-2 bg-emerald-900/30 border border-emerald-700 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-400">Sistema Activo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* ROI Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Metric 1: Operational Savings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl"
          >
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
          </motion.div>

          {/* Metric 2: Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div className="px-3 py-1 bg-blue-900/30 rounded-full flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400">40%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Tiempo Respuesta Promedio</h3>
            <p className="text-3xl font-bold text-white mb-1">{metrics.avgResponseDays} días</p>
            <p className="text-xs text-slate-500">Comparativa vs. trimestre anterior</p>
          </motion.div>

          {/* Metric 3: Citizen Satisfaction (NPS) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl"
          >
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
          </motion.div>
        </div>

        {/* Live Charts Section */}
        <LiveCharts />

        {/* Main Content: Heat Map + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Heat Map */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col">
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

            {/* Real Interactive Map */}
            <div className="relative bg-slate-900 rounded-xl h-96 overflow-hidden border border-slate-700 flex-1">
              <MapView reports={reports} />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Actividad en Tiempo Real</h2>
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {reports.slice(0, 6).map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-all"
                >
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
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${report.status === 'Pendiente' ? 'bg-yellow-900/50 text-yellow-400' :
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
                </motion.div>
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
                {reports.filter(r => r.status !== 'Resuelto' && r.status !== 'Rechazado').map((report) => (
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
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${report.priority === 'Alta' ? 'bg-red-900/30 text-red-400' :
                        report.priority === 'Media' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-green-900/30 text-green-400'
                        }`}>
                        {report.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${report.status === 'Pendiente' ? 'bg-yellow-900/30 text-yellow-400' :
                        report.status === 'En Reparación' ? 'bg-blue-900/50 text-blue-400' :
                          'bg-green-900/50 text-green-400'
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
};

export default MayorDashboard;
