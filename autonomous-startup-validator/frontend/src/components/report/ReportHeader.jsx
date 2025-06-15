import React from 'react';

export default function ReportHeader({ idea, analysis }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{idea?.title || 'Startup Analysis'}</h1>
          <p className="text-gray-600 mt-1">
            Analysis completed on {new Date(analysis.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">{analysis.overallScore}/100</div>
          <div className="text-sm text-gray-500">Overall Score</div>
        </div>
      </div>
    </div>
  );
}
