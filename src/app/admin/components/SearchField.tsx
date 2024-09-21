'use client';
import { Box, BoxProps, CloseButton, TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function SearchField(props: BoxProps) {
  const [value, setValue] = React.useState('');
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(value: string) {
    setValue(value);
    console.log('Search value:', value);
    router.push(`${pathname}?search=${value}`);
  }

  const leftSection = value ? (
    <CloseButton
      onClick={() => {
        setValue('');
      }}
    />
  ) : (
    <Search size={20} />
  );

  return (
    <Box pt={0} {...props}>
      <TextInput
        placeholder='Search'
        value={value}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        rightSection={leftSection}
      />
    </Box>
  );
}
