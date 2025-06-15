// src/pages/SubmitIdea.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/config';
import SubmitIdeaHeader from '../components/submitIdea/SubmitIdeaHeader';
import SubmitIdeaForm from '../components/submitIdea/SubmitIdeaForm';

const SubmitIdea = () => {
  // State for form fields and UI
  const [ideaText, setIdeaText] = useState('');
  const [file, setFile] = useState(null);
  const [notionUrl, setNotionUrl] = useState('');
  const [submissionType, setSubmissionType] = useState('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  // Validate Notion URL using backend endpoint
  const validateNotionUrl = async (url) => {
    try {
      const response = await axios.post('/api/notion/validate', { url });
      return response.data.isValid;
    } catch (error) {
      return false;
    }
  };

  // Handle file input change and validate file
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

  // Handle form submission for all submission types
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setUploadProgress(0);
    try {
      // Validate Notion URL if submission type is notion
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
      // Submit the idea to the backend
      const response = await axios.post('/api/ideas/submit', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      });
      // Redirect to analysis progress page on success
      if (response.data && response.data.ideaId) {
        navigate(`/analysis-progress/${response.data.ideaId}`);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to submit idea');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SubmitIdeaHeader />
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
          {/* Submit Idea Form Component */}
          <SubmitIdeaForm
            ideaText={ideaText}
            setIdeaText={setIdeaText}
            file={file}
            setFile={setFile}
            notionUrl={notionUrl}
            setNotionUrl={setNotionUrl}
            submissionType={submissionType}
            setSubmissionType={setSubmissionType}
            isSubmitting={isSubmitting}
            error={error}
            uploadProgress={uploadProgress}
            handleFileChange={handleFileChange}
            handleSubmitForm={handleSubmitForm}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitIdea;
