
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Key, 
  FileText, 
  Settings, 
  BarChart3,
  UserCheck,
  Lock,
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Roles', icon: Shield, path: '/roles' },
    { name: 'Access Control', icon: Key, path: '/access-control' },
    { name: 'Permissions', icon: UserCheck, path: '/permissions' },
    { name: 'Authentication', icon: Lock, path: '/authentication' },
    { name: 'Audit Logs', icon: FileText, path: '/audit-logs' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Monitoring', icon: Activity, path: '/monitoring' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
