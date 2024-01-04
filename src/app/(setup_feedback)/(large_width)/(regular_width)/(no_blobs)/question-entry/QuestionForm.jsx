'use client';

import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Input,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ArrowBackward from '@mui/icons-material/ChevronLeftRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useContext, useState, useRef, useEffect } from 'react';
import { QuestionContext } from '../../../../../providers/QuestionProvider';
import { JobContext } from '../../../../../providers/JobProvider';
import BoxWrapper from '../../../../../shared/BoxWrapper';
import { useRouter } from 'next/navigation';
import { useCompletion } from 'ai/react';

export default function QuestionForm() {
  const [questions, setQuestions] = useContext(QuestionContext);
  const [jobInfo] = useContext(JobContext);
  const [questionList, setQuestionList] = useState(questions);
  const [alertText, setAlertText] = useState(false);

  const router = useRouter();
  const scrollRef = useRef(null);

  const addQuestion = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!e.target.value.replace(/\s/g, '').length) {
        setAlertText(
          'Question is invalid. Please type out a question and press "Enter" '
        );
        e.target.value = '';
        return;
      }

      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].question == e.target.value) {
          setAlertText('You have already added this question');
          e.target.value = '';
          return;
        }
      }

      setAlertText(false);
      setQuestionList([
        ...questionList,
        { question: e.target.value, answer: '', isAI: false },
      ]);
      e.target.value = '';
    }
  };

  const deleteQuestion = (deleteIndex) => {
    setQuestionList(questionList.filter((q, index) => index != deleteIndex));
  };

  const handleComplete = (e) => {
    e.preventDefault();
    if (questionList.length < 3) {
      setAlertText('Please have at least three questions');
    } else {
      setQuestions(questionList);
      router.push('/setup-overview');
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setQuestions(questionList);
    router.push('/job-info');
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newOrder = Array.from(questionList);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, JSON.parse(draggableId));
    setQuestionList(newOrder);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const { complete, completion, isLoading } = useCompletion({
    api: '/util/chatGPT',
  });

  const generateQuestion = async () => {
    const requestBody = {
      queryType: 'generateQuestion',
      questions: questionList.map((q) => q.question),
      ...jobInfo,
    };

    complete(requestBody);
    setQuestionList([
      ...questionList,
      { question: '', answer: '', isAI: true },
    ]);
  };

  useEffect(() => {
    if (isLoading) {
      let newList = questionList;
      newList[questionList.length - 1].question = completion;
      setQuestionList[newList];
    }
  }, [completion]);

  return (
    <Box component='form' onSubmit={handleComplete}>
      <Box sx={{display:'flex', backgroundColor:'white', padding:'4rem', borderRadius:'15px' ,alignItems:'center', flexDirection:'column'}}>
      <Typography sx={{textAlign:'center', fontSize:'4rem', fontWeight:'600'}}>
          Curate Personalization
        </Typography>
        <Box sx={{width:'32vw', borderRadius:'50px',margin:'auto 0px' ,height:'10px' ,background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',}}></Box>
        <Typography sx={{marginTop:'2rem', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.4rem', textAlign:'center'}}>
          Write Or Generate Assessment Questions <br/>Curated From The Context in Database. 
        </Typography>
        <Box
          width='90%'
          mt={-2}
          height={alertText && questionList.length >= 4 ? '20rem' : '18rem'}
          sx={{ paddingTop: '20px' }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <Box
                  ref={(el) => {
                    provided.innerRef(el);
                    scrollRef.current = el;
                  }}
                  {...provided.droppableProps}
                  width='100%'
                  maxHeight='13.9rem'
                  overflow='auto'
                  className='greyScroll'
                >
                  {questionList.map((item, index) => {
                    console.log(index);
                    return (
                      <Draggable
                        key={item.question}
                        draggableId={JSON.stringify(item)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Stack
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                            direction='row'
                            gap={1}
                            sx={{
                              borderStyle: 'solid',
                              borderWidth: '1px',
                              borderColor: 'black',
                              borderRadius: 2,
                              py: 0.1,
                              px: 1,
                              display: 'flex',
                              alignItems: 'center',
                              bgcolor: snapshot.isDragging
                                ? '#F1F8E9'
                                : 'white',
                              mb: 1.5,
                              mx: 3,
                              boxShadow: snapshot.isDragging
                                ? '0px 4px 13.800000190734863px 0px #C8D5B94D'
                                : 'none',
                            }}
                          >
                            <Box
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              {...provided.dragHandleProps}
                            >
                              <DragIndicatorIcon htmlColor='#C8D5B9' />
                            </Box>
                            <Typography
                              variant='body1'
                              py={1}
                              sx={{ flexGrow: 1 }}
                            >
                              {item.question}
                            </Typography>
                            {item.isAI && (
                              <Box
                                sx={{
                                  borderRadius: '0.2rem',
                                  padding: '4px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginRight: -1,
                                  marginLeft: 1,
                                }}
                              >
                                <AutoAwesomeRoundedIcon
                                  sx={{
                                    color: 'black',
                                    fontSize: '1.3rem',
                                  }}
                                />
                              </Box>
                            )}
                            <IconButton
                              aria-label='delete'
                              onClick={() => deleteQuestion(index)}
                            >
                              <DeleteRoundedIcon htmlColor='black' />
                            </IconButton>
                          </Stack>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Box px={3} mr={questionList.length > 4 ? 1 : 0}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: 1.5,
                gap: 1.5,
              }}
            >
              <Stack
                direction='row'
                sx={{
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderColor: 'black',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#655ea3',
                  fontSize: '2rem',
                  flexGrow: 1,
                }}
              >
                <AddBoxRoundedIcon
                  htmlColor='white'
                  fontSize='inherit'
                  sx={{ margin: 0.7 }}
                />
                <Input
                  placeholder="Fill with a relevant question"
                  disableUnderline={true}
                  fullWidth
                  onKeyDown={addQuestion}
                  inputProps={{
                    'aria-label': 'Add a question',
                  }}
                  sx={{ pr: 2, color: 'white', '&::placeholder': { color: 'white' } }}
                  disabled={false}
                />
              </Stack>
              <Button
                sx={{
                  padding: '0.7rem 1.5rem',
                  borderRadius: '10px',
                  color: 'white',
                  background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
                  boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
                }}
                startIcon={
                  isLoading ? (
                    <CircularProgress
                      size={'1.3rem'}
                      sx={{ color: '#272D2D' }}
                      thickness={5}
                    />
                  ) : (
                    <AutoAwesomeRoundedIcon />
                  )
                }
                disabled={isLoading}
                onClick={generateQuestion}
              >
                Surprise Me
              </Button>
            </Box>
            <Collapse in={alertText}>
              <Alert
                severity='error'
                sx={{
                  borderRadius: 2,
                  border: '1px solid #DEAFAF',
                  width: '95.5%',
                }}
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setAlertText(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
              >
                {alertText}
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        marginTop='2rem'
      >
        <Button
          variant='outlined'
          onClick={handleBack}
          startIcon={<ArrowBackward />}
          sx={{ pr: 6 }}
        >
          Back
        </Button>
        <Button
          type='submit'
          sx={{
            padding: '0.7rem 1.5rem',
            borderRadius: '10px',
            color: 'white',
            background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
            boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
          }}
          endIcon={<CheckRoundedIcon />}
        >
          Complete Setup
        </Button>
      </Box>
    </Box>
  );
}
