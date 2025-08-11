
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const iamLinks = [
    { name: 'User Management', path: '/users' },
    { name: 'Role Management', path: '/roles' },
    { name: 'Access Control', path: '/access-control' },
    { name: 'Permissions', path: '/permissions' },
    { name: 'Authentication', path: '/authentication' },
    { name: 'Audit & Compliance', path: '/audit-logs' },
    { name: 'Security Monitoring', path: '/monitoring' },
    { name: 'Reports & Analytics', path: '/reports' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SI</span>
              </div>
              <span className="text-2xl font-bold">IAM System</span>
            </div>
            <p className="text-gray-400 text-base max-w-md leading-relaxed">
              Complete Identity & Access Management solution for enterprise security and compliance.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/users" className="text-gray-400 hover:text-white transition-colors text-sm">User Management</Link></li>
              <li><Link to="/roles" className="text-gray-400 hover:text-white transition-colors text-sm">Role Management</Link></li>
              <li><Link to="/access-control" className="text-gray-400 hover:text-white transition-colors text-sm">Access Control</Link></li>
              <li><Link to="/permissions" className="text-gray-400 hover:text-white transition-colors text-sm">Permissions</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/documentation" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Identity and Access Management System. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/security" className="text-gray-400 hover:text-white text-sm transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
