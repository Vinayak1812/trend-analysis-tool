import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// --- TYPESCRIPT INTERFACE ---
// This defines what data this component EXPECTS to receive.
// We are saying: "To use this Navbar, you MUST give me a 'title' which is text."
interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // CLEAR STORAGE
    localStorage.removeItem("userRole"); // <--- ADD THIS
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      {/* AppBar is the blue container */}
      <AppBar position="static">
        <Toolbar>
          {/* The Title passed from the parent page */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;