import SideNav from "./SideNavbar";
import { Box, Typography } from "@mui/material";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <Box className="dashboard-container">
      <SideNav />
      <Box component="main" className="dashboard-content">
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography>This is a placeholder page.</Typography>
      </Box>
    </Box>
  );
}