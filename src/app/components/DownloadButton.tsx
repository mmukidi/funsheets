'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface DownloadButtonProps {
  storagePath: string;
  fileName: string;
  fileType: string;
}

export default function DownloadButton({ storagePath, fileName, fileType }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setError('');

      const { data, error } = await supabase.storage
        .from('worksheets')
        .download(storagePath);

      if (error) {
        throw error;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Error downloading file');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed text-base font-medium"
      >
        {downloading ? 'Downloading...' : 'Download'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center sm:text-left">{error}</p>
      )}
    </div>
  );
} 