'use client';

import { createContext, useState } from 'react';

export const JobContext = createContext([{}, () => {}]);

export default function JobProvider({ children }) {
  const [jobInfo, useJobInfo] = useState({
    title: '',
    type: [],
    company: '',
    reqs: '',
  });

  return (
    <JobContext.Provider value={[jobInfo, useJobInfo]}>
      {children}
    </JobContext.Provider>
  );
}
