'use client';

import { createContext, useState } from 'react';

export const UserDetailsContext = createContext([{}, () => {}]);

export default function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    name: '',
  });
  return (
    <UserDetailsContext.Provider value={[userDetails, setUserDetails]}>
      {children}
    </UserDetailsContext.Provider>
  );
}
