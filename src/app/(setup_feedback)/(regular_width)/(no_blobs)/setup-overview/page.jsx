import { Box, Grid, Stack, Typography } from '@mui/material';
import BoxWrapper from '../../../../../shared/BoxWrapper';
import TitleAndEdit from './TitleAndEdit';
import JobInfoPair from './JobInfoPair';
import InterviewQuestions from './InterviewQuestions';
import StartInterviewButton from './StartInterviewButton';

export default async function Page() {
  return (
    <>
      <Box
        sx={{display:'flex', backgroundColor:'white', padding:'4rem', borderRadius:'15px' ,alignItems:'center', flexDirection:'column'}}
      >
        <Typography sx={{textAlign:'center', fontSize:'4rem', fontWeight:'600'}}>
          Overview Of Details
        </Typography>
        <Box sx={{width:'32vw', borderRadius:'50px',margin:'auto 0px' ,height:'10px' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',}}></Box>
        <Typography sx={{marginTop:'2rem', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
        Verify the following Details. Edit Or Start The Interview Assessment
        </Typography>
        <Grid container width='100%'>
          <Grid
            item
            bgcolor='secondary.light'
            xs={5}
            borderRadius='.5rem'
            paddingY='1.5rem'
            paddingLeft='2rem'
            paddingRight='1rem'
          >
            <TitleAndEdit title='Job Information' editPath='/job-info' />
            <Box
              overflow='auto'
              maxHeight='15rem'
              paddingRight='1rem'
              className='feedbackScroll'
            >
              <Stack gap={2}>
                <JobInfoPair fieldName='Career Profile' jobField='title' />
                <JobInfoPair fieldName='Employment Title' jobField='type' />
                <JobInfoPair fieldName='Company Details' jobField='company' />
                <JobInfoPair fieldName='Profile Requirements' jobField='reqs' />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={7} paddingY='1.5rem' paddingLeft='3rem'>
            <TitleAndEdit
              title='Interview Questions'
              editPath='/question-entry'
            />
            <Box overflow='auto' maxHeight='15rem' paddingRight='2rem'>
              <InterviewQuestions />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        width='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        mt='2rem'
      >
        <StartInterviewButton />
      </Box>
    </>
  );
}
