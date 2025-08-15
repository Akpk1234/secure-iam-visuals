import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SecurityIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'view' | 'edit';
  incident: any;
  onSave: (data: any) => void;
}

const SecurityIncidentModal: React.FC<SecurityIncidentModalProps> = ({
  isOpen,
  onClose,
  mode,
  incident,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    status: 'Open',
    category: 'Authentication',
    assignedTo: '',
    sourceIP: '',
    affectedSystems: ''
  });

  useEffect(() => {
    if (incident && (mode === 'edit' || mode === 'view')) {
      setFormData({
        title: incident.title || '',
        description: incident.description || '',
        severity: incident.severity || 'Medium',
        status: incident.status || 'Open',
        category: incident.category || 'Authentication',
        assignedTo: incident.assignedTo || '',
        sourceIP: incident.sourceIP || '',
        affectedSystems: Array.isArray(incident.affectedSystems) 
          ? incident.affectedSystems.join(', ') 
          : incident.affectedSystems || ''
      });
    } else if (mode === 'add') {
      setFormData({
        title: '',
        description: '',
        severity: 'Medium',
        status: 'Open',
        category: 'Authentication',
        assignedTo: '',
        sourceIP: '',
        affectedSystems: ''
      });
    }
  }, [incident, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      affectedSystems: formData.affectedSystems.split(',').map(s => s.trim()).filter(s => s),
      reportedBy: 'Current User',
      reportedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      lastUpdate: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    onSave(submitData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Report New Incident' : 
             mode === 'edit' ? 'Edit Incident' : 'View Incident'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Incident Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                disabled={mode === 'view'}
                required
              />
            </div>
            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select 
                value={formData.severity} 
                onValueChange={(value) => handleChange('severity', value)}
                disabled={mode === 'view'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={mode === 'view'}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange('category', value)}
                disabled={mode === 'view'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Authentication">Authentication</SelectItem>
                  <SelectItem value="Malware">Malware</SelectItem>
                  <SelectItem value="Data Breach">Data Breach</SelectItem>
                  <SelectItem value="Social Engineering">Social Engineering</SelectItem>
                  <SelectItem value="Access Control">Access Control</SelectItem>
                  <SelectItem value="Network Attack">Network Attack</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleChange('status', value)}
                disabled={mode === 'view'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                  <SelectItem value="Mitigated">Mitigated</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => handleChange('assignedTo', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="sourceIP">Source IP</Label>
              <Input
                id="sourceIP"
                value={formData.sourceIP}
                onChange={(e) => handleChange('sourceIP', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="affectedSystems">Affected Systems (comma-separated)</Label>
            <Input
              id="affectedSystems"
              value={formData.affectedSystems}
              onChange={(e) => handleChange('affectedSystems', e.target.value)}
              disabled={mode === 'view'}
              placeholder="Web Portal, Database Server, etc."
            />
          </div>

          {mode !== 'view' && (
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === 'add' ? 'Report Incident' : 'Update Incident'}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityIncidentModal;