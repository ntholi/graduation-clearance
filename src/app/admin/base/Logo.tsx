import NextLink from 'next/link';
import NextImage from 'next/image';
import { Image } from '@mantine/core';

export default function Logo() {
  return (
    <NextLink href='/admin'>
      <Image
        alt=''
        src='/logo-white.png'
        h={50}
        component={NextImage}
        width={150}
        height={150}
      />
    </NextLink>
  );
}
