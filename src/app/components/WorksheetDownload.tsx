'use client';

import { useState } from 'react';
import { generateWorksheet } from '@/lib/claude';
import { uploadWorksheetToStorage, supabase } from '@/lib/supabase';

interface WorksheetDownloadProps {
  prompt: string;
  subject: string;
  studentName: string;
  profileId: string;
  studentAge: string;
}

export default function WorksheetDownload({ prompt, subject, studentName, profileId, studentAge }: WorksheetDownloadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      // Generate worksheet content
      const content = await generateWorksheet(prompt);
      
      if (!content) {
        throw new Error('Failed to generate worksheet content');
      }

      // Create a proper docx file name with profile name, age, and datetime
      const sanitizedName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
      const sanitizedAge = studentAge.replace(/[^0-9]/g, '');
      const datetime = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${sanitizedName}-${sanitizedAge}-${datetime}.html`;

      // Save to Supabase storage
      const { publicUrl } = await uploadWorksheetToStorage(content, fileName, profileId, subject);
      
      if (!publicUrl) {
        throw new Error('Failed to get download URL');
      }

      // Store the file path for later use
      setFilePath(`documents/${profileId}/${subject}/${fileName}`);
    } catch (err) {
      console.error('Error generating worksheet:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate worksheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!filePath) return;
    
    try {
      // Get the file from Supabase storage
      const { data, error } = await supabase.storage
        .from('worksheets')
        .download(filePath);

      if (error) {
        console.error('Download error:', error);
        throw new Error(`Failed to download file: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data received from storage');
      }

      // Create a blob URL with the correct content type
      const blob = new Blob([data], { type: 'text/html;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${studentName}_${subject}_Worksheet.html`;
      // Add target="_blank" to open in new tab on mobile
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to download worksheet. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a]">
      <h3 className="text-lg font-semibold text-white mb-4">
        {subject} Worksheet for {studentName}
      </h3>
      
      {!filePath ? (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full px-4 py-2 bg-[#a8d1ff] text-[#1a1a1a] rounded-full hover:bg-[#8ab4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating Worksheet...' : 'Generate Worksheet'}
        </button>
      ) : (
        <button
          onClick={handleDownload}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
        >
          Download Worksheet
        </button>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400 bg-[#1a1a1a] p-3 rounded-md border border-red-400/20">
          {error}
        </p>
      )}
    </div>
  );
} 