import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { TecnicalForm } from './components/TecnicalForm';
import { lightTheme, darkTheme } from './theme';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          width: '300px', // Tamanho padrão para popups de extensão
          padding: '12px',
          position: 'relative',
          bgcolor: 'background.default',
          transition: 'all 0.3s ease-in-out',
          '& *': { // Garante que nenhum elemento filho ultrapasse a largura
            maxWidth: '100%',
            boxSizing: 'border-box'
          }
        }}
      >
        <IconButton
          onClick={() => setIsDarkMode(!isDarkMode)}
          sx={{
            position: 'absolute',
            right: 4,
            top: 4,
            padding: '4px',
            color: 'text.primary',
          }}
          size="small"
        >
          {isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
        </IconButton>
        <Box sx={{ mt: 3 }}>
          <TecnicalForm />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
