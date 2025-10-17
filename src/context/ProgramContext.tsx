'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProgramContextType {
  program: string;
  setProgram: (program: string) => void;
  resetProgram: () => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [program, setProgram] = useState('');

  const resetProgram = () => {
    setProgram('');
  };

  return (
    <ProgramContext.Provider value={{ program, setProgram, resetProgram }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error('useProgram must be used within a ProgramProvider');
  }
  return context;
} 