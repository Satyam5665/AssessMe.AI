'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import { useRouter } from 'next/navigation';

export default function StartInterviewButton() {
  const router = useRouter();
  return (
    <Button
    sx={{
      padding: '0.7rem 1.5rem',
      borderRadius: '10px',
      color: 'white',
      background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
      boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
    }}
      onClick={() => router.push('/interview')}
      endIcon={
        <Box display='flex' alignItems='center' ml={0.5} >
          <PlayCircleFilledWhiteRoundedIcon />
        </Box>
      }
    >
      Start Interview
    </Button>
  );
}
