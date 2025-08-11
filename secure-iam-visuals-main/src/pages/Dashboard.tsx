
import React from 'react';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import ManagerDashboard from '@/components/dashboards/ManagerDashboard';
import CyberDashboard from '@/components/dashboards/CyberDashboard';
import InfraDashboard from '@/components/dashboards/InfraDashboard';
import UserDashboard from '@/components/dashboards/UserDashboard';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole') || 'user';

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'cyber':
        return <CyberDashboard />;
      case 'infra':
        return <InfraDashboard />;
      case 'user':
      default:
        return <UserDashboard />;
    }
  };

  return renderDashboard();
};

export default Dashboard;
