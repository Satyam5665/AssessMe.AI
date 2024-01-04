import { Container } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '80rem',
      }}
    >
      {children}
    </Container>
  );
}
