import { Typography, Box, Grid, Divider } from '@mui/material';
import Image from 'next/image';
import UserDetailsForm from './UserDetailsForm';
import { AccountCircle, ContactPhone, Note, People, Text, TextFieldsTwoTone, TextSnippet } from '@mui/icons-material';

function FeatureBox({ title, text}) {
  return (
    <Grid item xs={4}>
      <Box
        sx={{
          background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
          boxShadow: '0px 4px 16.8px 0px #C8D5B9',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <AccountCircle sx={{fontSize:'4rem', color:'white'}}/>
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: 'primary.dark',
            fontWeight: 700,
            marginTop: '0.5rem',
            color:'white'
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: 'white' }}>{text}</Typography>
      </Box>
    </Grid>
  );
}

function FeatureBox2({ title, text}) {
  return (
    <Grid item xs={4}>
      <Box
        sx={{
          background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
          boxShadow: '0px 4px 16.8px 0px #C8D5B9',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <ContactPhone sx={{fontSize:'4rem', color:'white'}}/>
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: 'primary.dark',
            fontWeight: 700,
            marginTop: '0.5rem',
            color:'white'
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: 'white' }}>{text}</Typography>
      </Box>
    </Grid>
  );
}

function FeatureBox3({ title, text}) {
  return (
    <Grid item xs={4}>
      <Box
        sx={{
          background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
          boxShadow: '0px 4px 16.8px 0px #C8D5B9',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <TextSnippet sx={{fontSize:'4rem', color:'white'}}/>
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: 'primary.dark',
            fontWeight: 700,
            marginTop: '0.5rem',
            color:'white'
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: 'white' }}>{text}</Typography>
      </Box>
    </Grid>
  );
}

export default async function Home() {
  return (
    <Box sx={{display:'flex', width:'70rem', alignItems:'center', flexDirection:'column'}}>
      <Typography sx={{textAlign:'center', fontSize:'4rem', fontWeight:'600'}}>
      AI Assessment
      </Typography>
      <Box sx={{width:'32vw', borderRadius:'50px',margin:'auto 0px' ,height:'10px' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',}}></Box>
      <Typography sx={{marginTop:'2rem', fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
      An AI based Interview Assessment which will
        <br/> Generate the Feedback and provide Recommendation <br/>
        provide context for next course to be curated
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: '1rem', marginBottom:'1rem'}}>
          <FeatureBox
            title='Personalize'
            text='Provide job details and add your own questions to tailor the interview to your needs.'
          ></FeatureBox>
          <FeatureBox2  
            title='Assessment'
            text='Sit in an Assessment with our AI interviewer and answer questions, which are tailored for you'
          ></FeatureBox2>
          <FeatureBox3
            title='Feedback'
            text='Read about your strengths and improvements for each of your interview answers to improve'
          ></FeatureBox3>
      </Grid>
      <UserDetailsForm/>
    </Box>
  );
}
