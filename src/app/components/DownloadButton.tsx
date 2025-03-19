'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DownloadButton() {
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setMessage('');

      // Using the correct file path for the template
      const filePath = 'template.xlsx';
      
      const { data, error } = await supabase.storage
        .from('worksheets')
        .download(filePath);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage('Template downloaded successfully!');
    } catch (error) {
      console.error('Error downloading file:', error);
      setMessage('Error downloading template');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Download Template</h2>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {downloading ? 'Downloading...' : 'Download Template'}
      </button>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
} 