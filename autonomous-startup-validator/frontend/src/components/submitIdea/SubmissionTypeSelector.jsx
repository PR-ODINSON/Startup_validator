import React from 'react';

export default function SubmissionTypeSelector({ submissionType, setSubmissionType }) {
  return (
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
  );
}
