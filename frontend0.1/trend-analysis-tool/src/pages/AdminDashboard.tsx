import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
    Container, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, Button, Box,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress
} from '@mui/material';
import { useEffect } from 'react'; // Add useEffect
import { fetchHotels, type Hotel } from '../services/api'; // Import our new service

// Note: You can remove the old 'interface Hotel' definition from this file since we import it now.

// --- 2. INITIAL DATA ---
const initialHotels: Hotel[] = [
    { id: 1, name: "Sunset Resort", location: "Goa", ownerName: "Rajesh Kumar", status: "Active" },
    { id: 2, name: "City Center Inn", location: "Mumbai", ownerName: "Anita Desai", status: "Active" },
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    // State 1: Holds the data
    const [hotels, setHotels] = useState<Hotel[]>([]);

    // State 2: Are we loading? (Start as true)
    const [loading, setLoading] = useState<boolean>(true);

    const [open, setOpen] = useState(false);
    const [newHotelName, setNewHotelName] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newOwner, setNewOwner] = useState("");
    // ... (keep your other form states: newLocation, newOwner)

    // --- THE USE EFFECT HOOK ---
    // This runs ONCE when the component first appears on screen.
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchHotels(); // Wait 1 second for data
                setHotels(data); // Put data in state
            } catch (error) {
                console.error("Failed to fetch hotels", error);
            } finally {
                setLoading(false); // Stop loading (whether success or fail)
            }
        };

        loadData();
    }, []); // [] means "Only run once on mount"

    // ... (keep your handleAddHotel function)

    // --- FUNCTION: HANDLE ADDING A HOTEL ---
    const handleAddHotel = () => {
        // 1. Create the new object
        const newHotel: Hotel = {
            id: hotels.length + 1, // Simple ID generation
            name: newHotelName,
            location: newLocation,
            ownerName: newOwner,
            status: 'Pending' // Default status
        };

        // 2. Update the list (IMMUTABILITY PATTERN)
        // We cannot do hotels.push(). We must create a NEW array.
        // [...oldArray, newItem] copies the old stuff and adds the new item at the end.
        setHotels([...hotels, newHotel]);

        // 3. Close the popup and clear inputs
        setOpen(false);
        setNewHotelName("");
        setNewLocation("");
        setNewOwner("");
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Navbar title="Admin Portal" />
            {/* ... The rest of your existing Dashboard code ... */}

            <Container sx={{ mt: 4 }}>
                {/* Header Section with Title and Button */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4">Registered Hotels</Typography>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        + Add Hotel
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Hotel Name</strong></TableCell>
                                <TableCell><strong>Location</strong></TableCell>
                                <TableCell><strong>Owner</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hotels.map((hotel) => (
                                <TableRow
                                    key={hotel.id}
                                    hover // Adds a grey highlight when hovering
                                    onClick={() => navigate(`/hotel/${hotel.id}`)} // Navigate to /hotel/1, /hotel/2, etc.
                                    sx={{ cursor: 'pointer' }} // Changes mouse cursor to a hand pointer
                                >
                                    <TableCell>{hotel.id}</TableCell>
                                    <TableCell>{hotel.name}</TableCell>
                                    <TableCell>{hotel.location}</TableCell>
                                    <TableCell>{hotel.ownerName}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={hotel.status}
                                            color={hotel.status === 'Active' ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* --- THE POPUP DIALOG --- */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add New Hotel</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" color="textSecondary" mb={2}>
                            Enter the details of the new hotel partnership.
                        </Typography>

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Hotel Name"
                            fullWidth
                            variant="outlined"
                            value={newHotelName}
                            onChange={(e) => setNewHotelName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Location"
                            fullWidth
                            variant="outlined"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Owner Name"
                            fullWidth
                            variant="outlined"
                            value={newOwner}
                            onChange={(e) => setNewOwner(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
                        <Button onClick={handleAddHotel} variant="contained">Save</Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </div>
    );
};

export default AdminDashboard;