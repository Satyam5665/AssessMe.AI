'use client';

import { List, ListItem, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
import { QuestionContext } from '../../../../providers/QuestionProvider';

export default function InterviewQuestions() {
  const [questions] = useContext(QuestionContext);

  return (
    <List sx={{ listStyle: 'decimal', pl: 3, py: 0 }}>
      {questions.map((q, index) => {
        return (
          <ListItem
            key={index}
            sx={{ display: 'list-item', pl: 1, py: 0, pr: 0 }}
          >
            <ListItemText primary={q.question} />
          </ListItem>
        );
      })}
    </List>
  );
}
