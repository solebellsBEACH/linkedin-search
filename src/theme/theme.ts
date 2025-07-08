// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#81b7d4',
      paper: '#f7f9fa',
    },
    primary: {
      main: '#0072b1',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h6: {
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
});

export default theme;
