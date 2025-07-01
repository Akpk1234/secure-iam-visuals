
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Roles = () => {
  const roles = [
    { 
      id: 1, 
      name: 'Super Admin', 
      description: 'Full system access and control',
      permissions: ['User Management', 'Role Management', 'System Settings', 'Audit Logs'],
      userCount: 2,
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Manager', 
      description: 'Team management and reporting access',
      permissions: ['User View', 'Reports', 'Team Management'],
      userCount: 15,
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'User', 
      description: 'Basic user access',
      permissions: ['Profile Management', 'Basic Access'],
      userCount: 234,
      status: 'Active'
    },
    { 
      id: 4, 
      name: 'Auditor', 
      description: 'Audit and compliance access',
      permissions: ['Audit Logs', 'Reports', 'Compliance View'],
      userCount: 8,
      status: 'Active'
    },
    { 
      id: 5, 
      name: 'Guest', 
      description: 'Limited read-only access',
      permissions: ['Read Access'],
      userCount: 45,
      status: 'Inactive'
    }
  ];

  const handleView = (roleId: number) => {
    console.log('View role:', roleId);
  };

  const handleEdit = (roleId: number) => {
    console.log('Edit role:', roleId);
  };

  const handleDelete = (roleId: number) => {
    console.log('Delete role:', roleId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Role</span>
        </Button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>{role.name}</span>
                </CardTitle>
                <Badge variant={role.status === 'Active' ? 'default' : 'secondary'}>
                  {role.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Users Assigned:</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{role.userCount}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500 block mb-2">Permissions:</span>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {role.permissions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(role.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(role.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(role.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Role Name</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Description</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Users</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-900">{role.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{role.description}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{role.userCount}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={role.status === 'Active' ? 'default' : 'secondary'}>
                        {role.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(role.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(role.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(role.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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

export default Roles;
