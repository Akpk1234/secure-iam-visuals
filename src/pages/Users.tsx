
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const users = [
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15 09:30' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-15 08:45' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-10 16:20' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'User', status: 'Active', lastLogin: '2024-01-15 11:15' },
    { id: 5, name: 'David Brown', email: 'david@company.com', role: 'Manager', status: 'Pending', lastLogin: 'Never' }
  ];

  const handleView = (userId: number) => {
    console.log('View user:', userId);
  };

  const handleEdit = (userId: number) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: number) => {
    console.log('Delete user:', userId);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">User</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Role</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Last Login</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={
                        user.status === 'Active' ? 'default' :
                        user.status === 'Inactive' ? 'destructive' : 'secondary'
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(user.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
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

export default Users;
