'use client';

import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { JobContext } from '../../../../providers/JobProvider';

export default function JobInfoPair({ fieldName, jobField }) {
  const [jobInfo] = useContext(JobContext);

  return (
    <Box hidden={jobInfo[jobField] === null || jobInfo[jobField].length === 0}>
      <Typography variant='subtitle1'>{fieldName}</Typography>
      <Typography variant='body1' whiteSpace='pre-wrap'>
        {jobField == 'type' ? jobInfo[jobField].join(', ') : jobInfo[jobField]}
      </Typography>
    </Box>
  );
}
