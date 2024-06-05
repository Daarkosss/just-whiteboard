import React, { createContext, ReactNode, useContext } from 'react';
import RootStore from './RootStore';

const StoreContext = createContext<RootStore | null>(null);

interface StoreProviderProps {
  store: RootStore;
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
