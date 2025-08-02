import React from 'react';
import { Server, Cpu, Database, Wifi, TrendingUp, HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InfraDashboard = () => {
  const infraStats = [
    { title: 'Server Uptime', value: '99.9%', change: '+0.1%', icon: Server, color: 'text-green-600' },
    { title: 'CPU Usage', value: '68%', change: '-5%', icon: Cpu, color: 'text-blue-600' },
    { title: 'Network Load', value: '45%', change: '+12%', icon: Wifi, color: 'text-purple-600' },
    { title: 'Storage Used', value: '73%', change: '+3%', icon: HardDrive, color: 'text-orange-600' }
  ];

  const serverHealth = [
    { name: 'Web Server 01', status: 'healthy', cpu: '65%', memory: '72%', uptime: '15 days' },
    { name: 'Database Server', status: 'healthy', cpu: '45%', memory: '68%', uptime: '30 days' },
    { name: 'API Gateway', status: 'warning', cpu: '85%', memory: '90%', uptime: '8 days' },
    { name: 'Load Balancer', status: 'healthy', cpu: '23%', memory: '45%', uptime: '45 days' }
  ];

  const systemAlerts = [
    { alert: 'High CPU usage on API Gateway', severity: 'warning', time: '10 min ago', server: 'api-gw-01' },
    { alert: 'Disk space low on backup server', severity: 'medium', time: '1 hour ago', server: 'backup-01' },
    { alert: 'Network latency increase detected', severity: 'low', time: '3 hours ago', server: 'network' }
  ];

  const networkStats = [
    { metric: 'Total Bandwidth', value: '1.2 Gbps', usage: '60%' },
    { metric: 'Inbound Traffic', value: '450 Mbps', usage: '45%' },
    { metric: 'Outbound Traffic', value: '320 Mbps', usage: '32%' },
    { metric: 'Active Connections', value: '2,847', usage: '71%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Infrastructure Dashboard</h1>
          <p className="text-gray-600">System monitoring and infrastructure health</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Infrastructure Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {infraStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm flex items-center mt-1 ${
                      stat.change.startsWith('-') ? 'text-green-600' : 'text-orange-600'
                    }`}>
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
        {/* Server Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Server Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serverHealth.map((server, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      server.status === 'healthy' ? 'bg-green-500' :
                      server.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{server.name}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>CPU: {server.cpu}</span>
                        <span>Memory: {server.memory}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="text-xs text-gray-500">Uptime: {server.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    alert.severity === 'warning' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 break-words">{alert.alert}</p>
                    <p className="text-xs text-gray-600">Server: {alert.server}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        alert.severity === 'warning' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
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
      </div>

      {/* Network Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="h-5 w-5" />
            <span>Network Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkStats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">{stat.metric}</p>
                  <span className="text-sm text-gray-500">{stat.usage}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: stat.usage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfraDashboard;