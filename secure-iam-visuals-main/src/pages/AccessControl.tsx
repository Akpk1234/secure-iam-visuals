
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Plus, Lock, Unlock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';  
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import PolicyModal from '@/components/modals/PolicyModal';
import { PersistentStorage } from '@/lib/storage';

const AccessControl = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add' as 'add' | 'view' | 'edit',
    policy: null as any
  });

  const defaultPolicies = [
    {
      id: 1,
      name: 'Admin Full Access',
      description: 'Complete system access for administrators',
      resource: 'All Systems',
      action: 'All Actions',
      effect: 'Allow',
      status: 'Active',
      priority: 1
    },
    {
      id: 2,
      name: 'User Profile Access',
      description: 'Users can view and edit their own profiles',
      resource: 'User Profiles',
      action: 'Read, Update',
      effect: 'Allow',
      status: 'Active',
      priority: 2
    },
    {
      id: 3,
      name: 'Guest Read Only',
      description: 'Limited read access for guest users',
      resource: 'Public Resources',
      action: 'Read',
      effect: 'Allow',
      status: 'Active',
      priority: 3
    },
    {
      id: 4,
      name: 'Restricted Area Block',
      description: 'Block access to sensitive areas',
      resource: 'Admin Panel',
      action: 'All Actions',
      effect: 'Deny',
      status: 'Active',
      priority: 4
    },
    {
      id: 5,
      name: 'Audit Log Access',
      description: 'Access to audit logs for compliance team',
      resource: 'Audit Logs',
      action: 'Read',
      effect: 'Allow',
      status: 'Inactive',
      priority: 5
    }
  ];

  const [policies, setPolicies] = useState(PersistentStorage.load('policies', defaultPolicies));

  useEffect(() => {
    PersistentStorage.save('policies', policies);
  }, [policies]);

  const handleView = (policy: any) => {
    setModalState({ isOpen: true, mode: 'view', policy });
  };

  const handleEdit = (policy: any) => {
    setModalState({ isOpen: true, mode: 'edit', policy });
  };

  const handleDelete = (policyId: number) => {
    if (confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(policy => policy.id !== policyId));
    }
  };

  const handleCreatePolicy = () => {
    setModalState({ isOpen: true, mode: 'add', policy: null });
  };

  const handleSavePolicy = (policyData: any) => {
    if (modalState.mode === 'add') {
      const newPolicy = {
        id: policies.length + 1,
        ...policyData,
        status: 'Active'
      };
      setPolicies([...policies, newPolicy]);
    } else if (modalState.mode === 'edit') {
      setPolicies(policies.map(policy => 
        policy.id === modalState.policy.id ? { ...policy, ...policyData } : policy
      ));
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add', policy: null });
  };

  const handleToggleStatus = (policyId: number) => {
    setPolicies(policies.map(policy => 
      policy.id === policyId 
        ? { ...policy, status: policy.status === 'Active' ? 'Inactive' : 'Active' }
        : policy
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Access Control</h1>
        <Button onClick={handleCreatePolicy} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Policy</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Policies</p>
                <p className="text-2xl font-bold text-gray-900">{policies.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold text-green-600">
                  {policies.filter(p => p.status === 'Active').length}
                </p>
              </div>
              <Lock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Allow Policies</p>
                <p className="text-2xl font-bold text-blue-600">
                  {policies.filter(p => p.effect === 'Allow').length}
                </p>
              </div>
              <Unlock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deny Policies</p>
                <p className="text-2xl font-bold text-red-600">
                  {policies.filter(p => p.effect === 'Deny').length}
                </p>
              </div>
              <Lock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Control Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Access Control Policies</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Policy Name</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Resource</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Action</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Effect</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Priority</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => (
                  <tr key={policy.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{policy.name}</div>
                        <div className="text-sm text-gray-500">{policy.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{policy.resource}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{policy.action}</td>
                    <td className="py-4 px-6">
                      <Badge variant={policy.effect === 'Allow' ? 'default' : 'destructive'}>
                        {policy.effect}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={policy.status === 'Active'}
                          onCheckedChange={() => handleToggleStatus(policy.id)}
                        />
                        <span className="text-sm text-gray-600">{policy.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{policy.priority}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(policy)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(policy)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(policy.id)}
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

      <PolicyModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        policy={modalState.policy}
        onSave={handleSavePolicy}
      />
    </div>
  );
};

export default AccessControl;
