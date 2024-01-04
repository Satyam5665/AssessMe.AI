"use client"
import React from 'react'
import BoxWrapper from '../../shared/BoxWrapper'
import { Box, Button, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/navigation';
import ReplayIcon from '@mui/icons-material/Replay';
 
const Recommendation = () => {
  const router = useRouter();
  const webDevelopmentContext = [
    'Frontend frameworks and libraries',
    'Responsive design and cross-browser',
    'Frontend Animations',
    'Continuous integration and deployment',
  ];
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  let val="Nextjs"
  return (
    <Box>
    <BoxWrapper title="Recommendation">
        <Box>
        <Typography sx={{marginTop:'1rem', marginBottom:'1rem' ,fontWeight:'600', fontSize:'1.4rem', textAlign:'center'}}>
        According to the Assessment <br/>You should go for 
        </Typography>
        </Box> 
        <Box>

    
      <Typography sx={{marginTop:'1rem', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
       { webDevelopmentContext[randomNumber]}
        </Typography>

        <Typography sx={{marginTop:'1rem', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
        Basics Of javascript framework
        </Typography>


      <Typography sx={{marginTop:'1rem', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
        Css Preprocessors
        </Typography>


      <Typography sx={{marginTop:'1rem', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
        Animations
        </Typography>

        </Box>
        
    </BoxWrapper>
    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '2rem', gap: '1rem' }}>
    <Button
            sx={{
              padding: '1.1rem 1.5rem',
              borderRadius: '10px',
              color: 'white',
              background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
              boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
            }}
            startIcon={<ReplayIcon />}
            onClick={() => router.push('/job-info')}
          >
            Retake
          </Button>
          <Button
            sx={{
              padding: '1.1rem 1.5rem',
              borderRadius: '10px',
              color: 'white',
              background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
              boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
            }}
            startIcon={<NavigateNextIcon />}
            // onClick={() => router.push('/recommendation')}
            href='http://localhost:3000/'
          >
            Back to Course
          </Button>
          </Box>
    
          </Box>
          
  )
}

export default Recommendation;
