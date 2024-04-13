'use client';
import { FileInput } from '@mantine/core';
import axios from 'axios';
import React from 'react';

export default function FileUploader() {
  async function handleChange(file: File | null) {
    console.log('handling file upload...');
    const formData = new FormData();
    formData.append('file', file as Blob);

    console.log('sending file to server...');

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('file uploaded successfully!');
  }

  return <FileInput label='Input label' onChange={handleChange} />;
}
