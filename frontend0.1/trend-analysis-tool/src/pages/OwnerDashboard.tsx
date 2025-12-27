import Navbar from '../components/Navbar';
import { Container, Paper, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyData {
  month: string;
  bookings: number;
  revenue: number;
}

const trendData: MonthlyData[] = [
  { month: 'Jan', bookings: 40, revenue: 2400 },
  { month: 'Feb', bookings: 30, revenue: 1398 },
  { month: 'Mar', bookings: 55, revenue: 3800 },
  { month: 'Apr', bookings: 80, revenue: 5908 },
  { month: 'May', bookings: 65, revenue: 4800 },
  { month: 'Jun', bookings: 95, revenue: 6800 },
];

const OwnerDashboard = () => {
  return (
    <div>
      <Navbar title="Hotel Analytics" />
      
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>

        {/* LAYOUT EXPLAINED:
          display="flex" -> Puts items next to each other (row)
          flexDirection={{ xs: 'column', md: 'row' }} -> Stack them on phone (column), put side-by-side on laptop (row)
          gap={3} -> Adds space between them
        */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
          
          {/* LEFT SIDE: CHART (Takes up more space) */}
          {/* flex={2} means "take up 2 shares of the space" */}
          <Box flex={2}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Booking Trends (Last 6 Months)
              </Typography>
              
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Box>

          {/* RIGHT SIDE: KPI CARD (Takes up less space) */}
          {/* flex={1} means "take up 1 share of the space" */}
          <Box flex={1}>
            <Paper sx={{ p: 2, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#e3f2fd' }}>
              <Typography variant="h6" color="textSecondary">
                Total Revenue
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2 }}>
                $25,106
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                +12% from last month
              </Typography>
            </Paper>
          </Box>

        </Box>
      </Container>
    </div>
  );
};

export default OwnerDashboard;