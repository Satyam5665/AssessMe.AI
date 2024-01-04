'use client';

import { createContext, useState } from 'react';

export const FeedbackContext = createContext([{}, () => {}]);

export default function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState({});
  return (
    <FeedbackContext.Provider value={[feedback, setFeedback]}>
      {children}
    </FeedbackContext.Provider>
  );
}
