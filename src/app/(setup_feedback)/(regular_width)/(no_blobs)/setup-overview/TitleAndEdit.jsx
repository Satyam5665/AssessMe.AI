'use client';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function TitleAndEdit({ title, editPath }) {
  const router = useRouter();

  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        display='flex'
        alignItems='center'
        justifyContent='between'
      >
        <Typography variant='h3'>{title}</Typography>
        <IconButton
          aria-label='edit'
          onClick={() => router.push(editPath)}
          sx={{
            bgcolor: 'primary.main',
            width: '1.9rem',
            height: '1.9rem',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <ModeEditSharpIcon htmlColor='white' fontSize='small' />
        </IconButton>
      </Stack>
      <Box
        height={4}
        mb={3}
        mt={1.2}
        width='3.5rem'
        bgcolor='primary.main'
        borderRadius={1}
      />
    </>
  );
}
