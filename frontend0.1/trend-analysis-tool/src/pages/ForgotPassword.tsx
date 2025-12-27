import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // Controls which view to show

  const handleSubmit = () => {
    if (email) {
      // In a real app, API call goes here: await api.sendResetLink(email);
      console.log("Reset link sent to:", email);
      setSubmitted(true); // Switch to success view
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
          
          {/* CONDITIONAL RENDERING: 
              If 'submitted' is TRUE, show the Success Message.
              If 'submitted' is FALSE, show the Form.
          */}
          
          {!submitted ? (
            // --- VIEW 1: THE FORM ---
            <>
              <Typography variant="h5" gutterBottom textAlign="center">
                Reset Password
              </Typography>
              <Typography variant="body2" color="textSecondary" textAlign="center" mb={3}>
                Enter your email to receive a reset link.
              </Typography>

              <TextField 
                label="Email Address" 
                variant="outlined" 
                fullWidth 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3 }}
                onClick={handleSubmit}
              >
                Send Reset Link
              </Button>
            </>
          ) : (
            // --- VIEW 2: SUCCESS MESSAGE ---
            <Box textAlign="center">
              <Alert severity="success" sx={{ mb: 2 }}>
                Reset link sent! Check your inbox.
              </Alert>
              <Typography variant="body2" color="textSecondary">
                We sent an email to <strong>{email}</strong>.
              </Typography>
            </Box>
          )}

          {/* BACK BUTTON (Always visible) */}
          <Button 
            color="inherit" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;