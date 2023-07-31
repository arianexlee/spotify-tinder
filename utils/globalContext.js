import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(/* Initial state here */);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;