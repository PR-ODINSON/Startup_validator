import React, { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';
import { ThemeToggle } from '../components';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const { navigateToPage, currentPage } = useComingSoon();

  const reports = [
    {
      id: 1,
      title: 'AI Validation Report - Q4 2024',
      date: '2024-12-15',
      type: 'Validation',
      status: 'completed',
      score: 87,
      insights: [
        'Strong market potential identified',
        'Technical feasibility confirmed',
        'Security vulnerabilities detected',
        'User engagement metrics positive'
      ],
      vulnerabilities: [
        'Data encryption needs improvement',
        'API authentication gaps found'
      ],
      recommendations: [
        'Implement end-to-end encryption',
        'Add OAuth 2.0 authentication',
        'Consider GDPR compliance measures'
      ]
    },
    {
      id: 2,
      title: 'Market Analysis Report - November 2024',
      date: '2024-11-30',
      type: 'Market Analysis',
      status: 'completed',
      score: 92,
      insights: [
        'High demand in target market',
        'Competitive advantage identified',
        'Scalability potential confirmed'
      ],
      vulnerabilities: [],
      recommendations: [
        'Focus on B2B market segment',
        'Develop strategic partnerships',
        'Consider international expansion'
      ]
    },
    {
      id: 3,
      title: 'Technical Feasibility Report - October 2024',
      date: '2024-10-15',
      type: 'Technical',
      status: 'completed',
      score: 78,
      insights: [
        'Core technology stack validated',
        'Performance benchmarks met',
        'Integration challenges identified'
      ],
      vulnerabilities: [
        'Scalability concerns in current architecture',
        'Third-party dependency risks'
      ],
      recommendations: [
        'Implement microservices architecture',
        'Reduce third-party dependencies',
        'Add comprehensive monitoring'
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      {/* Dashboard Navigation */}
      <div className="bg-white dark:bg-slate-900 shadow-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateToPage('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 'dashboard'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigateToPage('submit-idea')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 'submit-idea'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Submit Idea
              </button>
              <button
                onClick={() => navigateToPage('reports')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 'reports'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Reports
              </button>
              <button
                onClick={() => navigateToPage('vulnerabilities')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 'vulnerabilities'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Vulnerabilities
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">Reports & Analytics</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reports List */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-200">All Reports</h2>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedReport?.id === report.id
                          ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-600'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {report.type}
                          </span>
                        </div>
                        <span className={`text-lg font-bold ${getScoreColor(report.score)}`}>
                          {report.score}
                        </span>
                      </div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                        {report.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Report Details */}
            <div className="lg:col-span-2">
              {selectedReport ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {selectedReport.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {selectedReport.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Score: <span className={`font-bold ${getScoreColor(selectedReport.score)}`}>
                            {selectedReport.score}/100
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download PDF
                    </button>
                  </div>

                  {/* Insights Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Key Insights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedReport.insights.map((insight, index) => (
                        <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                          <p className="text-slate-700 dark:text-slate-300">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vulnerabilities Section */}
                  {selectedReport.vulnerabilities.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Identified Vulnerabilities
                      </h3>
                      <div className="space-y-3">
                        {selectedReport.vulnerabilities.map((vuln, index) => (
                          <div key={index} className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                            <p className="text-slate-700 dark:text-slate-300">{vuln}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      Recommendations
                    </h3>
                    <div className="space-y-3">
                      {selectedReport.recommendations.map((rec, index) => (
                        <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                          <p className="text-slate-700 dark:text-slate-300">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center text-center">
                  <FileText className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Select a Report
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Choose a report from the list to view detailed analysis and insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 