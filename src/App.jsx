import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import MainLayout from './components/layout/MainLayout';
import CitizenView from './components/citizen/CitizenView';
import MayorDashboard from './components/dashboard/MayorDashboard';

const AppContent = () => {
  const { currentUser } = useDemo();

  return (
    <MainLayout>
      {currentUser.role === 'citizen' ? <CitizenView /> : <MayorDashboard />}
    </MainLayout>
  );
};

const App = () => {
  return (
    <DemoProvider>
      <AppContent />
    </DemoProvider>
  );
};

export default App;
