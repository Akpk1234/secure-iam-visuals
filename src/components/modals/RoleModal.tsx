
import React, { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'view' | 'edit';
  role?: any;
  onSave?: (roleData: any) => void;
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, mode, role, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  });

  useEffect(() => {
    if (role && mode !== 'add') {
      setFormData({
        name: role.name || '',
        description: role.description || '',
        status: role.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'Active'
      });
    }
  }, [role, mode]);

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
            <Shield className="h-5 w-5 text-blue-600" />
            <span>
              {mode === 'add' ? 'Create Role' : mode === 'edit' ? 'Edit Role' : 'View Role'}
            </span>
          </CardTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={mode === 'view'}
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
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {mode !== 'view' && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {mode === 'add' ? 'Create Role' : 'Save Changes'}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleModal;
