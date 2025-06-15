import React from 'react';
import SubmissionTypeSelector from './SubmissionTypeSelector';

export default function SubmitIdeaForm({
  ideaText,
  setIdeaText,
  file,
  setFile,
  notionUrl,
  setNotionUrl,
  submissionType,
  setSubmissionType,
  isSubmitting,
  error,
  uploadProgress,
  handleFileChange,
  handleSubmitForm
}) {
  return (
    <form onSubmit={handleSubmitForm}>
      {/* Submission Type Selector */}
      <SubmissionTypeSelector submissionType={submissionType} setSubmissionType={setSubmissionType} />
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
  );
}
