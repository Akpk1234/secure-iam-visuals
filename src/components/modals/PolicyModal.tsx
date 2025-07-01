
import React, { useState, useEffect } from 'react';
import { X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'view' | 'edit';
  policy?: any;
  onSave?: (policyData: any) => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, mode, policy, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    resource: '',
    action: '',
    effect: 'Allow',
    priority: 1
  });

  useEffect(() => {
    if (policy && mode !== 'add') {
      setFormData({
        name: policy.name || '',
        description: policy.description || '',
        resource: policy.resource || '',
        action: policy.action || '',
        effect: policy.effect || 'Allow',
        priority: policy.priority || 1
      });
    } else {
      setFormData({
        name: '',
        description: '',
        resource: '',
        action: '',
        effect: 'Allow',
        priority: 1
      });
    }
  }, [policy, mode]);

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
            <Lock className="h-5 w-5 text-blue-600" />
            <span>
              {mode === 'add' ? 'Create Policy' : mode === 'edit' ? 'Edit Policy' : 'View Policy'}
            </span>
          </CardTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
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
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource</label>
              <Input
                value={formData.resource}
                onChange={(e) => setFormData({...formData, resource: e.target.value})}
                disabled={mode === 'view'}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
              <Input
                value={formData.action}
                onChange={(e) => setFormData({...formData, action: e.target.value})}
                disabled={mode === 'view'}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Effect</label>
              <select
                value={formData.effect}
                onChange={(e) => setFormData({...formData, effect: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Allow">Allow</option>
                <option value="Deny">Deny</option>
              </select>
            </div>
            {mode !== 'view' && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {mode === 'add' ? 'Create Policy' : 'Save Changes'}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyModal;
