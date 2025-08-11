import React from 'react';
import { Shield, AlertTriangle, Eye, Lock, TrendingUp, Bug } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CyberDashboard = () => {
  const securityStats = [
    { title: 'Security Threats', value: '3', change: '-2', icon: AlertTriangle, color: 'text-red-600' },
    { title: 'Active Monitors', value: '24', change: '+1', icon: Eye, color: 'text-blue-600' },
    { title: 'Blocked Attempts', value: '127', change: '+15', icon: Shield, color: 'text-green-600' },
    { title: 'Vulnerabilities', value: '2', change: '-1', icon: Bug, color: 'text-orange-600' }
  ];

  const securityEvents = [
    { event: 'Suspicious login attempt blocked', severity: 'high', time: '5 min ago', ip: '192.168.1.100' },
    { event: 'Password brute force detected', severity: 'high', time: '15 min ago', ip: '10.0.0.45' },
    { event: 'Unusual data access pattern', severity: 'medium', time: '1 hour ago', ip: '172.16.0.23' },
    { event: 'Failed 2FA verification', severity: 'medium', time: '2 hours ago', ip: '192.168.1.77' }
  ];

  const vulnerabilityReports = [
    { title: 'Outdated SSL certificate on server-03', severity: 'high', status: 'open', age: '2 days' },
    { title: 'Weak password policy detected', severity: 'medium', status: 'investigating', age: '5 days' },
    { title: 'Unpatched software on workstation-12', severity: 'low', status: 'resolved', age: '1 week' }
  ];

  const threatIntelligence = [
    { threat: 'New phishing campaign targeting financial sector', level: 'critical', source: 'ThreatFeed' },
    { threat: 'Ransomware variant detected in wild', level: 'high', source: 'SecurityLabs' },
    { threat: 'Zero-day exploit for popular CMS', level: 'medium', source: 'VulnDB' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cybersecurity Dashboard</h1>
          <p className="text-gray-600">Security monitoring and threat analysis</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Security Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {securityStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm flex items-center mt-1 ${
                      stat.change.startsWith('-') ? 'text-green-600' : 'text-red-600'
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
        {/* Security Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Security Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    event.severity === 'high' ? 'bg-red-500' :
                    event.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 break-words">{event.event}</p>
                    <p className="text-xs text-gray-600">IP: {event.ip}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        event.severity === 'high' ? 'bg-red-100 text-red-800' :
                        event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vulnerability Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bug className="h-5 w-5" />
              <span>Vulnerability Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vulnerabilityReports.map((vuln, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    vuln.severity === 'high' ? 'bg-red-500' :
                    vuln.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 break-words">{vuln.title}</p>
                    <div className="flex items-center justify-between mt-2 gap-2 flex-wrap">
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          vuln.severity === 'high' ? 'bg-red-100 text-red-800' :
                          vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {vuln.severity.toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          vuln.status === 'open' ? 'bg-red-100 text-red-800' :
                          vuln.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {vuln.status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{vuln.age}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Threat Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {threatIntelligence.map((threat, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  threat.level === 'critical' ? 'bg-red-500' :
                  threat.level === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 break-words">{threat.threat}</p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      threat.level === 'critical' ? 'bg-red-100 text-red-800' :
                      threat.level === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {threat.level.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">{threat.source}</span>
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

export default CyberDashboard;