import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A66C2', // LinkedIn blue
      light: '#0d84ff',
      dark: '#004182',
    },
    secondary: {
      main: '#057642', // Professional green
      light: '#06a35c',
      dark: '#045530',
    },
    background: {
      default: '#f3f2ef',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#0A66C2',
            },
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0A66C2',
      light: '#0d84ff',
      dark: '#004182',
    },
    secondary: {
      main: '#06a35c',
      light: '#08cc74',
      dark: '#045530',
    },
    background: {
      default: '#1a1a1a',
      paper: '#242424',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#0A66C2',
            },
          },
        },
      },
    },
  },
});
