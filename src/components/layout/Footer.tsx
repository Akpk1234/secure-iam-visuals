
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
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="text-xl font-bold">SecureIAM</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Complete Identity & Access Management solution for enterprise security and compliance.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">IAM Features</h3>
            <ul className="space-y-2">
              {iamLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Security & Compliance</h3>
            <ul className="space-y-2">
              {iamLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/status" className="text-gray-400 hover:text-white transition-colors">System Status</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SecureIAM. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/security" className="text-gray-400 hover:text-white text-sm transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
