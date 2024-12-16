import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalData {
  title?: string;
  author?: string;
  keywords?: string;
  date?: string;
  adviser?: string;
  // Add more fields if needed
}

interface GlobalDataContextProps {
  globalData: GlobalData;
  setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>;
}

const GlobalDataContext = createContext<GlobalDataContextProps | undefined>(undefined);

export const GlobalDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalData, setGlobalData] = useState<GlobalData>({}); // Initial state can be empty or pre-populated

  return (
    <GlobalDataContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};
