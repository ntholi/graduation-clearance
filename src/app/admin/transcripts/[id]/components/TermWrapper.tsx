'use client';

import { Paper, Stack, Text, Group, Badge } from '@mantine/core';
import { ReactNode } from 'react';
import { useAtom } from 'jotai';
import { hiddenTermsAtom } from './HideTermButton';
import HideTermButton from './HideTermButton';

type TermWrapperProps = {
  termId: number;
  termName: string;
  children: ReactNode;
};

export default function TermWrapper({
  termId,
  termName,
  children,
}: TermWrapperProps) {
  const [hiddenTerms] = useAtom(hiddenTermsAtom);
  const termKey = `term-${termId}`;
  const isHidden = hiddenTerms[termKey] || false;

  return (
    <Paper withBorder p='md' style={{ opacity: isHidden ? 0.6 : 1 }}>
      <Stack gap='xs'>
        <Group justify='space-between'>
          <Group>
            <Text size='sm' fw={500}>
              {termName}
            </Text>
            {isHidden && (
              <Badge color='red' size='sm' variant='light'>
                Hidden
              </Badge>
            )}
          </Group>
          <HideTermButton termId={termId} termName={termName} />
        </Group>
        {children}
      </Stack>
    </Paper>
  );
}
