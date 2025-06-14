// src/pages/SubmitIdea.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/config';

const SubmitIdea = () => {
  const [ideaText, setIdeaText] = useState('');
  const [file, setFile] = useState(null);
  const [notionUrl, setNotionUrl] = useState('');
  const [submissionType, setSubmissionType] = useState('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const validateNotionUrl = async (url) => {
    try {
      const response = await axios.post('/api/notion/validate', { url });
      return response.data.isValid;
    } catch (error) {
      return false;
    }
  };

  // Example function to submit an idea
  const handleSubmit = async (ideaData) => {
    try {
      const response = await api.post('/ideas', ideaData);
      // handle success
    } catch (error) {
      // handle error
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setUploadProgress(0);

    try {
      // Validate Notion URL if needed
      if (submissionType === 'notion') {
        const isValid = await validateNotionUrl(notionUrl);
        if (!isValid) {
          throw new Error('Invalid or inaccessible Notion URL');
        }
      }

      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('submissionType', submissionType);
      
      if (submissionType === 'text') {
        formData.append('description', ideaText);
        formData.append('title', ideaText.substring(0, 50) + '...');
      } else if (submissionType === 'file' && file) {
        formData.append('file', file);
        formData.append('description', `File upload: ${file.name}`);
        formData.append('title', file.name);
      } else if (submissionType === 'notion') {
        formData.append('notionUrl', notionUrl);
        formData.append('description', `Notion document: ${notionUrl}`);
        formData.append('title', 'Notion Document');
      }

      const response = await axios.post('/api/ideas/submit', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      // Start polling for analysis progress
      navigate(`/analysis-progress/${response.data.ideaId}`);
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to submit idea');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚀</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Autonomous Startup Validator</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Startup Idea</h1>
          <p className="text-lg text-gray-600">
            Describe your startup idea and get instant AI-powered validation from expert agents
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmitForm}>
            {/* Submission Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you like to submit your idea?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSubmissionType('text')}
                  className={`px-4 py-2 rounded-lg border ${
                    submissionType === 'text'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  📝 Text Description
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('file')}
                  className={`px-4 py-2 rounded-lg border ${
                    submissionType === 'file'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  📄 Upload PDF
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('notion')}
                  className={`px-4 py-2 rounded-lg border ${
                    submissionType === 'notion'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  📋 Notion Link
                </button>
              </div>
            </div>

            {/* Dynamic Content Based on Submission Type */}
            {submissionType === 'text' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Startup Idea
                </label>
                <textarea
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  rows={8}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your startup idea, target market, problem you're solving, and your proposed solution..."
                  required
                />
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    Be as detailed as possible. Include the problem, solution, target market, and business model.
                  </p>
                  <span className="text-sm text-gray-400">{ideaText.length}/2000</span>
                </div>
              </div>
            )}

            {submissionType === 'file' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF Document
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-gray-400 mb-2">
                      <span className="text-4xl">📄</span>
                    </div>
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF files only, max 10MB</p>
                  </label>
                  {file && (
                    <div className="mt-4 p-3 bg-green-50 rounded-md">
                      <p className="text-sm text-green-600 font-medium">
                        ✓ Selected: {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Upload Progress */}
                {isSubmitting && uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {submissionType === 'notion' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notion Document Link
                </label>
                <input
                  type="url"
                  value={notionUrl}
                  onChange={(e) => setNotionUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://notion.so/your-startup-idea"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Make sure your Notion page is publicly accessible
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || (!ideaText && !file && !notionUrl)}
                className={`px-8 py-3 rounded-lg text-white font-medium ${
                  isSubmitting || (!ideaText && !file && !notionUrl)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {submissionType === 'file' ? 'Uploading...' : 'Submitting...'}
                  </div>
                ) : (
                  'Submit for Analysis'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitIdea;
