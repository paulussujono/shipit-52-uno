import { MyGameState } from 'game/types';
import * as React from 'react';

type BgioGProviderProps = { children: React.ReactNode; G: MyGameState };

const BgioGContext = React.createContext<
  | {
      G: MyGameState;
    }
  | undefined
>(undefined);

export function BgioGProvider({ G, children }: BgioGProviderProps) {
  return <BgioGContext.Provider value={{ G }}>{children}</BgioGContext.Provider>;
}
export function useBgioG() {
  const context = React.useContext(BgioGContext);
  if (context === undefined) {
    throw new Error('useBgioG must be used within a BgioGProvider');
  }
  return context;
}
