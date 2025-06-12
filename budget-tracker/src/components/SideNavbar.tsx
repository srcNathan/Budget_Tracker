// src/components/SideNav.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import "../styles/sideNavbar.css";

export default function SideNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const drawer = (
    <Box className ="drawer-content" onClick={handleDrawerToggle}>
      <Typography variant="h6">
        MENU
      </Typography>
      <List>
        <ListItem onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Take Me Home!" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className="side-nav-container">
      <CssBaseline />
      <AppBar component="nav" position="fixed" className="appbar">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className="toolbar-title">            
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor="left"
          open={menuOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: "drawer-paper" }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
