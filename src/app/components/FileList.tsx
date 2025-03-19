'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Document {
  id: string;
  title: string;
  storage_path: string;
  uploaded_at: string;
  size: number;
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
      const { data, error } = await supabase
        .from('worksheets')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
      setError('Error loading documents');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (storagePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('worksheets')
        .download(storagePath);

      if (error) throw error;

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
      alert('Error downloading file');
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Documents</h2>
      <div className="space-y-4">
        {documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(doc.uploaded_at).toLocaleDateString()} • 
                  {(doc.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => downloadFile(doc.storage_path, doc.title)}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Download
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 