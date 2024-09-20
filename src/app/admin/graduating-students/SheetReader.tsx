'use client';
import { ActionIcon, FileButton } from '@mantine/core';
import { Upload } from 'lucide-react';
import { useTransition } from 'react';
import * as XLSX from 'xlsx';
import { saveGraduationList } from './actions';

async function writeFileContents(file: File) {
  const reader = new FileReader();
  reader.onload = async (event: ProgressEvent<FileReader>) => {
    const binaryString = event.target?.result;
    if (typeof binaryString !== 'string') return;

    const workbook = XLSX.read(binaryString, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rawData: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
    });
    const stdNumbers = rawData
      .flatMap((row) => row.map((cell) => cell.toString()))
      .filter((cell) => cell.startsWith('9010'));
    await saveGraduationList(stdNumbers.map(Number));
  };
  reader.readAsBinaryString(file);
}

export default function SheetReader() {
  const [pending, startTransition] = useTransition();

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    startTransition(() => writeFileContents(file));
  };

  return (
    <FileButton
      onChange={handleFileChange}
      accept='.xls,.xlsx'
      disabled={pending}
    >
      {(props) => (
        <ActionIcon {...props} loading={pending}>
          <Upload size={'1rem'} />
        </ActionIcon>
      )}
    </FileButton>
  );
}
