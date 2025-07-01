
import React, { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const [settings, setSettings] = useState({
    orgName: 'SecureIAM Corporation',
    domain: 'secureiam.com',
    timezone: 'UTC-5 (Eastern Time)',
    forceHttps: true,
    rateLimiting: true,
    ipWhitelist: false,
    smtpHost: '',
    smtpPort: '587',
    fromEmail: 'noreply@secureiam.com',
    automaticBackups: true,
    maintenanceMode: false,
    retentionDays: '90'
  });

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <Button onClick={handleSaveChanges} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5 text-blue-600" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input 
                id="orgName" 
                value={settings.orgName}
                onChange={(e) => handleInputChange('orgName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Primary Domain</Label>
              <Input 
                id="domain" 
                value={settings.domain}
                onChange={(e) => handleInputChange('domain', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC+0 (Greenwich Mean Time)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Force HTTPS</p>
                <p className="text-sm text-gray-500">Redirect all HTTP requests to HTTPS</p>
              </div>
              <Switch 
                checked={settings.forceHttps}
                onCheckedChange={(checked) => handleSwitchChange('forceHttps', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Rate Limiting</p>
                <p className="text-sm text-gray-500">Prevent brute force attacks</p>
              </div>
              <Switch 
                checked={settings.rateLimiting}
                onCheckedChange={(checked) => handleSwitchChange('rateLimiting', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP Whitelist</p>
                <p className="text-sm text-gray-500">Restrict access to specific IP ranges</p>
              </div>
              <Switch 
                checked={settings.ipWhitelist}
                onCheckedChange={(checked) => handleSwitchChange('ipWhitelist', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input 
                id="smtpHost" 
                value={settings.smtpHost}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                placeholder="smtp.gmail.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input 
                id="smtpPort" 
                value={settings.smtpPort}
                onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                placeholder="587" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input 
                id="fromEmail" 
                value={settings.fromEmail}
                onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                placeholder="noreply@secureiam.com" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Backup & Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle>Backup & Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatic Backups</p>
                <p className="text-sm text-gray-500">Daily system backups</p>
              </div>
              <Switch 
                checked={settings.automaticBackups}
                onCheckedChange={(checked) => handleSwitchChange('automaticBackups', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-gray-500">Enable during system updates</p>
              </div>
              <Switch 
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSwitchChange('maintenanceMode', checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retentionDays">Log Retention (Days)</Label>
              <Input 
                id="retentionDays" 
                value={settings.retentionDays}
                onChange={(e) => handleInputChange('retentionDays', e.target.value)}
                type="number" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
