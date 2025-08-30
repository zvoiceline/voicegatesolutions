import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Settings as SettingsIcon,
  Sync as SyncIcon,
  History as HistoryIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { fishIntegrationService, FishConfig, FishSyncStats, FishSyncLog } from '../services/fishIntegrationService';
import { Timestamp } from 'firebase/firestore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fish-tabpanel-${index}`}
      aria-labelledby={`fish-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const FishIntegrationManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [config, setConfig] = useState<FishConfig | null>(null);
  const [stats, setStats] = useState<FishSyncStats | null>(null);
  const [logs, setLogs] = useState<FishSyncLog[]>([]);
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [configDialog, setConfigDialog] = useState(false);
  const [conflictDialog, setConflictDialog] = useState(false);
  const [selectedConflict, setSelectedConflict] = useState<any>(null);
  const [realTimeSyncActive, setRealTimeSyncActive] = useState(false);

  const [configForm, setConfigForm] = useState<Partial<FishConfig>>({
    apiKey: '',
    apiUrl: 'https://api.fish.com/v1',
    webhookSecret: '',
    syncInterval: 30,
    autoSync: false,
    conflictResolution: 'manual',
    enabledFeatures: {
      bidirectionalSync: true,
      realTimeUpdates: false,
      bulkOperations: true,
      customFieldMapping: true
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [configData, statsData, logsData, conflictsData] = await Promise.all([
        fishIntegrationService.getFishConfig(),
        fishIntegrationService.getFishSyncStats(),
        fishIntegrationService.getSyncLogs(50),
        fishIntegrationService.getConflicts()
      ]);

      setConfig(configData);
      setStats(statsData);
      setLogs(logsData);
      setConflicts(conflictsData);
      
      if (configData) {
        setConfigForm(configData);
      }
    } catch (err: any) {
      setError(`Failed to load Fish integration data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    try {
      await fishIntegrationService.updateFishConfig(configForm);
      setConfig({ ...config, ...configForm } as FishConfig);
      setConfigDialog(false);
      setSuccess('Fish configuration saved successfully');
      
      // Start/stop real-time sync based on config
      if (configForm.autoSync) {
        await fishIntegrationService.startRealTimeSync();
        setRealTimeSyncActive(true);
      } else {
        await fishIntegrationService.stopRealTimeSync();
        setRealTimeSyncActive(false);
      }
    } catch (err: any) {
      setError(`Failed to save configuration: ${err.message}`);
    }
  };

  const handleBulkSync = async (direction: 'to_fish' | 'from_fish' | 'bidirectional' = 'bidirectional') => {
    setSyncing(true);
    try {
      const result = await fishIntegrationService.bulkSyncWithFish({ direction });
      setSuccess(`Bulk sync completed: ${result.success} successful, ${result.errors} errors, ${result.conflicts} conflicts`);
      await loadData(); // Refresh data
    } catch (err: any) {
      setError(`Bulk sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleResolveConflict = async (resolution: 'use_local' | 'use_fish' | 'merge') => {
    if (!selectedConflict) return;
    
    try {
      await fishIntegrationService.resolveConflict(
        selectedConflict.contactId,
        selectedConflict.fishId,
        resolution
      );
      setSuccess(`Conflict resolved using ${resolution.replace('_', ' ')} strategy`);
      setConflictDialog(false);
      setSelectedConflict(null);
      await loadData();
    } catch (err: any) {
      setError(`Failed to resolve conflict: ${err.message}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircleIcon />;
      case 'error': return <ErrorIcon />;
      case 'warning': return <WarningIcon />;
      default: return null;
    }
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleString();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Overview" icon={<AnalyticsIcon />} />
          <Tab label="Configuration" icon={<SettingsIcon />} />
          <Tab label="Sync Logs" icon={<HistoryIcon />} />
          <Tab 
              label={conflicts.length > 0 ? `Conflicts (${conflicts.length})` : "Conflicts"} 
              icon={conflicts.length > 0 ? <Badge badgeContent={conflicts.length} color="error"><WarningIcon /></Badge> : <WarningIcon />} 
            />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={activeTab} index={0}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Contacts
                  </Typography>
                  <Typography variant="h4">
                    {stats?.totalContacts || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Synced Contacts
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {stats?.syncedContacts || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Pending Sync
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats?.pendingSync || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Sync Errors
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {stats?.errorContacts || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Sync Controls */}
            <Grid xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sync Controls
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<SyncIcon />}
                      onClick={() => handleBulkSync('bidirectional')}
                      disabled={syncing || !config?.apiKey}
                    >
                      {syncing ? 'Syncing...' : 'Full Sync'}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<SyncIcon />}
                      onClick={() => handleBulkSync('to_fish')}
                      disabled={syncing || !config?.apiKey}
                    >
                      Push to Fish
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<SyncIcon />}
                      onClick={() => handleBulkSync('from_fish')}
                      disabled={syncing || !config?.apiKey}
                    >
                      Pull from Fish
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={loadData}
                      disabled={loading}
                    >
                      Refresh
                    </Button>
                  </Box>

                  {syncing && <LinearProgress sx={{ mb: 2 }} />}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Real-time Sync:
                    </Typography>
                    <Chip 
                      icon={realTimeSyncActive ? <PlayIcon /> : <StopIcon />}
                      label={realTimeSyncActive ? 'Active' : 'Inactive'}
                      color={realTimeSyncActive ? 'success' : 'default'}
                      size="small"
                    />
                    {stats?.lastSyncTime && (
                      <Typography variant="body2" color="textSecondary">
                        Last sync: {formatTimestamp(stats.lastSyncTime)}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </TabPanel>

      {/* Configuration Tab */}
      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Fish Integration Configuration
              </Typography>
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => setConfigDialog(true)}
              >
                Configure
              </Button>
            </Box>

            {config ? (
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    API Configuration
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    API URL: {config.apiUrl}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    API Key: {config.apiKey ? '••••••••' : 'Not configured'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Webhook Secret: {config.webhookSecret ? '••••••••' : 'Not configured'}
                  </Typography>
                </Grid>
                
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Sync Settings
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Auto Sync: {config.autoSync ? 'Enabled' : 'Disabled'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Sync Interval: {config.syncInterval} minutes
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Conflict Resolution: {config.conflictResolution.replace('_', ' ')}
                  </Typography>
                </Grid>
                
                <Grid xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Enabled Features
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {Object.entries(config.enabledFeatures).map(([feature, enabled]) => (
                      <Chip
                        key={feature}
                        label={feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        color={enabled ? 'primary' : 'default'}
                        size="small"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Alert severity="info">
                Fish integration is not configured. Click "Configure" to set up the integration.
              </Alert>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Sync Logs Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sync Logs
            </Typography>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Operation</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Contact ID</TableCell>
                    <TableCell>Fish ID</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {log.timestamp ? formatTimestamp(log.timestamp) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Chip label={log.operation} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(log.status)}
                          label={log.status}
                          color={getStatusColor(log.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{log.contactId || '-'}</TableCell>
                      <TableCell>{log.fishId || '-'}</TableCell>
                      <TableCell>{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Conflicts Tab */}
      <TabPanel value={activeTab} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sync Conflicts
            </Typography>
            
            {conflicts.length === 0 ? (
              <Alert severity="success">
                No sync conflicts found. All contacts are in sync!
              </Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contact ID</TableCell>
                      <TableCell>Fish ID</TableCell>
                      <TableCell>Conflict Fields</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {conflicts.map((conflict, index) => (
                      <TableRow key={index}>
                        <TableCell>{conflict.contactId}</TableCell>
                        <TableCell>{conflict.fishId}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {conflict.conflictFields.map((field: string) => (
                              <Chip key={field} label={field} size="small" color="warning" />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            onClick={() => {
                              setSelectedConflict(conflict);
                              setConflictDialog(true);
                            }}
                          >
                            Resolve
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Configuration Dialog */}
      <Dialog open={configDialog} onClose={() => setConfigDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Fish Integration Configuration</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="API Key"
                type="password"
                value={configForm.apiKey}
                onChange={(e) => setConfigForm({ ...configForm, apiKey: e.target.value })}
                helperText="Your Fish API key"
              />
            </Grid>
            
            <Grid xs={12}>
              <TextField
                fullWidth
                label="API URL"
                value={configForm.apiUrl}
                onChange={(e) => setConfigForm({ ...configForm, apiUrl: e.target.value })}
                helperText="Fish API base URL"
              />
            </Grid>
            
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Webhook Secret"
                type="password"
                value={configForm.webhookSecret}
                onChange={(e) => setConfigForm({ ...configForm, webhookSecret: e.target.value })}
                helperText="Secret for webhook signature verification"
              />
            </Grid>
            
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Sync Interval (minutes)"
                type="number"
                value={configForm.syncInterval}
                onChange={(e) => setConfigForm({ ...configForm, syncInterval: parseInt(e.target.value) })}
                inputProps={{ min: 5, max: 1440 }}
              />
            </Grid>
            
            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Conflict Resolution</InputLabel>
                <Select
                  value={configForm.conflictResolution}
                  onChange={(e) => setConfigForm({ ...configForm, conflictResolution: e.target.value as any })}
                >
                  <MenuItem value="manual">Manual Resolution</MenuItem>
                  <MenuItem value="fish_wins">Fish Wins</MenuItem>
                  <MenuItem value="local_wins">Local Wins</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={configForm.autoSync}
                    onChange={(e) => setConfigForm({ ...configForm, autoSync: e.target.checked })}
                  />
                }
                label="Enable Auto Sync"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Enabled Features
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={configForm.enabledFeatures?.bidirectionalSync}
                    onChange={(e) => setConfigForm({
                      ...configForm,
                      enabledFeatures: {
                        ...configForm.enabledFeatures!,
                        bidirectionalSync: e.target.checked
                      }
                    })}
                  />
                }
                label="Bidirectional Sync"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={configForm.enabledFeatures?.realTimeUpdates}
                    onChange={(e) => setConfigForm({
                      ...configForm,
                      enabledFeatures: {
                        ...configForm.enabledFeatures!,
                        realTimeUpdates: e.target.checked
                      }
                    })}
                  />
                }
                label="Real-time Updates"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={configForm.enabledFeatures?.bulkOperations}
                    onChange={(e) => setConfigForm({
                      ...configForm,
                      enabledFeatures: {
                        ...configForm.enabledFeatures!,
                        bulkOperations: e.target.checked
                      }
                    })}
                  />
                }
                label="Bulk Operations"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={configForm.enabledFeatures?.customFieldMapping}
                    onChange={(e) => setConfigForm({
                      ...configForm,
                      enabledFeatures: {
                        ...configForm.enabledFeatures!,
                        customFieldMapping: e.target.checked
                      }
                    })}
                  />
                }
                label="Custom Field Mapping"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveConfig} variant="contained">
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>

      {/* Conflict Resolution Dialog */}
      <Dialog open={conflictDialog} onClose={() => setConflictDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Resolve Sync Conflict</DialogTitle>
        <DialogContent>
          {selectedConflict && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Contact: {selectedConflict.contactId}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Local Data
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2">Name: {selectedConflict.localData.name}</Typography>
                    <Typography variant="body2">Email: {selectedConflict.localData.email}</Typography>
                    <Typography variant="body2">Phone: {selectedConflict.localData.phone}</Typography>
                    <Typography variant="body2">Company: {selectedConflict.localData.company}</Typography>
                  </Paper>
                </Grid>
                
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Fish Data
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2">Name: {selectedConflict.fishData.name}</Typography>
                    <Typography variant="body2">Email: {selectedConflict.fishData.email}</Typography>
                    <Typography variant="body2">Phone: {selectedConflict.fishData.phone}</Typography>
                    <Typography variant="body2">Company: {selectedConflict.fishData.company}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Conflicting Fields:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedConflict.conflictFields.map((field: string) => (
                    <Chip key={field} label={field} color="warning" size="small" />
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConflictDialog(false)}>Cancel</Button>
          <Button onClick={() => handleResolveConflict('use_local')} color="primary">
            Use Local
          </Button>
          <Button onClick={() => handleResolveConflict('use_fish')} color="primary">
            Use Fish
          </Button>
          <Button onClick={() => handleResolveConflict('merge')} variant="contained">
            Smart Merge
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FishIntegrationManager;