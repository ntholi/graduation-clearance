'use client';
import { ActionIcon, Tooltip } from '@mantine/core';
import { FileDownIcon } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import TranscriptPDF from './[id]/TranscriptPDF';
import { useState } from 'react';
import JSZip from 'jszip';
import { getClearedStudentNumbers } from '../clearance-requests/actions';
import { getTranscript } from './actions';

export default function ExportAllButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const stdNos = await getClearedStudentNumbers();
      console.log('Cleared student numbers:', stdNos.length);
      const zip = new JSZip();

      // // Generate PDF for each student
      for (const stdNo of stdNos) {
        if (!stdNo) continue;
        const data: any = await getTranscript(stdNo);
        try {
          if (!data) continue;
          const blob = await pdf(
            <TranscriptPDF student={data.student} terms={data.terms} />,
          ).toBlob();
          zip.file(`${data.student.stdNo}.pdf`, blob);
        } catch (error) {
          console.error(
            `Error generating PDF for ${data.student.stdNo}:`,
            error,
          );
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transcripts.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDFs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip label='Export All Transcripts'>
      <ActionIcon
        size={'lg'}
        variant='default'
        onClick={handleExport}
        loading={isLoading}
      >
        <FileDownIcon size={'1.1rem'} />
      </ActionIcon>
    </Tooltip>
  );
}
