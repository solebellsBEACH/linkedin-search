// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
palette: {
  mode: 'light',
  background: {
    default: '#f3f2ef',
    paper: '#ffffff',
  },
  primary: {
    light: '#4a8dcf',
    main: '#0a66c2',
    dark: '#004182',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#c9d6e2',
    main: '#56687a',
    dark: '#3b4754',
    contrastText: '#ffffff',
  },
  text: {
    primary: '#1d2226',
    secondary: '#5e5e5e',
  },
  divider: '#d1d1d1',
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
