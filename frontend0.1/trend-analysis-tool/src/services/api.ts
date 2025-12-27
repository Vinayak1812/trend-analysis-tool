// --- DEFINING TYPES (So we can use them everywhere) ---
export interface Hotel {
  id: number;
  name: string;
  location: string;
  ownerName: string;
  status: 'Active' | 'Pending';
}

export interface MonthlyData {
  month: string;
  bookings: number;
  revenue: number;
}

// --- MOCK DATABASE ---
const MOCK_HOTELS: Hotel[] = [
  { id: 1, name: "Sunset Resort", location: "Goa", ownerName: "Rajesh Kumar", status: "Active" },
  { id: 2, name: "City Center Inn", location: "Mumbai", ownerName: "Anita Desai", status: "Active" },
  { id: 3, name: "Mountain View", location: "Manali", ownerName: "Vikram Singh", status: "Pending" },
];

const MOCK_TRENDS: MonthlyData[] = [
  { month: 'Jan', bookings: 40, revenue: 2400 },
  { month: 'Feb', bookings: 30, revenue: 1398 },
  { month: 'Mar', bookings: 55, revenue: 3800 },
  { month: 'Apr', bookings: 80, revenue: 5908 },
];

// --- SIMULATED API CALLS ---

// Function to get Hotels (takes 1 second to return)
export const fetchHotels = (): Promise<Hotel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_HOTELS);
    }, 1000); // 1000ms = 1 second delay
  });
};

// Function to get Trends (takes 1.5 seconds to return)
export const fetchTrends = (): Promise<MonthlyData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TRENDS);
    }, 1500);
  });
};