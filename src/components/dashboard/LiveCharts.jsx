import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Lun', reports: 4, resolved: 3 },
  { name: 'Mar', reports: 7, resolved: 5 },
  { name: 'Mie', reports: 5, resolved: 4 },
  { name: 'Jue', reports: 12, resolved: 8 },
  { name: 'Vie', reports: 8, resolved: 6 },
  { name: 'Sab', reports: 15, resolved: 10 },
  { name: 'Dom', reports: 10, resolved: 9 },
];

const LiveCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Chart 1: Reports vs Resolved Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wide">Tendencia de Resolución</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" name="Reportados" />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" name="Resueltos" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Chart 2: Efficiency by Category (Simulated) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wide">Eficiencia por Categoría</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Vial', val: 85 },
              { name: 'Luz', val: 92 },
              { name: 'Arbol', val: 78 },
              { name: 'Seg', val: 95 },
              { name: 'Aseo', val: 88 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: '#334155', opacity: 0.2 }}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="val" fill="#6366f1" radius={[4, 4, 0, 0]} name="Eficiencia %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveCharts;
