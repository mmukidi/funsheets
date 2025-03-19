'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(''); // Clear any previous errors
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setMessage('');
      setError('');

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('worksheets')
        .upload(`documents/${file.name}`, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Insert record into database
      const { error: dbError } = await supabase.from('worksheets').insert([
        {
          title: file.name,
          storage_path: uploadData.path,
          size: file.size,
          metadata: {
            type: file.type,
            lastModified: file.lastModified,
          },
        },
      ]);

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      setMessage('File uploaded successfully!');
      setFile(null); // Reset file input
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error instanceof Error ? error.message : 'Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Worksheet</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {file.name}
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>

        {message && (
          <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
      </div>
    </div>
  );
} 