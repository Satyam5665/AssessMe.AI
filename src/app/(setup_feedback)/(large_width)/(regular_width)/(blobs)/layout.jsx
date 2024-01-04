import { Box } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <Box sx={{padding:'2rem', margin:'2rem 0rem' ,backgroundColor:'white', borderRadius:'15px'}}>
      {children}
    </Box>
  );
}
