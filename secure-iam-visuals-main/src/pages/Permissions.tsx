
import React, { useState, useEffect } from 'react';
import { Key, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PermissionModal from '@/components/modals/PermissionModal';
import { PersistentStorage } from '@/lib/storage';

const Permissions = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add' as 'add' | 'view' | 'edit',
    permission: null as any
  });

  const defaultPermissions = [
    { id: 1, name: 'user.create', description: 'Create new users', category: 'User Management', scope: 'Global' },
    { id: 2, name: 'user.read', description: 'View user details', category: 'User Management', scope: 'Global' },
    { id: 3, name: 'user.update', description: 'Update user information', category: 'User Management', scope: 'Global' },
    { id: 4, name: 'user.delete', description: 'Delete users', category: 'User Management', scope: 'Global' },
    { id: 5, name: 'role.create', description: 'Create new roles', category: 'Role Management', scope: 'Global' },
    { id: 6, name: 'role.read', description: 'View role details', category: 'Role Management', scope: 'Global' },
    { id: 7, name: 'audit.read', description: 'View audit logs', category: 'Audit', scope: 'Organization' },
    { id: 8, name: 'system.settings', description: 'Modify system settings', category: 'System', scope: 'Global' }
  ];

  const [permissions, setPermissions] = useState(PersistentStorage.load('permissions', defaultPermissions));

  useEffect(() => {
    PersistentStorage.save('permissions', permissions);
  }, [permissions]);

  const handleView = (permission: any) => {
    setModalState({ isOpen: true, mode: 'view', permission });
  };

  const handleEdit = (permission: any) => {
    setModalState({ isOpen: true, mode: 'edit', permission });
  };

  const handleDelete = (permissionId: number) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      setPermissions(permissions.filter(permission => permission.id !== permissionId));
    }
  };

  const handleAddPermission = () => {
    setModalState({ isOpen: true, mode: 'add', permission: null });
  };

  const handleSavePermission = (permissionData: any) => {
    if (modalState.mode === 'add') {
      const newPermission = {
        id: permissions.length + 1,
        ...permissionData
      };
      setPermissions([...permissions, newPermission]);
    } else if (modalState.mode === 'edit') {
      setPermissions(permissions.map(permission => 
        permission.id === modalState.permission.id ? { ...permission, ...permissionData } : permission
      ));
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add', permission: null });
  };

  const categories = [...new Set(permissions.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Permissions</h1>
        <Button onClick={handleAddPermission} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Permission</span>
        </Button>
      </div>

      {/* Permissions by Category */}
      {categories.map(category => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-blue-600" />
              <span>{category}</span>
              <Badge variant="outline">
                {permissions.filter(p => p.category === category).length} permissions
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Permission</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Description</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Scope</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.filter(p => p.category === category).map((permission) => (
                    <tr key={permission.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {permission.name}
                        </code>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{permission.description}</td>
                      <td className="py-4 px-6">
                        <Badge variant={permission.scope === 'Global' ? 'default' : 'secondary'}>
                          {permission.scope}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleView(permission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(permission)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(permission.id)}
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
      ))}

      <PermissionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        permission={modalState.permission}
        onSave={handleSavePermission}
      />
    </div>
  );
};

export default Permissions;
