import { ThemeProvider, CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import { TecnicalForm } from './components/TecnicalForm';
import theme from './theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            padding: '10px 30px',
            fontFamily: 'Arial, sans-serif',
            width: 350,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" className="title" sx={{ mb: 2 }}>
            🔎 LinkedIn Query Helper
          </Typography>
          <TecnicalForm />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
