import React from 'react';
import { Users, Shield, Key, Activity, TrendingUp, AlertTriangle, Database, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const adminStats = [
    { title: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'System Roles', value: '23', change: '+2', icon: Shield, color: 'text-green-600' },
    { title: 'Global Permissions', value: '156', change: '+8', icon: Key, color: 'text-purple-600' },
    { title: 'Active Sessions', value: '1,234', change: '+15%', icon: Activity, color: 'text-orange-600' },
    { title: 'Database Health', value: '98.5%', change: '+0.2%', icon: Database, color: 'text-cyan-600' },
    { title: 'Server Uptime', value: '99.9%', change: '0%', icon: Server, color: 'text-indigo-600' }
  ];

  const systemAlerts = [
    { message: 'Critical: Multiple failed admin login attempts', severity: 'high', time: '2 min ago' },
    { message: 'System maintenance scheduled for tonight', severity: 'medium', time: '1 hour ago' },
    { message: 'Database backup completed successfully', severity: 'low', time: '3 hours ago' }
  ];

  const recentAdminActions = [
    { user: 'System Admin', action: 'Created new role: Senior Manager', time: '5 minutes ago', status: 'success' },
    { user: 'Admin User', action: 'Deleted inactive user accounts (5)', time: '30 minutes ago', status: 'info' },
    { user: 'System', action: 'Automated security scan completed', time: '1 hour ago', status: 'success' },
    { user: 'Admin User', action: 'Updated system permissions', time: '2 hours ago', status: 'info' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Complete system overview and administration</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{stat.change}</span>
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color} flex-shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 break-words">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Admin Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAdminActions.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{activity.user}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;