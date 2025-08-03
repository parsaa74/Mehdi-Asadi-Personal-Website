"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

interface InitialLoadContextType {
  isLoading: boolean;
}

const InitialLoadContext = createContext<InitialLoadContextType | undefined>(undefined);

export function useInitialLoad(): InitialLoadContextType {
  const context = useContext(InitialLoadContext);
  if (!context) {
    throw new Error('useInitialLoad must be used within an InitialLoadProvider');
  }
  return context;
}

interface InitialLoadProviderProps {
  children: ReactNode;
}

export function InitialLoadProvider({ children }: InitialLoadProviderProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('initialLoadComplete')) {
      setIsInitialLoadComplete(true);
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('initialLoadComplete', 'true');
    setIsInitialLoadComplete(true);
    setIsLoading(false);
  };

  return (
    <InitialLoadContext.Provider value={{ isLoading }}>
      {!isInitialLoadComplete && <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />}
      {isInitialLoadComplete && children}
    </InitialLoadContext.Provider>
  );
}