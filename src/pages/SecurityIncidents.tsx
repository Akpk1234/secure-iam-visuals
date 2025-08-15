import React, { useState, useEffect } from 'react';
import { AlertTriangle, Eye, Edit, Trash2, Plus, Search, Filter, Clock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PersistentStorage } from '@/lib/storage';

const SecurityIncidents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  
  const defaultIncidents = [
    {
      id: 1,
      title: 'Unauthorized Access Attempt',
      description: 'Multiple failed login attempts detected from suspicious IP address',
      severity: 'High',
      status: 'Under Investigation',
      reportedBy: 'Security System',
      reportedAt: '2024-01-15 08:30',
      assignedTo: 'Emily Chen',
      category: 'Authentication',
      affectedSystems: ['Web Portal', 'User Database'],
      sourceIP: '192.168.1.100',
      lastUpdate: '2024-01-15 10:15'
    },
    {
      id: 2,
      title: 'Malware Detection',
      description: 'Trojan horse detected on workstation in Finance department',
      severity: 'Critical',
      status: 'Resolved',
      reportedBy: 'John Doe',
      reportedAt: '2024-01-14 14:20',
      assignedTo: 'James Wilson',
      category: 'Malware',
      affectedSystems: ['Finance Workstation 01'],
      sourceIP: '10.0.2.45',
      lastUpdate: '2024-01-15 09:00'
    },
    {
      id: 3,
      title: 'Data Exfiltration Alert',
      description: 'Unusual data transfer patterns detected from internal network',
      severity: 'Critical',
      status: 'Under Investigation',
      reportedBy: 'Network Monitor',
      reportedAt: '2024-01-15 11:45',
      assignedTo: 'Rachel Kim',
      category: 'Data Breach',
      affectedSystems: ['File Server', 'Network Gateway'],
      sourceIP: '10.0.1.200',
      lastUpdate: '2024-01-15 12:30'
    },
    {
      id: 4,
      title: 'Phishing Email Campaign',
      description: 'Targeted phishing emails sent to executive team members',
      severity: 'Medium',
      status: 'Mitigated',
      reportedBy: 'Lisa Anderson',
      reportedAt: '2024-01-13 16:10',
      assignedTo: 'Daniel Rodriguez',
      category: 'Social Engineering',
      affectedSystems: ['Email Server'],
      sourceIP: 'External',
      lastUpdate: '2024-01-14 10:00'
    },
    {
      id: 5,
      title: 'Privilege Escalation Attempt',
      description: 'User attempted to access admin-level resources without proper authorization',
      severity: 'High',
      status: 'Open',
      reportedBy: 'Access Control System',
      reportedAt: '2024-01-15 13:20',
      assignedTo: 'Thomas Lee',
      category: 'Access Control',
      affectedSystems: ['Admin Panel', 'User Management'],
      sourceIP: '10.0.3.15',
      lastUpdate: '2024-01-15 13:25'
    },
    {
      id: 6,
      title: 'DDoS Attack',
      description: 'Distributed denial of service attack targeting web services',
      severity: 'High',
      status: 'Mitigated',
      reportedBy: 'Network Security',
      reportedAt: '2024-01-12 09:15',
      assignedTo: 'Alex Kumar',
      category: 'Network Attack',
      affectedSystems: ['Web Server', 'Load Balancer'],
      sourceIP: 'Multiple',
      lastUpdate: '2024-01-12 15:30'
    }
  ];

  const [incidents, setIncidents] = useState(PersistentStorage.load('incidents', defaultIncidents));

  useEffect(() => {
    PersistentStorage.save('incidents', incidents);
  }, [incidents]);

  const handleDelete = (incidentId: number) => {
    if (confirm('Are you sure you want to delete this incident?')) {
      setIncidents(incidents.filter(incident => incident.id !== incidentId));
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Resolved': return 'default';
      case 'Mitigated': return 'secondary';
      case 'Under Investigation': return 'outline';
      case 'Open': return 'destructive';
      default: return 'outline';
    }
  };

  const stats = {
    total: incidents.length,
    open: incidents.filter(i => i.status === 'Open').length,
    investigating: incidents.filter(i => i.status === 'Under Investigation').length,
    critical: incidents.filter(i => i.severity === 'Critical').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Security Incidents</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Report Incident</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Incidents</p>
                <p className="text-2xl font-bold text-red-600">{stats.open}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Investigation</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.investigating}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Incidents</p>
                <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                  <SelectItem value="Mitigated">Mitigated</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Security Incidents ({filteredIncidents.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Incident</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Severity</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Assigned To</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Reported</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{incident.title}</div>
                        <div className="text-sm text-gray-500">{incident.description}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">{incident.category}</Badge>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getSeverityVariant(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getStatusVariant(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{incident.assignedTo}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        <div>{incident.reportedAt}</div>
                        <div className="text-xs text-gray-400">by {incident.reportedBy}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(incident.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default SecurityIncidents;