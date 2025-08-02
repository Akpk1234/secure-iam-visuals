
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Define user credentials and roles
  const userCredentials = {
    'admin001': { password: 'Admin@123!', role: 'admin', name: 'Admin User' },
    'manager001': { password: 'Manager@123!', role: 'manager', name: 'Manager User' },
    'cyber001': { password: 'Cyber@123!', role: 'cyber', name: 'Cyber Security' },
    'infra001': { password: 'Infra@123!', role: 'infra', name: 'Infrastructure' },
    'user001': { password: 'User@123!', role: 'user', name: 'Regular User' },
    'user002': { password: 'User@456!', role: 'user', name: 'Regular User 2' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (isLogin) {
      // Debug logging
      console.log('Login attempt with:', { email, password });
      console.log('Available credentials:', Object.keys(userCredentials));
      
      // Check credentials for login
      const user = userCredentials[email as keyof typeof userCredentials];
      console.log('Found user:', user);
      
      if (!user || user.password !== password) {
        console.log('Authentication failed');
        alert('Invalid credentials. Please check username and password.');
        return;
      }
      
      console.log('Authentication successful for role:', user.role);
      
      // Store user session with role
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userRole', user.role);
    } else {
      // For signup, create new user session
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name || 'New User');
      localStorage.setItem('userRole', 'user');
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SecureIAM</h1>
          <p className="text-blue-100">Identity & Access Management System</p>
        </div>

        {/* Login/Signup Card */}
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Sign up for your account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-4"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {isLogin ? 'Username' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type={isLogin ? "text" : "email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isLogin ? "Enter username (e.g., admin001)" : "Enter your email"}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="pl-10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            {isLogin && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-800">
                  <div>
                    <p><strong>Admin:</strong> admin001</p>
                    <p className="text-blue-600">Admin@123!</p>
                  </div>
                  <div>
                    <p><strong>Manager:</strong> manager001</p>
                    <p className="text-blue-600">Manager@123!</p>
                  </div>
                  <div>
                    <p><strong>Cyber:</strong> cyber001</p>
                    <p className="text-blue-600">Cyber@123!</p>
                  </div>
                  <div>
                    <p><strong>Infra:</strong> infra001</p>
                    <p className="text-blue-600">Infra@123!</p>
                  </div>
                  <div>
                    <p><strong>User:</strong> user001</p>
                    <p className="text-blue-600">User@123!</p>
                  </div>
                  <div>
                    <p><strong>User2:</strong> user002</p>
                    <p className="text-blue-600">User@456!</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            {/* Security Features */}
            <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>2FA Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>SSL Encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
