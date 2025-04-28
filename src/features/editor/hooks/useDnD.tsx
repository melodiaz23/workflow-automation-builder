import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type DnDContextType = [string | null, Dispatch<SetStateAction<string | null>>];

export const DnDContext = createContext<DnDContextType>([null, () => { }]);

export function useDnD() {
  return useContext(DnDContext);
}