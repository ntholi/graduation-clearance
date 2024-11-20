'use client';
import { ActionIcon } from '@mantine/core';
import { PrinterIcon } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import TranscriptPDF from './TranscriptPDF';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTranscript } from '../actions';

export default function PrintButton() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTranscript(id as string);
      setData(result);
    };
    fetchData();
  }, [id]);

  const handlePrint = async () => {
    if (!data) return;

    try {
      const blob = await pdf(
        <TranscriptPDF student={data.student} terms={data.terms} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transcript-${data.student.stdNo}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <ActionIcon size={'lg'} variant='default' onClick={handlePrint}>
      <PrinterIcon size={'1.1rem'} />
    </ActionIcon>
  );
}
