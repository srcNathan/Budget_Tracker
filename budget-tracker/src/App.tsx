import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import BackgroundCanvas from "./components/BackgroundCanvas";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BackgroundCanvas />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}
