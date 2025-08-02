import React from 'react';
import { User, Settings, Clock, Bell, TrendingUp, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserDashboard = () => {
  const userStats = [
    { title: 'Profile Status', value: 'Active', change: '100%', icon: User, color: 'text-green-600' },
    { title: 'Last Login', value: 'Today', change: '0', icon: Clock, color: 'text-blue-600' },
    { title: 'Notifications', value: '3', change: '+1', icon: Bell, color: 'text-orange-600' },
    { title: 'Access Level', value: 'Standard', change: '0', icon: Key, color: 'text-purple-600' }
  ];

  const recentActivities = [
    { action: 'Profile updated successfully', time: '2 hours ago', status: 'success' },
    { action: 'Password changed', time: '1 day ago', status: 'success' },
    { action: 'Login from new device', time: '3 days ago', status: 'info' },
    { action: 'Access granted to Reports', time: '1 week ago', status: 'info' }
  ];

  const notifications = [
    { message: 'Your password will expire in 7 days', type: 'warning', time: '1 hour ago' },
    { message: 'New security feature available', type: 'info', time: '2 days ago' },
    { message: 'Profile verification completed', type: 'success', time: '1 week ago' }
  ];

  const quickActions = [
    { title: 'Change Password', description: 'Update your account password', icon: Key, color: 'text-blue-600' },
    { title: 'Update Profile', description: 'Edit your personal information', icon: User, color: 'text-green-600' },
    { title: 'Notification Settings', description: 'Manage your preferences', icon: Bell, color: 'text-orange-600' },
    { title: 'Account Settings', description: 'Configure account options', icon: Settings, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your account overview</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.change !== '0' && (
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span>{stat.change}</span>
                      </p>
                    )}
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
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900 truncate">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 break-words">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'success' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">{notification.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gray-50 ${action.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;