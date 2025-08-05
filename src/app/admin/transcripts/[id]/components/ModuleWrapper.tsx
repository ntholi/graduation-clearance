'use client';

import { TableTr } from '@mantine/core';
import { ReactNode } from 'react';
import { useAtom } from 'jotai';
import { hiddenModulesAtom } from './HideModuleButton';

type ModuleWrapperProps = {
  moduleId: number;
  children: ReactNode;
};

export default function ModuleWrapper({
  moduleId,
  children,
}: ModuleWrapperProps) {
  const [hiddenModules] = useAtom(hiddenModulesAtom);
  const moduleKey = `module-${moduleId}`;
  const isHidden = hiddenModules[moduleKey] || false;

  return <TableTr style={{ opacity: isHidden ? 0.6 : 1 }}>{children}</TableTr>;
}
