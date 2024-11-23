'use client';
import { Button, Tooltip } from '@mantine/core';
import { pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { FileDownIcon } from 'lucide-react';
import { useState } from 'react';
import { getClearedStudentNumbers } from '../clearance-requests/actions';
import TranscriptPDF from './[id]/TranscriptPDF';
import { getTranscript } from './actions';
import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';

export default function ExportAllButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const stdNos = await getClearedStudentNumbers();
      const zip = new JSZip();

      // // Generate PDF for each student
      for (let index = 0; index < stdNos.length; index++) {
        const stdNo = stdNos[index];
        if (!stdNo) continue;
        const data: any = await getTranscript(stdNo);
        try {
          if (!data) continue;
          console.log(
            `${index + 1}/${stdNos.length}) Generating PDF for ${stdNo}`,
          );
          const blob = await pdf(
            <TranscriptPDF student={data.student} terms={data.terms} />,
          ).toBlob();
          const prefix = (index + 1).toString().padStart(3, '0');
          zip.file(`${prefix}-${data.student.stdNo}.pdf`, blob);
        } catch (error) {
          console.error(
            `Error generating PDF for ${data.student.stdNo}:`,
            error,
          );
          return;
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

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size='sm'>
          This operation will generate PDFs for all cleared students and may
          take some time. Are you sure you want to proceed?
        </Text>
      ),
      labels: { confirm: 'I understand, Proceed', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      cancelProps: { color: 'blue' },
      onCancel: () => console.log('Cancel'),
      onConfirm: handleExport,
    });

  return (
    <Tooltip label='Export All Transcripts'>
      <Button
        variant='default'
        onClick={openConfirmModal}
        leftSection={<FileDownIcon size={'1rem'} />}
        loading={isLoading}
      >
        Export All
      </Button>
    </Tooltip>
  );
}
