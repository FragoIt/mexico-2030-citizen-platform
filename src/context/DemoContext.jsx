import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoContext = createContext();

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

export const DemoProvider = ({ children }) => {
  // --- State ---
  const [currentUser, setCurrentUser] = useState({
    name: 'Ciudadano Activo',
    role: 'citizen', // 'citizen' | 'mayor'
    level: 'Alto', // Trust level
    avatar: '👤'
  });

  const [reports, setReports] = useState([]);
  const [isSimulationMode, setIsSimulationMode] = useState(false);

  // --- Initial Data Load ---
  useEffect(() => {
    // Load from localStorage or use defaults
    const savedReports = localStorage.getItem('civicalab_reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      // Default Mock Data
      setReports([
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
    }
  }, []);

  // --- Persistence ---
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem('civicalab_reports', JSON.stringify(reports));
    }
  }, [reports]);

  // --- Actions ---
  const addReport = (report) => {
    const newReport = {
      ...report,
      id: 1026 + reports.length,
      created: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5),
      votes: 0,
      status: 'Pendiente'
    };
    setReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const updateReportStatus = (id, status) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const toggleRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'citizen' ? 'mayor' : 'citizen'
    }));
  };

  // --- Simulation Mode ---
  useEffect(() => {
    let interval;
    if (isSimulationMode) {
      interval = setInterval(() => {
        const categories = ['Malla Vial', 'Alumbrado Público', 'Arborización', 'Seguridad', 'Aseo'];
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        const titles = [
          'Problema reportado por vecino',
          'Situación urgente en la zona',
          'Requiere atención inmediata',
          'Mantenimiento preventivo necesario',
          'Obstrucción en la vía pública'
        ];

        const newReport = {
          id: 1026 + reports.length + Math.floor(Math.random() * 1000),
          title: `${titles[Math.floor(Math.random() * titles.length)]} - ${randomCat}`,
          category: randomCat,
          location: 'Ubicación Simulada, Rionegro',
          coordinates: {
            lat: 6.14 + Math.random() * 0.03,
            lng: -75.39 + Math.random() * 0.03
          },
          status: 'Pendiente',
          priority: Math.random() > 0.7 ? 'Alta' : 'Media',
          reporter: 'Sistema de Monitoreo',
          created: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5),
          votes: Math.floor(Math.random() * 50),
          description: 'Reporte generado automáticamente por el sistema de simulación para demostración.',
          image: randomCat === 'Malla Vial' ? '🚗' : randomCat === 'Alumbrado Público' ? '💡' : randomCat === 'Arborización' ? '🌳' : randomCat === 'Seguridad' ? '🛡️' : '🗑️'
        };

        setReports(prev => [newReport, ...prev]);
      }, 3000); // New report every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isSimulationMode, reports]);

  // --- Metrics Calculation ---
  const getMetrics = () => {
    const total = reports.length;
    const resolved = reports.filter(r => r.status === 'Resuelto').length;
    const pending = reports.filter(r => r.status === 'Pendiente').length;

    // Simulated ROI
    const avgCostPerReport = 850000;
    const operationalSaving = resolved * avgCostPerReport * 0.35;
    const monthlySaving = (operationalSaving / 1000000).toFixed(1);

    return {
      total,
      resolved,
      pending,
      monthlySaving,
      npsScore: 72,
      avgResponseDays: 2.5
    };
  };

  return (
    <DemoContext.Provider value={{
      currentUser,
      reports,
      isSimulationMode,
      addReport,
      updateReportStatus,
      toggleRole,
      getMetrics,
      setIsSimulationMode
    }}>
      {children}
    </DemoContext.Provider>
  );
};
