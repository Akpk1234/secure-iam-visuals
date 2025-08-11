
import React, { useState } from 'react';
import { FileText, Search, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      user: 'admin@company.com',
      action: 'User Created',
      resource: 'User: john.doe@company.com',
      ip: '192.168.1.100',
      status: 'Success',
      severity: 'Info'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:25:12',
      user: 'manager@company.com',
      action: 'Role Updated',
      resource: 'Role: Manager',
      ip: '192.168.1.105',
      status: 'Success',
      severity: 'Info'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:20:45',
      user: 'unknown',
      action: 'Failed Login',
      resource: 'User: admin@company.com',
      ip: '203.0.113.1',
      status: 'Failed',
      severity: 'Warning'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:15:33',
      user: 'admin@company.com',
      action: 'Permission Granted',
      resource: 'Permission: user.delete',
      ip: '192.168.1.100',
      status: 'Success',
      severity: 'High'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:10:18',
      user: 'user@company.com',
      action: 'Password Changed',
      resource: 'User: user@company.com',
      ip: '192.168.1.110',
      status: 'Success',
      severity: 'Info'
    }
  ];

  const filteredLogs = auditLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Actions</option>
                <option value="login">Login/Logout</option>
                <option value="user">User Management</option>
                <option value="role">Role Management</option>
                <option value="permission">Permissions</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Audit Trail ({filteredLogs.length} entries)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Timestamp</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">User</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Action</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Resource</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">IP Address</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Severity</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-mono text-gray-600">{log.timestamp}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{log.user}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{log.action}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{log.resource}</td>
                    <td className="py-4 px-6 text-sm font-mono text-gray-600">{log.ip}</td>
                    <td className="py-4 px-6">
                      <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                        {log.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={
                        log.severity === 'High' ? 'destructive' :
                        log.severity === 'Warning' ? 'secondary' : 'outline'
                      }>
                        {log.severity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
