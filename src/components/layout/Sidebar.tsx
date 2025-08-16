
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
  Activity,
  AlertTriangle,
  Bug,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Roles', icon: Shield, path: '/roles' },
    { name: 'Access Control', icon: Key, path: '/access-control' },
    { name: 'Permissions', icon: UserCheck, path: '/permissions' },
    { name: 'Authentication', icon: Lock, path: '/authentication' },
    { name: 'Security Incidents', icon: AlertTriangle, path: '/security-incidents' },
    { name: 'Vulnerabilities', icon: Bug, path: '/vulnerability-management' },
    { name: 'Audit Logs', icon: FileText, path: '/audit-logs' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Monitoring', icon: Activity, path: '/monitoring' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 z-50 h-screen md:h-auto md:self-stretch
        w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        {/* Mobile close button */}
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-6 pb-6 pt-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => onClose()}
                  className={`flex items-center space-x-3 p-3 transition-colors ${
                    isActive 
                      ? 'bg-cyan-500 text-white relative -mr-6 pr-8 rounded-l-lg shadow-lg mt-2' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg mx-2'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
