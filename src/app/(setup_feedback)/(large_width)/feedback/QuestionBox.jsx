import { Button, Typography, ButtonBase } from '@mui/material';

import React from 'react';

export default function QuestionBox({ index, question, active, setActive }) {
  return (
    <Button
      sx={{
        padding: '1.5rem',
        minHeight: '4rem',
        backgroundColor:'#654ea3',
        justifyContent: 'start',
        textAlign: 'left',
        alignItems: 'start',
        boxShadow: '0px 4px 19.2px 0px rgba(0, 0, 0, 0.25)',
        borderWidth: '5px',
      }}
      onClick={() => setActive(index)}
      className={active == index ? 'active' : null}
    >
      <Typography sx={{ color: 'white', fontWeight: 700, textAlign:'center', borderColor:'purple' }}>
        {question}
      </Typography>
    </Button>
  );
}
