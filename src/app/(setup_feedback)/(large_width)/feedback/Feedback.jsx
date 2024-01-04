'use client';

import { Grid, Typography, Box, Stack, Button } from '@mui/material';
import BoxWrapper from '../../../shared/BoxWrapper';

import { useContext, useState } from 'react';
import { QuestionContext } from '../../../providers/QuestionProvider';
import { FeedbackContext } from '../../../providers/FeedbackProvider';
import QuestionBox from './QuestionBox';
import FeedbackTabs from './FeedbackTabs';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/navigation';

export default function Feedback() {
  const [feedback] = useContext(FeedbackContext);
  const [questions] = useContext(QuestionContext);
  const [currentQuestion, setCurrentQuestion] = useState(-1); // -1 for overall feedback
  const router = useRouter();



  return (
    <Grid container columns={9}>
      <Grid
        item
        xs={2}
        p='2rem'
        pb='0rem'
        sx={{ display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor:'white', borderRadius:'15px'}}
      >
        <QuestionBox
          question='Feedback'
          index={-1}
          active={currentQuestion}
          setActive={setCurrentQuestion}
          
        />
        <Box
          height={5}
          mb={3}
          mt={3}
          bgcolor='white'
          borderRadius={1}
        />
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: '60vh',
            width: 'calc(100% + 1rem + 5px)',
          }}
        >
          <Stack spacing={2} sx={{ width: 'calc(100% - 1rem)' }}>
            {questions.map((question, index) => {
              return (
                <QuestionBox
                  key={index}
                  index={index}
                  question={question.question}
                  active={currentQuestion}
                  setActive={setCurrentQuestion}
                />
              );
            })}
          </Stack>
        </Box>
      </Grid>

      <Grid
        item
        pl='2rem'
        xs={7}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{ flexGrow: 1, backgroundColor:'white', padding:'4rem', borderRadius:'20px'}}
        >
          <Typography sx={{textAlign:'center', fontSize:'4rem', fontWeight:'600'}}>
            Overall Feedback
          </Typography>
          <Box sx={{width:'full', borderRadius:'50px',margin:'auto 0px' ,height:'10px' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8', marginBottom:'2rem'}}></Box>
          <Grid container sx={{ height: '100%' }}>
            {currentQuestion != -1 && (
              <Grid item paddingRight='1.5rem' xs={6} sx={{ height: '45vh' }}>
                <Box
                  height='100%'
                  sx={{ overflow: 'auto', paddingRight: '1rem' }}
                  className='greyScroll'
                >
                  <Typography variant='h5'>
                    {questions[currentQuestion].question}
                  </Typography>
                  <Box
                    height={4}
                    mb={3}
                    mt={1.2}
                    width='3.5rem'
                    bgcolor='primary.main'
                    borderRadius={1}
                  />
                  <Typography>{questions[currentQuestion].answer}</Typography>
                </Box>
              </Grid>
            )}

            {currentQuestion == -1 && (
              <Grid
                item
                overflow="auto"
                xs={12}
                border={'solid'}
                borderRadius='1rem'
                paddingY='2rem'
                paddingRight='2rem'
                paddingLeft='2.5rem'
                height='45vh'
                sx={{
                  overflowY: 'auto', // Add this line to make it scrollable
                  '&::-webkit-scrollbar': {
                  width: '0', // Hide scrollbar
      },
    }}
              >
                {/* <Typography variant='h3'>Overall Feedback</Typography>
                <Box sx={{width:'24rem', borderRadius:'50px',margin:'0.5rem 0px' ,height:'10px' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8', marginBottom:'2rem'}}></Box> */}
                <Box
                  overflowY='scroll'
                  maxHeight='19rem'
                  paddingRight='.5rem'
                  className='feedbackScroll'
                >
                  
                  <Typography sx={{ marginBottom: '1rem' }}>{feedback.overall}</Typography> 
                </Box>
              </Grid>
            )}
            {currentQuestion != -1 && (
              <Grid
                item
                xs={6}
                bgcolor='secondary.light'
                borderRadius='.5rem'
                sx={{
                  height: '45vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <FeedbackTabs questionFeedback={feedback[currentQuestion]} />
              </Grid>
            )}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '2rem' }}>
          <Button
            sx={{
              padding: '1.1rem 1.5rem',
              borderRadius: '10px',
              color: 'white',
              background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
              boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
            }}
            startIcon={<NavigateNextIcon />}
            onClick={() => router.push('/analytics')}
          >
            Analytics
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
