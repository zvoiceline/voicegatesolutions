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
  LinearProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Schedule as ScheduleIcon,
  Support as SupportIcon,
  Message as MessageIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../services/authService';

interface Assignment {
  id: string;
  type: 'interpretation' | 'translation' | 'consultation';
  client: string;
  language: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  rate: number;
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

const InterpreterPortal: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setProfileData(user);
      loadAssignments();
      loadMessages();
    }
  }, [user]);

  const loadAssignments = async () => {
    setAssignments([
      {
        id: '1',
        type: 'interpretation',
        client: 'Tech Corp',
        language: 'Spanish',
        date: '2024-01-15',
        time: '10:00 AM',
        duration: '2 hours',
        location: 'Medical Center',
        description: 'Medical appointment interpretation',
        status: 'confirmed',
        rate: 75,
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
        content: 'Welcome to our interpreter portal. We are excited to work with you.',
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'confirmed': return 'success';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <PendingIcon />;
      case 'approved': return <CheckCircleIcon />;
      case 'confirmed': return <CheckCircleIcon />;
      case 'completed': return <CheckCircleIcon />;
      case 'cancelled': return <WarningIcon />;
      default: return <PendingIcon />;
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">Please log in to access the interpreter portal.</Alert>
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
              Thank you for applying to join VoiceGate Solutions as an interpreter. 
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
          Interpreter Portal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user.name}!
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Dashboard" icon={<PersonIcon />} />
          <Tab label="Assignments" icon={<AssignmentIcon />} />
          <Tab label="Messages" icon={<MessageIcon />} />
          <Tab label="Profile" icon={<PersonIcon />} />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Active Assignments</Typography>
                <Typography variant="h3" color="primary">
                  {assignments.filter(a => a.status === 'confirmed').length}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Completed This Month</Typography>
                <Typography variant="h3" color="success.main">
                  {assignments.filter(a => a.status === 'completed').length}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Assignments</Typography>
              <List>
                {assignments.slice(0, 3).map((assignment) => (
                  <ListItem key={assignment.id}>
                    <ListItemIcon>{getStatusIcon(assignment.status)}</ListItemIcon>
                    <ListItemText
                      primary={`${assignment.type} - ${assignment.language}`}
                      secondary={`${assignment.client} • ${assignment.date}`}
                    />
                    <Chip
                      label={assignment.status}
                      color={getStatusColor(assignment.status) as any}
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
          <Typography variant="h6" sx={{ mb: 3 }}>Assignments</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {assignment.type} - {assignment.language}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Client: {assignment.client}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {assignment.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={assignment.status}
                      color={getStatusColor(assignment.status) as any}
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
          <Typography variant="h6" sx={{ mb: 3 }}>Messages</Typography>
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
                <ListItemIcon><LanguageIcon /></ListItemIcon>
                <ListItemText 
                  primary="Languages" 
                  secondary={user.profile?.languages?.join(', ') || 'Not specified'} 
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

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
              label="Languages (comma-separated)"
              value={profileData.profile?.languages?.join(', ') || ''}
              onChange={(e) => setProfileData({ 
                ...profileData, 
                profile: { 
                  ...profileData.profile, 
                  languages: e.target.value.split(',').map(lang => lang.trim())
                }
              })}
            />
            <TextField
              fullWidth
              label="Experience"
              value={profileData.profile?.experience || ''}
              onChange={(e) => setProfileData({ 
                ...profileData, 
                profile: { ...profileData.profile, experience: e.target.value }
              })}
            />
            <TextField
              fullWidth
              label="Hourly Rate"
              type="number"
              value={profileData.profile?.hourlyRate?.toString() || ''}
              onChange={(e) => setProfileData({ 
                ...profileData, 
                profile: { ...profileData.profile, hourlyRate: parseFloat(e.target.value) || 0 }
              })}
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

export default InterpreterPortal;