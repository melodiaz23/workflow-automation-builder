import { ReactNode, useState } from 'react';
import { DnDContext } from '../hooks/useDnD';

export function DnDProvider({ children }: { children: ReactNode }) {
  const [nodeType, setNodeType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[nodeType, setNodeType]}>
      {children}
    </DnDContext.Provider>
  );
}