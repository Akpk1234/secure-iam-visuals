
import React, { useState, useEffect } from 'react';
import { X, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'view' | 'edit';
  permission?: any;
  onSave?: (permissionData: any) => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onClose, mode, permission, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    scope: 'Global'
  });

  useEffect(() => {
    if (permission && mode !== 'add') {
      setFormData({
        name: permission.name || '',
        description: permission.description || '',
        category: permission.category || '',
        scope: permission.scope || 'Global'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        scope: 'Global'
      });
    }
  }, [permission, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-blue-600" />
            <span>
              {mode === 'add' ? 'Add Permission' : mode === 'edit' ? 'Edit Permission' : 'View Permission'}
            </span>
          </CardTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={mode === 'view'}
                placeholder="e.g., user.create"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="User Management">User Management</option>
                <option value="Role Management">Role Management</option>
                <option value="System">System</option>
                <option value="Audit">Audit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
              <select
                value={formData.scope}
                onChange={(e) => setFormData({...formData, scope: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Global">Global</option>
                <option value="Organization">Organization</option>
                <option value="Team">Team</option>
              </select>
            </div>
            {mode !== 'view' && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {mode === 'add' ? 'Add Permission' : 'Save Changes'}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionModal;
