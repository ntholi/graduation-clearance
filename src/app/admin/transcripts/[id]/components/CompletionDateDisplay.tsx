'use client';

import { Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { completionDateAtom } from './TranscriptProvider';

export default function CompletionDateDisplay() {
  const [completionDate] = useAtom(completionDateAtom);

  return <Text>{completionDate}</Text>;
}
