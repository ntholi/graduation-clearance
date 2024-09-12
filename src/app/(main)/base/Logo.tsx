'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
  width?: number;
  height?: number;
};

export default function Logo({ className, width = 100, height = 100 }: Props) {
  const { theme } = useTheme();

  return (
    <Image
      width={width}
      height={height}
      className={className}
      src={theme === 'dark' ? '/logo-white.png' : '/logo-black.png'}
      alt='Logo'
    />
  );
}
