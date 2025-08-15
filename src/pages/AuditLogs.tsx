
import React, { useState } from 'react';
import { FileText, Search, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as XLSX from 'xlsx';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const auditLogs = [
    { id: 1, timestamp: '2024-01-15 14:30:25', user: 'admin@company.com', action: 'User Created', resource: 'User: john.doe@company.com', ip: '192.168.1.100', status: 'Success', severity: 'Info' },
    { id: 2, timestamp: '2024-01-15 14:25:12', user: 'manager@company.com', action: 'Role Updated', resource: 'Role: Manager', ip: '192.168.1.105', status: 'Success', severity: 'Info' },
    { id: 3, timestamp: '2024-01-15 14:20:45', user: 'unknown', action: 'Failed Login', resource: 'User: admin@company.com', ip: '203.0.113.1', status: 'Failed', severity: 'Warning' },
    { id: 4, timestamp: '2024-01-15 14:15:33', user: 'admin@company.com', action: 'Permission Granted', resource: 'Permission: user.delete', ip: '192.168.1.100', status: 'Success', severity: 'High' },
    { id: 5, timestamp: '2024-01-15 14:10:18', user: 'user@company.com', action: 'Password Changed', resource: 'User: user@company.com', ip: '192.168.1.110', status: 'Success', severity: 'Info' },
    { id: 6, timestamp: '2024-01-15 14:05:33', user: 'security@company.com', action: 'Role Deleted', resource: 'Role: Guest', ip: '192.168.1.120', status: 'Success', severity: 'High' },
    { id: 7, timestamp: '2024-01-15 14:00:12', user: 'hr@company.com', action: 'User Deactivated', resource: 'User: temp.user@company.com', ip: '192.168.1.130', status: 'Success', severity: 'Info' },
    { id: 8, timestamp: '2024-01-15 13:55:45', user: 'unknown', action: 'Brute Force Attack', resource: 'Login System', ip: '45.123.45.67', status: 'Blocked', severity: 'Critical' },
    { id: 9, timestamp: '2024-01-15 13:50:28', user: 'audit@company.com', action: 'Audit Log Exported', resource: 'Audit System', ip: '192.168.1.140', status: 'Success', severity: 'Info' },
    { id: 10, timestamp: '2024-01-15 13:45:15', user: 'manager@company.com', action: 'Permission Revoked', resource: 'Permission: admin.access', ip: '192.168.1.105', status: 'Success', severity: 'High' },
    { id: 11, timestamp: '2024-01-15 13:40:22', user: 'developer@company.com', action: 'API Key Generated', resource: 'API Management', ip: '192.168.1.150', status: 'Success', severity: 'Info' },
    { id: 12, timestamp: '2024-01-15 13:35:11', user: 'admin@company.com', action: 'Security Policy Updated', resource: 'Policy: Password Requirements', ip: '192.168.1.100', status: 'Success', severity: 'High' },
    { id: 13, timestamp: '2024-01-15 13:30:45', user: 'unknown', action: 'Unauthorized Access Attempt', resource: 'Admin Panel', ip: '198.51.100.10', status: 'Denied', severity: 'Warning' },
    { id: 14, timestamp: '2024-01-15 13:25:33', user: 'support@company.com', action: 'User Password Reset', resource: 'User: help.desk@company.com', ip: '192.168.1.160', status: 'Success', severity: 'Info' },
    { id: 15, timestamp: '2024-01-15 13:20:18', user: 'finance@company.com', action: 'Financial Data Accessed', resource: 'Financial Reports', ip: '192.168.1.170', status: 'Success', severity: 'Info' },
    { id: 16, timestamp: '2024-01-15 13:15:44', user: 'security@company.com', action: 'Firewall Rule Added', resource: 'Network Security', ip: '192.168.1.120', status: 'Success', severity: 'High' },
    { id: 17, timestamp: '2024-01-15 13:10:29', user: 'admin@company.com', action: 'Database Backup Created', resource: 'User Database', ip: '192.168.1.100', status: 'Success', severity: 'Info' },
    { id: 18, timestamp: '2024-01-15 13:05:17', user: 'unknown', action: 'SQL Injection Attempt', resource: 'Web Application', ip: '185.199.108.153', status: 'Blocked', severity: 'Critical' },
    { id: 19, timestamp: '2024-01-15 13:00:55', user: 'marketing@company.com', action: 'Campaign Data Exported', resource: 'Marketing Database', ip: '192.168.1.180', status: 'Success', severity: 'Info' },
    { id: 20, timestamp: '2024-01-15 12:55:41', user: 'devops@company.com', action: 'Server Configuration Changed', resource: 'Production Server', ip: '192.168.1.190', status: 'Success', severity: 'High' },
    { id: 21, timestamp: '2024-01-15 12:50:32', user: 'hr@company.com', action: 'Employee Data Updated', resource: 'HR System', ip: '192.168.1.130', status: 'Success', severity: 'Info' },
    { id: 22, timestamp: '2024-01-15 12:45:27', user: 'unknown', action: 'Port Scanning Detected', resource: 'Network Infrastructure', ip: '203.0.113.195', status: 'Blocked', severity: 'Warning' },
    { id: 23, timestamp: '2024-01-15 12:40:14', user: 'legal@company.com', action: 'Compliance Report Generated', resource: 'Legal Database', ip: '192.168.1.200', status: 'Success', severity: 'Info' },
    { id: 24, timestamp: '2024-01-15 12:35:08', user: 'admin@company.com', action: 'System Maintenance Started', resource: 'Core System', ip: '192.168.1.100', status: 'Success', severity: 'Info' },
    { id: 25, timestamp: '2024-01-15 12:30:52', user: 'unknown', action: 'DDoS Attack Mitigated', resource: 'Web Services', ip: 'Multiple IPs', status: 'Mitigated', severity: 'Critical' }
  ];

  const filteredLogs = auditLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportLogs = () => {
    const ws = XLSX.utils.json_to_sheet(filteredLogs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Logs');
    XLSX.writeFile(wb, `audit_logs_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <Button onClick={handleExportLogs} className="flex items-center space-x-2">
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
