'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { generateCustomPrompt } from '@/lib/generatePrompt';
import WorksheetDownload from './WorksheetDownload';

interface UserDetails {
  name: string;
  age: string;
  interests: string;
  subjects: string[];
  gender: string;
}

interface GeneratedPrompt {
  subject: string;
  prompt: string;
  profileId: string;
}

export default function UserDetailsForm() {
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    age: '',
    interests: '',
    subjects: [],
    gender: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);

  const subjects = ['Math', 'Science', 'Social', 'ELA'];
  const genderOptions = ['Male', 'Female'];

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!formData.name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (!formData.age.trim()) {
      setError('Please enter your age');
      setLoading(false);
      return;
    }

    if (!formData.gender) {
      setError('Please select your gender');
      setLoading(false);
      return;
    }

    if (formData.subjects.length === 0) {
      setError('Please select at least one subject');
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting data:', {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        interests: formData.interests.trim(),
        subjects: formData.subjects,
        gender: formData.gender
      });

      // First, insert the profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            name: formData.name.trim(),
            age: parseInt(formData.age),
            interests: formData.interests.trim(),
            subjects: formData.subjects,
            gender: formData.gender
          }
        ])
        .select()
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        throw new Error(`Profile error: ${profileError.message}`);
      }

      // Generate prompts for each selected subject
      const generatedPrompts = formData.subjects.map(subject => ({
        subject,
        prompt: generateCustomPrompt({
          name: formData.name,
          age: formData.age,
          interests: formData.interests,
          subjects: formData.subjects,
          gender: formData.gender
        }),
        profileId: profileData.id
      }));

      setGeneratedPrompts(generatedPrompts);

      // Save prompts to database
      const promptPromises = generatedPrompts.map(async ({ subject, prompt, profileId }) => {
        const { error: promptError } = await supabase
          .from('prompts')
          .insert([
            {
              profile_id: profileId,
              prompt_text: prompt,
              subject: subject,
              difficulty_level: parseInt(formData.age) >= 15 ? 'advanced' : parseInt(formData.age) >= 12 ? 'intermediate' : 'basic'
            }
          ]);

        if (promptError) {
          console.error(`Prompt error for ${subject}:`, promptError);
          throw new Error(`Prompt error for ${subject}: ${promptError.message}`);
        }
      });

      await Promise.all(promptPromises);

      console.log('Success response:', profileData);
      setMessage('Profile and prompts updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      setError(error instanceof Error ? error.message : 'Error saving profile. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-4 sm:p-6 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a]">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Student Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#a8d1ff] mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8d1ff] text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a8d1ff] mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              placeholder="Enter your age"
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8d1ff] text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a8d1ff] mb-2">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              {genderOptions.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-4 h-4 text-[#a8d1ff] bg-[#1a1a1a] border-[#3a3a3a] focus:ring-[#a8d1ff]"
                  />
                  <span className="text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a8d1ff] mb-2">
              Interests
            </label>
            <textarea
              value={formData.interests}
              onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
              placeholder="What are your interests? (e.g., reading, sports, music)"
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8d1ff] text-white placeholder-gray-400"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a8d1ff] mb-2">
              Subjects
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {subjects.map((subject) => (
                <label key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    className="w-4 h-4 text-[#a8d1ff] bg-[#1a1a1a] border-[#3a3a3a] rounded focus:ring-[#a8d1ff]"
                  />
                  <span className="text-white">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-[#a8d1ff] text-[#1a1a1a] rounded-full hover:bg-[#8ab4e6] transition-colors text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Update Profile'}
          </button>

          {message && (
            <p className="text-sm text-green-400 bg-[#1a1a1a] p-3 rounded-md border border-green-400/20">
              {message}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-400 bg-[#1a1a1a] p-3 rounded-md border border-red-400/20">
              {error}
            </p>
          )}
        </form>
      </div>

      {generatedPrompts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Your Worksheets</h2>
          {generatedPrompts.map(({ subject, prompt, profileId }) => (
            <WorksheetDownload
              key={subject}
              prompt={prompt}
              subject={subject}
              studentName={formData.name.trim()}
              profileId={profileId}
            />
          ))}
        </div>
      )}
    </div>
  );
} 