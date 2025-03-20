'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import DownloadButton from './DownloadButton';

interface Document {
  id: string;
  title: string;
  description: string;
  storage_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  metadata: {
    originalName: string;
    lastModified: number;
    fileId: string;
  };
}

export default function FileList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
      setError('Error loading documents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-[#a8d1ff]">Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-[#a8d1ff]">No documents found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="p-4 sm:p-6 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] hover:border-[#a8d1ff] transition-colors duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-white break-words">{doc.title}</h3>
              {doc.description && (
                <p className="mt-1 text-sm text-[#a8d1ff] break-words">{doc.description}</p>
              )}
              <div className="mt-2 text-sm text-gray-400 space-y-1">
                <p>File type: {doc.file_type}</p>
                <p>Size: {formatFileSize(doc.file_size)}</p>
                <p>Uploaded: {formatDate(doc.created_at)}</p>
              </div>
            </div>
            <div className="flex justify-center sm:justify-end">
              <DownloadButton
                storagePath={doc.storage_path}
                fileName={doc.metadata.originalName}
                fileType={doc.file_type}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 