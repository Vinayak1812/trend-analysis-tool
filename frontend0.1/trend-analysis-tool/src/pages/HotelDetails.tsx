import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const HotelDetails = () => {
  const navigate = useNavigate();
  
  // 1. GET THE ID FROM THE URL
  // If the URL is "/hotel/5", then id will be "5".
  const { id } = useParams();

  return (
    <div>
      <Navbar title="Hotel Details" />
      <Container sx={{ mt: 4 }}>
        
        <Button onClick={() => navigate("/admin")} sx={{ mb: 2 }}>
          &larr; Back to Dashboard
        </Button>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Details for Hotel ID: {id}
          </Typography>
          
          <Typography variant="body1" color="textSecondary">
             In a real app, we would use this ID ({id}) to fetch the specific hotel's data from the database.
             For now, we just proved we can catch the correct ID!
          </Typography>

          <Box mt={4} p={2} bgcolor="#e3f2fd" borderRadius={2}>
            <Typography variant="h6">Performance Snapshot</Typography>
            <Typography>Status: <strong>Active</strong></Typography>
            <Typography>Revenue: <strong>$12,500</strong></Typography>
          </Box>
        </Paper>

      </Container>
    </div>
  );
};

export default HotelDetails;