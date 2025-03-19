'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Set default title as filename without extension
      const fileName = e.target.files[0].name;
      setTitle(fileName.replace(/\.[^/.]+$/, ''));
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    try {
      setUploading(true);
      setMessage('');
      setError('');

      // Generate a unique filename to prevent conflicts
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}-${file.name}`;
      const filePath = `documents/${uniqueFileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('worksheets')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Insert record into database
      const { error: dbError } = await supabase.from('documents').insert([
        {
          title: title.trim(),
          description: description.trim(),
          storage_path: uploadData.path,
          file_type: file.type,
          file_size: file.size,
          status: 'active',
          metadata: {
            originalName: file.name,
            lastModified: file.lastModified,
            timestamp: timestamp,
          },
        },
      ]);

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      setMessage('File uploaded successfully!');
      setFile(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error instanceof Error ? error.message : 'Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Upload Worksheet</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-blue-500 focus:outline-none"
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  {file ? 'Change file' : 'Click to upload'}
                </span>
              </div>
              <p className="pt-1 text-sm tracking-wider text-gray-400">
                {file ? file.name : 'PDF, DOC, DOCX, XLS, XLSX'}
              </p>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter document description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            rows={3}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed text-base font-medium"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>

        {message && (
          <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </p>
        )}
      </div>
    </div>
  );
} 