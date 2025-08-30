import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  Support as SupportIcon,
  Message as MessageIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  RequestQuote as RequestQuoteIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../services/authService';

interface ServiceRequest {
  id: string;
  type: 'interpretation' | 'translation' | 'consultation';
  language: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  assignedInterpreter?: string;
  createdAt: any;
}

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: any;
  read: boolean;
}

const ClientPortal: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState<Partial<User>>({});
  const [newRequest, setNewRequest] = useState({
    type: 'interpretation' as const,
    language: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData(user);
      loadServiceRequests();
      loadMessages();
    }
  }, [user]);

  const loadServiceRequests = async () => {
    setServiceRequests([
      {
        id: '1',
        type: 'interpretation',
        language: 'Spanish',
        date: '2024-01-15',
        time: '10:00 AM',
        duration: '2 hours',
        location: 'Medical Center',
        description: 'Medical appointment interpretation needed',
        status: 'confirmed',
        assignedInterpreter: 'Maria Rodriguez',
        createdAt: new Date()
      }
    ]);
  };

  const loadMessages = async () => {
    setMessages([
      {
        id: '1',
        from: 'Admin',
        to: user?.id || '',
        subject: 'Welcome to VoiceGate Solutions',
        content: 'Welcome to our client portal. We are here to help with all your interpretation needs.',
        timestamp: new Date(),
        read: false
      }
    ]);
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(profileData);
      setEditProfile(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleRequestSubmit = async () => {
    try {
      const request: ServiceRequest = {
        ...newRequest,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date()
      };
      setServiceRequests(prev => [request, ...prev]);
      setNewRequest({
        type: 'interpretation',
        language: '',
        date: '',
        time: '',
        duration: '',
        location: '',
        description: ''
      });
      setShowRequestDialog(false);
    } catch (error) {
      console.error('Failed to submit request:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'success';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <PendingIcon />;
      case 'confirmed': return <CheckCircleIcon />;
      case 'completed': return <CheckCircleIcon />;
      case 'cancelled': return <WarningIcon />;
      default: return <PendingIcon />;
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">Please log in to access the client portal.</Alert>
      </Container>
    );
  }

  if (user.status === 'pending') {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <PendingIcon sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Application Under Review
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for registering with VoiceGate Solutions. 
              Your application is currently being reviewed by our team.
            </Typography>
            <Chip 
              label={`Status: ${user.status?.toUpperCase()}`}
              color="warning"
              size="medium"
            />
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Client Portal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user.name}!
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Dashboard" icon={<PersonIcon />} />
          <Tab label="Service Requests" icon={<RequestQuoteIcon />} />
          <Tab label="Messages" icon={<MessageIcon />} />
          <Tab label="Profile" icon={<PersonIcon />} />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Active Requests</Typography>
                <Typography variant="h3" color="primary">
                  {serviceRequests.filter(r => r.status === 'confirmed').length}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Completed Services</Typography>
                <Typography variant="h3" color="success.main">
                  {serviceRequests.filter(r => r.status === 'completed').length}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Pending Requests</Typography>
                <Typography variant="h3" color="warning.main">
                  {serviceRequests.filter(r => r.status === 'pending').length}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recent Service Requests</Typography>
                <Button
                  variant="contained"
                  onClick={() => setShowRequestDialog(true)}
                >
                  New Request
                </Button>
              </Box>
              <List>
                {serviceRequests.slice(0, 3).map((request) => (
                  <ListItem key={request.id}>
                    <ListItemIcon>{getStatusIcon(request.status)}</ListItemIcon>
                    <ListItemText
                      primary={`${request.type} - ${request.language}`}
                      secondary={`${request.date} • ${request.location}`}
                    />
                    <Chip
                      label={request.status}
                      color={getStatusColor(request.status) as any}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Service Requests</Typography>
            <Button
              variant="contained"
              onClick={() => setShowRequestDialog(true)}
            >
              New Request
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {serviceRequests.map((request) => (
              <Card key={request.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {request.type} - {request.language}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Date: {request.date} at {request.time}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Location: {request.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Duration: {request.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {request.description}
                      </Typography>
                      {request.assignedInterpreter && (
                        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                          Assigned Interpreter: {request.assignedInterpreter}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      label={request.status}
                      color={getStatusColor(request.status) as any}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Messages</Typography>
            <Button
              variant="contained"
              onClick={() => setShowMessageDialog(true)}
            >
              New Message
            </Button>
          </Box>
          
          <List>
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {message.from.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={message.subject}
                    secondary={`From: ${message.from}`}
                  />
                  {!message.read && (
                    <Chip label="New" color="primary" size="small" />
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Profile Information</Typography>
              <Button variant="outlined" onClick={() => setEditProfile(true)}>
                Edit Profile
              </Button>
            </Box>
            
            <List>
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Name" secondary={user.name} />
              </ListItem>
              <ListItem>
                <ListItemIcon><EmailIcon /></ListItemIcon>
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText primary="Phone" secondary={user.profile?.phone || 'Not provided'} />
              </ListItem>
              <ListItem>
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary="Company" secondary={user.profile?.address || 'Not provided'} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {/* New Service Request Dialog */}
      <Dialog open={showRequestDialog} onClose={() => setShowRequestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Service Request</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Service Type</InputLabel>
              <Select
                value={newRequest.type}
                label="Service Type"
                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value as any })}
              >
                <MenuItem value="interpretation">Interpretation</MenuItem>
                <MenuItem value="translation">Translation</MenuItem>
                <MenuItem value="consultation">Consultation</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Language"
              value={newRequest.language}
              onChange={(e) => setNewRequest({ ...newRequest, language: e.target.value })}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newRequest.date}
                onChange={(e) => setNewRequest({ ...newRequest, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={newRequest.time}
                onChange={(e) => setNewRequest({ ...newRequest, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              fullWidth
              label="Duration"
              value={newRequest.duration}
              onChange={(e) => setNewRequest({ ...newRequest, duration: e.target.value })}
              placeholder="e.g., 2 hours"
            />
            <TextField
              fullWidth
              label="Location"
              value={newRequest.location}
              onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={newRequest.description}
              onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
              placeholder="Please provide details about your service needs..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRequestDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleRequestSubmit}>Submit Request</Button>
        </DialogActions>
      </Dialog>

      {/* New Message Dialog */}
      <Dialog open={showMessageDialog} onClose={() => setShowMessageDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Subject"
              placeholder="Message subject"
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={6}
              placeholder="Type your message here..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMessageDialog(false)}>Cancel</Button>
          <Button variant="contained">Send Message</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfile} onClose={() => setEditProfile(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              value={profileData.name || ''}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Phone"
              value={profileData.profile?.phone || ''}
              onChange={(e) => setProfileData({ 
                ...profileData, 
                profile: { ...profileData.profile, phone: e.target.value }
              })}
            />
            <TextField
              fullWidth
              label="Company/Organization"
              value={profileData.profile?.address || ''}
              onChange={(e) => setProfileData({ 
                ...profileData, 
                profile: { ...profileData.profile, address: e.target.value }
              })}
            />
            <TextField
              fullWidth
              label="Preferred Languages"
              value={profileData.profile?.languages?.join(', ') || ''}
              onChange={(e) => setProfileData({ 
                ...profileData, 
                profile: { 
                  ...profileData.profile, 
                  languages: e.target.value.split(',').map(lang => lang.trim())
                }
              })}
              placeholder="English, Spanish, French"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProfile(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleProfileUpdate}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientPortal;