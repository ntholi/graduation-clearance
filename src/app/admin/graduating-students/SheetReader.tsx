'use client';
import { ActionIcon, FileButton } from '@mantine/core';
import { Upload } from 'lucide-react';
import { useTransition } from 'react';
import * as XLSX from 'xlsx';
import { saveGraduationList } from './actions';

async function writeFileContents(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      try {
        const binaryString = event.target?.result;
        if (typeof binaryString !== 'string') {
          reject(new Error('Invalid file content'));
          return;
        }

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
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsBinaryString(file);
  });
}

export default function SheetReader() {
  const [pending, startTransition] = useTransition();

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    startTransition(async () => {
      try {
        await writeFileContents(file);
      } catch (error) {
        console.error('Error processing file:', error);
        // Handle error (e.g., show error message to user)
      }
    });
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
