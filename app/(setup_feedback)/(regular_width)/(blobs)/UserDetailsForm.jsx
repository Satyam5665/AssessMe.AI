'use client';

import { TextField, Box, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { UserDetailsContext } from '../../../providers/UserDetailsProvider';
import { useRouter } from 'next/navigation';
import ArrowForward from '@mui/icons-material/ChevronRightRounded';

export default function UserDetailsForm() {
  const [userDetails, setUserDetails] = useContext(UserDetailsContext);
  const [name, setName] = useState(userDetails.name);
  const router = useRouter();

  const handleClick = () => {
    setUserDetails({ name: name });
    router.push('/job-info');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '1.5rem',
        gap: 3,
        justifyContent: 'center',
      }}
    >
      <TextField
        label='Name'
        margin='normal'
        sx={{ margin: '0', width: '18.75rem', 
        boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
      }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        disabled={name == ''}
        sx={{
          padding: '1.1rem 1.5rem',
          borderRadius: '10px',
          color: 'white',
          background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
          boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
        }}
        endIcon={<ArrowForward />}
        onClick={handleClick}
      >
        Start Personalization
      </Button>
    </Box>
  );
}
