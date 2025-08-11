import React from 'react';
import { Users, UserCheck, Clock, TrendingUp, BarChart3, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ManagerDashboard = () => {
  const managerStats = [
    { title: 'Team Members', value: '47', change: '+3', icon: Users, color: 'text-blue-600' },
    { title: 'Active Users', value: '42', change: '+5', icon: UserCheck, color: 'text-green-600' },
    { title: 'Pending Approvals', value: '8', change: '+2', icon: Clock, color: 'text-orange-600' },
    { title: 'Team Performance', value: '94%', change: '+2%', icon: Target, color: 'text-purple-600' }
  ];

  const teamActivities = [
    { user: 'Sarah Johnson', action: 'Completed project milestone', time: '1 hour ago', status: 'success' },
    { user: 'Mike Chen', action: 'Requested access to Finance module', time: '2 hours ago', status: 'pending' },
    { user: 'Emily Davis', action: 'Login from new device approved', time: '3 hours ago', status: 'info' },
    { user: 'David Wilson', action: 'Password reset completed', time: '5 hours ago', status: 'success' }
  ];

  const pendingApprovals = [
    { request: 'Access request: Marketing Dashboard', user: 'John Smith', priority: 'high', time: '30 min ago' },
    { request: 'Role change: Junior to Senior', user: 'Lisa Brown', priority: 'medium', time: '2 hours ago' },
    { request: 'New user account creation', user: 'Alex Johnson', priority: 'low', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600">Team management and approval oversight</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Manager Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {managerStats.map((stat, index) => {
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
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span>Pending Approvals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    approval.priority === 'high' ? 'bg-red-500' :
                    approval.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 break-words">{approval.request}</p>
                    <p className="text-sm text-gray-600">Requested by: {approval.user}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        approval.priority === 'high' ? 'bg-red-100 text-red-800' :
                        approval.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {approval.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">{approval.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Team Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' :
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

export default ManagerDashboard;