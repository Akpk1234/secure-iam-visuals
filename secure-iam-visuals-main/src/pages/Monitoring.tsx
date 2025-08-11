
import React from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Monitoring = () => {
  const systemStatus = [
    { service: 'Authentication Service', status: 'Healthy', uptime: '99.9%', responseTime: '45ms' },
    { service: 'User Management API', status: 'Healthy', uptime: '99.8%', responseTime: '52ms' },
    { service: 'Audit Logging', status: 'Warning', uptime: '98.5%', responseTime: '120ms' },
    { service: 'Session Management', status: 'Healthy', uptime: '99.7%', responseTime: '38ms' },
    { service: 'Database Connection', status: 'Critical', uptime: '95.2%', responseTime: '250ms' }
  ];

  const alerts = [
    { id: 1, message: 'High response time detected on Database Connection', severity: 'Critical', timestamp: '2 min ago' },
    { id: 2, message: 'Unusual login pattern detected', severity: 'Warning', timestamp: '15 min ago' },
    { id: 3, message: 'Audit log storage at 85% capacity', severity: 'Warning', timestamp: '1 hour ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Health</p>
                <p className="text-2xl font-bold text-green-600">98.4%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Service</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Uptime</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {systemStatus.map((service, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{service.service}</td>
                    <td className="py-4 px-6">
                      <Badge variant={
                        service.status === 'Healthy' ? 'default' :
                        service.status === 'Warning' ? 'secondary' : 'destructive'
                      }>
                        {service.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{service.uptime}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{service.responseTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Active Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={alert.severity === 'Critical' ? 'destructive' : 'secondary'}>
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitoring;
