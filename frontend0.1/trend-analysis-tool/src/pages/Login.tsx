import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // <--- IMPORT THIS

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); // New state for error messages

  const navigate = useNavigate(); // <--- Initialize the hook

  const handleLogin = () => {
    // 1. Basic Validation: Check if fields are empty
    if (email === "" || password === "") {
      setError("Please fill in all fields.");
      return;
    }

    // 2. Mock Logic (Simulating a Backend)
    // In a real app, you would send a request to a server here.
    
    if (email === "admin@test.com" && password === "admin123") {
      // SAVE TO LOCAL STORAGE
      localStorage.setItem("userRole", "admin"); // <--- ADD THIS
      navigate("/admin");
    } 
    else if (email === "owner@test.com" && password === "owner123") {
      // SAVE TO LOCAL STORAGE
      localStorage.setItem("userRole", "owner"); // <--- ADD THIS
      navigate("/owner");
    }
    else {
      // Login Failed
      setError("Invalid email or password");
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="#f5f5f5"
    >
      <Card sx={{ minWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center">
            Trend Analysis Tool
          </Typography>
          
          <Typography variant="body2" color="textSecondary" textAlign="center" mb={3}>
            Sign in to continue
          </Typography>

          {/* ERROR ALERT: Only shows if 'error' state has text */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField 
            label="Email Address" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // Clear error when user starts typing again
            }}
          />

          <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); // Clear error when user starts typing again
            }}
          />
          {/* Add this inside CardContent, before the Sign In Button */}
          
          <Box display="flex" justifyContent="flex-end">
            <Button 
              color="primary" 
              size="small" 
              sx={{ textTransform: 'none' }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Button>
          </Box>

          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;