import { Box, Container } from '@mui/material';

export default function RecommendationLayout({ children }) {
  return (
    <Box
      sx={{
        background:'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
      }}
      minHeight='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '60rem',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}