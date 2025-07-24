import { createTheme, PaletteOptions } from '@mui/material/styles';

const commonPalette = {
  primary: {
    main: '#0A66C2', // LinkedIn blue
    light: '#0d84ff',
    dark: '#004182',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#057642', // Professional green
    light: '#06a35c',
    dark: '#045530',
    contrastText: '#ffffff',
  },
};

const lightPalette: PaletteOptions = {
  mode: 'light',
  ...commonPalette,
  background: {
    default: '#f3f2ef',
    paper: '#ffffff',
  },
  text: {
    primary: '#191919',
    secondary: '#666666',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  ...commonPalette,
  background: {
    default: '#1a1a1a',
    paper: '#242424',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
};

const commonOptions = {
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    h6: {
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
            transition: 'all 0.2s ease-in-out',
            '&:hover fieldset': {
              borderColor: '#0A66C2',
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...commonOptions,
  palette: lightPalette,
});

export const darkTheme = createTheme({
  ...commonOptions,
  palette: darkPalette,
});
