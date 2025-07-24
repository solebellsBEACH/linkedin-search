import React from 'react';
import { ThemeProvider, CssBaseline, Box, IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { TecnicalForm } from './components/TecnicalForm';
import { lightTheme, darkTheme } from './theme';
import { useTheme } from './shared/hooks/useTheme';
import './App.css';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          width: '300px',
          padding: '12px',
          position: 'relative',
          bgcolor: 'background.default',
          transition: 'all 0.3s ease-in-out',
          '& *': {
            maxWidth: '100%',
            boxSizing: 'border-box'
          }
        }}
      >
        <Tooltip title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              position: 'absolute',
              right: 4,
              top: 4,
              padding: '4px',
              color: 'text.primary',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                color: 'primary.main',
              },
            }}
            size="small"
          >
            {isDarkMode ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Box sx={{ mt: 3 }}>
          <TecnicalForm />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
