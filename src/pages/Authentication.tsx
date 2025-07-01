
import React, { useState } from 'react';
import { Lock, Shield, Key, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const Authentication = () => {
  const [settings, setSettings] = useState({
    passwordPolicy: {
      minLength: true,
      specialChars: true,
      numbersRequired: true,
      passwordExpiry: false
    },
    mfa: {
      sms: true,
      email: true,
      authenticatorApp: true,
      hardwareKeys: false
    },
    sessionManagement: {
      sessionTimeout: true,
      concurrentSessions: true,
      rememberMe: false
    },
    securityAlerts: {
      failedLoginAlerts: true,
      suspiciousLocation: true,
      accountLockout: true
    }
  });

  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [setting]: !(prev as any)[category][setting]
      }
    }));
  };

  const handleResetToDefault = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings({
        passwordPolicy: {
          minLength: true,
          specialChars: true,
          numbersRequired: true,
          passwordExpiry: false
        },
        mfa: {
          sms: true,
          email: true,
          authenticatorApp: true,
          hardwareKeys: false
        },
        sessionManagement: {
          sessionTimeout: true,
          concurrentSessions: true,
          rememberMe: false
        },
        securityAlerts: {
          failedLoginAlerts: true,
          suspiciousLocation: true,
          accountLockout: true
        }
      });
      alert('Settings have been reset to default values');
    }
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('authSettings', JSON.stringify(settings));
    alert('Authentication settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Authentication Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <span>Password Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Minimum Length (8 characters)</p>
                <p className="text-sm text-gray-500">Require at least 8 characters</p>
              </div>
              <Switch 
                checked={settings.passwordPolicy.minLength}
                onCheckedChange={() => handleToggle('passwordPolicy', 'minLength')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Special Characters</p>
                <p className="text-sm text-gray-500">Require at least one special character</p>
              </div>
              <Switch 
                checked={settings.passwordPolicy.specialChars}
                onCheckedChange={() => handleToggle('passwordPolicy', 'specialChars')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Numbers Required</p>
                <p className="text-sm text-gray-500">Require at least one number</p>
              </div>
              <Switch 
                checked={settings.passwordPolicy.numbersRequired}
                onCheckedChange={() => handleToggle('passwordPolicy', 'numbersRequired')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password Expiry (90 days)</p>
                <p className="text-sm text-gray-500">Force password change every 90 days</p>
              </div>
              <Switch 
                checked={settings.passwordPolicy.passwordExpiry}
                onCheckedChange={() => handleToggle('passwordPolicy', 'passwordExpiry')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Multi-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Multi-Factor Authentication</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Authentication</p>
                <p className="text-sm text-gray-500">Send verification codes via SMS</p>
              </div>
              <Switch 
                checked={settings.mfa.sms}
                onCheckedChange={() => handleToggle('mfa', 'sms')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Authentication</p>
                <p className="text-sm text-gray-500">Send verification codes via email</p>
              </div>
              <Switch 
                checked={settings.mfa.email}
                onCheckedChange={() => handleToggle('mfa', 'email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Authenticator App</p>
                <p className="text-sm text-gray-500">Support TOTP authenticator apps</p>
              </div>
              <Switch 
                checked={settings.mfa.authenticatorApp}
                onCheckedChange={() => handleToggle('mfa', 'authenticatorApp')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Hardware Keys</p>
                <p className="text-sm text-gray-500">Support FIDO2/WebAuthn keys</p>
              </div>
              <Switch 
                checked={settings.mfa.hardwareKeys}
                onCheckedChange={() => handleToggle('mfa', 'hardwareKeys')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Session Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-purple-600" />
              <span>Session Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Session Timeout (30 minutes)</p>
                <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
              </div>
              <Switch 
                checked={settings.sessionManagement.sessionTimeout}
                onCheckedChange={() => handleToggle('sessionManagement', 'sessionTimeout')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Concurrent Sessions</p>
                <p className="text-sm text-gray-500">Allow multiple active sessions</p>
              </div>
              <Switch 
                checked={settings.sessionManagement.concurrentSessions}
                onCheckedChange={() => handleToggle('sessionManagement', 'concurrentSessions')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Remember Me</p>
                <p className="text-sm text-gray-500">Allow persistent login sessions</p>
              </div>
              <Switch 
                checked={settings.sessionManagement.rememberMe}
                onCheckedChange={() => handleToggle('sessionManagement', 'rememberMe')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Security Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Failed Login Alerts</p>
                <p className="text-sm text-gray-500">Alert after 3 failed attempts</p>
              </div>
              <Switch 
                checked={settings.securityAlerts.failedLoginAlerts}
                onCheckedChange={() => handleToggle('securityAlerts', 'failedLoginAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Suspicious Location</p>
                <p className="text-sm text-gray-500">Alert for logins from new locations</p>
              </div>
              <Switch 
                checked={settings.securityAlerts.suspiciousLocation}
                onCheckedChange={() => handleToggle('securityAlerts', 'suspiciousLocation')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Lockout</p>
                <p className="text-sm text-gray-500">Lock account after 5 failed attempts</p>
              </div>
              <Switch 
                checked={settings.securityAlerts.accountLockout}
                onCheckedChange={() => handleToggle('securityAlerts', 'accountLockout')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleResetToDefault}>
          Reset to Default
        </Button>
        <Button onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Authentication;
