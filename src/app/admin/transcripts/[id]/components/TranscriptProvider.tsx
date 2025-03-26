'use client';

import { ReactNode } from 'react';
import { useAtom } from 'jotai';
import { Provider as JotaiProvider } from 'jotai';
import { hiddenTermsAtom } from './HideTermButton';

type TranscriptProviderProps = {
  children: ReactNode;
};

function TranscriptProviderInner({ children }: TranscriptProviderProps) {
  const [hiddenTerms] = useAtom(hiddenTermsAtom);

  if (typeof window !== 'undefined') {
    (window as any).__hiddenTerms = hiddenTerms;
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
