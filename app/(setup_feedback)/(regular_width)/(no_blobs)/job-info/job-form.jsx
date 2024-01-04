'use client';

import { Grid, TextField, Button, Box, Typography } from '@mui/material';
import MultipleSelectChip from './components/multiselect';
import { useContext, useState } from 'react';
import { JobContext } from '../../../../providers/JobProvider';
import { useRouter } from 'next/navigation';
import BoxWrapper from '../../../../shared/BoxWrapper';
import ArrowForward from '@mui/icons-material/ChevronRightRounded';

export default function JobForm() {
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [title, setTitle] = useState(jobInfo.title);
  const [company, setCompany] = useState(jobInfo.company);
  const [reqs, setReqs] = useState(jobInfo.reqs);
  const [type, setType] = useState(jobInfo.type);
  const router = useRouter();

  const removeWhitespace = (text) => {
    return text.trim().length === 0 ? '' : text;
  };

  const handleNext = (e) => {
    e.preventDefault();
    setJobInfo({
      title: removeWhitespace(title),
      type: type,
      company: removeWhitespace(company),
      reqs: removeWhitespace(reqs),
    });
    router.push('/question-entry');
  };

  return (
    <Box component='form' onSubmit={handleNext}>
      <Box sx={{display:'flex', backgroundColor:'white', padding:'4rem', borderRadius:'15px' ,alignItems:'center', flexDirection:'column'}}>
        <Typography sx={{textAlign:'center', fontSize:'4rem', fontWeight:'600'}}>
          Curate Personalization
        </Typography>
        <Box sx={{width:'32vw', borderRadius:'50px',margin:'auto 0px' ,height:'10px' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',}}></Box>
        <Typography sx={{marginTop:'2rem', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
        Fill The Details For A Refined <br/>Virtual Interview Style Assessment Experience.
        </Typography>
        <Grid container spacing={5} flexDirection='row'>
          <Grid item container flexDirection='column' xs={6}>
            <TextField
              required
              label='Career Profile'
              fullWidth
              margin='normal'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 0.5 }}
            />
            <MultipleSelectChip jobType={type} setJobType={setType} />
            <TextField
              fullWidth
              margin='normal'
              label='Company Details'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </Grid>
          <Grid item container xs={6} height='100%'>
            <TextField
              inputProps={{ className: 'greyScroll' }}
              fullWidth
              label='Profile Requirements'
              margin='normal'
              multiline
              minRows={8}
              maxRows={8}
              value={reqs}
              onChange={(e) => setReqs(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        display='flex'
        justifyContent='end'
        alignItems='center'
        marginTop='2rem'
      >
        <Button variant='outlined'
        type='submit' 
        endIcon={<ArrowForward />}
        sx={{
          padding: '0.8rem 1.5rem',
          borderRadius: '10px',
          color: 'white',
          background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
          boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
        }}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
