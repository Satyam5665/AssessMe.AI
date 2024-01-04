'use client';

import { useEffect, useContext, useState, useRef } from 'react';
import {
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  Modal,
  List,
  ListItem,
  ListItemText,
  Fade,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForward from '@mui/icons-material/ChevronRightRounded';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import CallEndRoundedIcon from '@mui/icons-material/CallEndRounded';
import PersonIcon from '@mui/icons-material/Person';
import { JobContext } from '../../providers/JobProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { UserDetailsContext } from '../../providers/UserDetailsProvider';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import WebCamera from './webcam';
import { Player } from '@lottiefiles/react-lottie-player';
import TextTransition from 'react-text-transition';
import { useRouter } from 'next/navigation';
import { useCompletion } from 'ai/react';
import Image from 'next/image';

export default function Interview() {
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [questions, setQuestions] = useContext(QuestionContext);
  const [userDetails, setUserDetails] = useContext(UserDetailsContext);

  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [redo, setRedo] = useState(false);
  const [interviewerTalking, setInterviewerTalking] = useState(false);
  const [questionDisplay, setQuestionDisplay] = useState('');
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const router = useRouter();
  const interviewerPlayer = useRef(null);
  const speech = useRef(null);
  const ready = useRef(false);

  const { complete } = useCompletion({
    api: '/util/chatGPT',
    onFinish: (prompt, completion) => {
      textToSpeech(completion);
    },
  });

  const parseAudio = async (blob) => {
    const res = await fetch('/util/speechToText', {
      method: 'POST',
      body: blob,
    });

    const result = await res.json();

    const newQuestions = questions.slice();

    newQuestions[questionsAnswered]['answer'] = result.answer;

    setQuestions(newQuestions);
    setQuestionsAnswered(questionsAnswered + 1);

    console.log(result.answer);
  };

  const askQuestion = async () => {
    let requestBody = {};

    if (questionsAnswered == 0) {
      requestBody = {
        queryType: 'firstMessage',
        jobTitle: jobInfo.title,
        jobCompany: jobInfo.company,
        name: userDetails.name,
        question: questions[0].question,
      };
    } else if (questionsAnswered < questions.length) {
      requestBody = {
        queryType: 'subsequentMessage',
        jobTitle: jobInfo.title,
        jobCompany: jobInfo.company,
        name: userDetails.name,
        question: questions[questionsAnswered].question,
        prevQuestion: questions[questionsAnswered - 1].question,
        prevAnswer: questions[questionsAnswered - 1].answer,
      };
    } else {
      requestBody = {
        queryType: 'lastMessage',
        jobTitle: jobInfo.title,
        jobCompany: jobInfo.company,
        name: userDetails.name,
        prevQuestion: questions[questionsAnswered - 1].question,
        prevAnswer: questions[questionsAnswered - 1].answer,
      };
    }

    complete(requestBody);
  };

  const textToSpeech = async (input) => {
    const res = await fetch('util/textToSpeech', {
      method: 'POST',
      body: JSON.stringify({
        text: input,
      }),
    });

    const result = await res.arrayBuffer();

    const blob = new Blob([result], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);

    audio.addEventListener('ended', function () {
      setInterviewerTalking(false);
      interviewerPlayer.current.setSeeker(239, false);
      if (questionsAnswered < questions.length) {
        startRecording();
        setQuestionDisplay(questions[questionsAnswered].question);
      } else {
        setInterviewComplete(true);
      }
    });

    if (ready.current) {
      audio.play();
      interviewerPlayer.current.play();
      setInterviewerTalking(true);
    } else {
      speech.current = audio;
    }
  };

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder({
    noiseSuppression: true,
    echoCancellation: true,
  });

  const redoQuestion = () => {
    setRedo(true);
    stopRecording();
  };

  useEffect(() => {
    setQuestionDisplay(
      'Welcome to your Consultation, ' + userDetails.name.replace(/ .*/, '')
    );
  }, []);

  useEffect(() => {
    if (!recordingBlob) {
      return;
    }

    if (redo) {
      setRedo(false);
      startRecording();
      return;
    }

    parseAudio(recordingBlob);
  }, [recordingBlob]);

  useEffect(() => {
    askQuestion();
  }, [questionsAnswered]);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const closeModal = () => {
    setModalOpen(false);
    ready.current = true;

    if (speech.current != null) {
      delay(1000).then(() => {
        speech.current.play();
        interviewerPlayer.current.play();
        setInterviewerTalking(true);
      });
    }
  };

  return (
    <>
      <Modal open={modalOpen} closeAfterTransition>
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              width: '40rem',
              padding: '3rem',
              borderRadius: '1rem',
              outline: 0,
              boxShadow: '0px 4px 6.599999904632568px 0px #00000040',
            }}
          >
            <Typography variant='h3' sx={{ marginBottom: '0.5rem' }}>
              Welcome to your virtual Assessment
            </Typography>
            <Box sx={{width:'30vw', borderRadius:'50px',margin:'0.5rem 0rem 1rem' ,height:'10px' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',}}></Box>
            <Typography>
            Once the interview starts, the interviewer will begin by welcoming
              you and asking you the first question. Here are some tips for the
              best interview experience:
            </Typography>
            <List sx={{ listStyle: 'decimal', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText primary='Ensure you are in an environment with minimal background noise' />
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText primary='Talk clearly at a regular pace in the direction of your microphone' />
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText primary='Answer the questions appropriately and stay on topic' />
              </ListItem>
            </List>
            <Typography>
              Best of luck! We'll see you afterwards with your feedback.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                marginTop: '2rem',
              }}
            >
              <Button
                sx={{
                  padding: '1rem 1.5rem',
                  borderRadius: '10px',
                  color: 'white',
                  background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
                  boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
                }}
                endIcon={<ArrowForward />}
                onClick={closeModal}
              >
                Let's Go!
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box
          sx={{
            maxWidth: '80%',
            maxHeight: '120px',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <Box sx={{width:'20vw', borderRadius:'50px',margin:'0.5rem 0rem 1rem' ,height:'0.5rem' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',}}></Box>

          <Typography variant='h5' style={{fontWeight:'bold'}}>
            <TextTransition className='transition'>
              {questionDisplay}
            </TextTransition>
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: 'auto',
            background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '3rem',
            width: '10.45rem',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 700,
            }}
          >
            {questions.length - questionsAnswered}{' '}
            {questions.length - questionsAnswered == 1
              ? 'question'
              : 'questions'}{' '}
            left
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={4} sx={{ position: 'relative' }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              bgcolor: '#E1E1E1',
              borderRadius: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Player
              loop
              src='/Speech.json'
              style={{ width: '18rem' }}
              ref={interviewerPlayer}
              speed={1.25}
            ></Player>
          </Box>
          <Chip
            icon={
              <PersonIcon sx={{ '&.MuiChip-icon': { color: '#FFFFFF8A' } }} />
            }
            label='Virtual Interviewer'
            sx={{
              position: 'absolute',
              zIndex: 5,
              bottom: '1rem',
              left: '2.5rem',
              backgroundColor: '#00000052',
              color: '#FFFFFFA1',
              fontWeight: 700,
            }}
          ></Chip>
        </Grid>
        <Grid item xs={8} sx={{ position: 'relative' }}>
          <Chip
            icon={
              <GraphicEqRoundedIcon
                sx={{ '&.MuiChip-icon': { color: '#AF6161 !important' } }}
              />
            }
            label='Please wait for the Consultant to finish speaking'
            sx={{
              position: 'absolute',
              zIndex: 5,
              top: '2.5rem',
              right: '1rem',
              backgroundColor: '#FB2D2D54',
              transition: '0.5s',
              opacity: interviewerTalking ? '100%' : '0%',
            }}
          ></Chip>
          <Chip
            icon={
              <GraphicEqRoundedIcon
                sx={{ '&.MuiChip-icon': { color: '#799D8C !important' } }}
              />
            }
            label='You may answer the question now'
            sx={{
              position: 'absolute',
              zIndex: 5,
              top: '2.5rem',
              right: '1rem',
              backgroundColor: '#28C17B4D',
              transition: '0.5s',
              opacity: isRecording ? '100%' : '0%',
            }}
          ></Chip>
          <Chip
            icon={
              <PersonIcon sx={{ '&.MuiChip-icon': { color: '#FFFFFF8A' } }} />
            }
            label={userDetails.name}
            sx={{
              position: 'absolute',
              zIndex: 5,
              bottom: '1rem',
              left: '2.5rem',
              backgroundColor: '#00000052',
              color: '#FFFFFFA1',
              fontWeight: 700,
            }}
          ></Chip>

          <WebCamera />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box width='18rem'></Box>
        <Image src={'controls.svg'} width={350} height={120} alt='controls' />
        <Box mt={4}>
          <Button
            variant='error'
            disabled={isRecording ? false : true}
            startIcon={<ReplayIcon />}
            onClick={redoQuestion}
          >
            Redo
          </Button>
          <Button
            disabled={isRecording || interviewComplete ? false : true}
            sx={{
              padding: '1.1rem 1.5rem',
              borderRadius: '10px',
              color: 'white',
              background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
              boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
            }}
            onClick={
              interviewComplete ? () => router.push('/feedback') : stopRecording
            }
            endIcon={
              questionsAnswered == questions.length ? null : <ArrowForward />
            }
            startIcon={
              questionsAnswered == questions.length ? (
                <CallEndRoundedIcon />
              ) : null
            }
          >
            {questionsAnswered == questions.length
              ? 'End COnsultation'
              : 'Submit Answer'}
          </Button>
        </Box>
      </Box>
    </>
  );
}
