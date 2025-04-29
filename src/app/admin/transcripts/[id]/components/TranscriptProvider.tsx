'use client';

import { ReactNode } from 'react';
import { useAtom } from 'jotai';
import { Provider as JotaiProvider, atom } from 'jotai';
import { hiddenTermsAtom } from './HideTermButton';

// Add a new atom for completion date
export const completionDateAtom = atom<string>('November 2024');

type TranscriptProviderProps = {
  children: ReactNode;
};

function TranscriptProviderInner({ children }: TranscriptProviderProps) {
  const [hiddenTerms] = useAtom(hiddenTermsAtom);
  const [completionDate] = useAtom(completionDateAtom);

  if (typeof window !== 'undefined') {
    (window as any).__hiddenTerms = hiddenTerms;
    (window as any).__completionDate = completionDate;
  }

  return <>{children}</>;
}

export default function TranscriptProvider({
  children,
}: TranscriptProviderProps) {
  return (
    <JotaiProvider>
      <TranscriptProviderInner>{children}</TranscriptProviderInner>
    </JotaiProvider>
  );
}
