import React, { useState } from 'react';
import { AlertTriangle, Shield, CheckCircle, Clock, XCircle, TrendingUp, Zap } from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';
import { ThemeToggle } from '../components';

const Vulnerabilities = () => {
  const [selectedVuln, setSelectedVuln] = useState(null);
  const [filter, setFilter] = useState('all');
  const { navigateToPage, currentPage } = useComingSoon();

  const vulnerabilities = [
    {
      id: 1,
      title: 'Sensitive Data Exposure',
      severity: 'high',
      status: 'open',
      date: '2024-12-15',
      description: 'AI detected possible exposure of sensitive user data in your idea submission.',
      impact: 'High risk of data breach and regulatory non-compliance',
      recommendation: 'Implement end-to-end encryption and secure data storage practices',
      affectedComponents: ['User Authentication', 'Data Storage', 'API Endpoints'],
      cveScore: 8.5
    },
    {
      id: 2,
      title: 'Insecure API Authentication',
      severity: 'medium',
      status: 'in-progress',
      date: '2024-12-10',
      description: 'API endpoints lack proper authentication checks and authorization.',
      impact: 'Unauthorized access to sensitive business logic and data',
      recommendation: 'Implement OAuth 2.0 and JWT token-based authentication',
      affectedComponents: ['API Gateway', 'Backend Services', 'Mobile App'],
      cveScore: 6.8
    },
    {
      id: 3,
      title: 'Cross-Site Scripting (XSS)',
      severity: 'medium',
      status: 'resolved',
      date: '2024-12-05',
      description: 'Potential XSS vulnerabilities in user input handling.',
      impact: 'Malicious script execution in user browsers',
      recommendation: 'Implement input validation and output encoding',
      affectedComponents: ['Web Interface', 'User Input Forms'],
      cveScore: 5.5
    },
    {
      id: 4,
      title: 'SQL Injection Vulnerability',
      severity: 'high',
      status: 'open',
      date: '2024-12-12',
      description: 'Database queries are vulnerable to SQL injection attacks.',
      impact: 'Unauthorized database access and data manipulation',
      recommendation: 'Use parameterized queries and ORM frameworks',
      affectedComponents: ['Database Layer', 'User Management'],
      cveScore: 9.1
    },
    {
      id: 5,
      title: 'Weak Password Policy',
      severity: 'low',
      status: 'open',
      date: '2024-12-08',
      description: 'Password requirements are not strong enough.',
      impact: 'Increased risk of account compromise',
      recommendation: 'Enforce strong password policies and multi-factor authentication',
      affectedComponents: ['User Registration', 'Password Reset'],
      cveScore: 3.2
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700';
      case 'low':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700';
      default:
        return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20 border-slate-300 dark:border-slate-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'resolved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default:
        return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <XCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredVulns = vulnerabilities.filter(vuln => {
    if (filter === 'all') return true;
    return vuln.status === filter;
  });

  const stats = {
    total: vulnerabilities.length,
    open: vulnerabilities.filter(v => v.status === 'open').length,
    inProgress: vulnerabilities.filter(v => v.status === 'in-progress').length,
    resolved: vulnerabilities.filter(v => v.status === 'resolved').length,
    high: vulnerabilities.filter(v => v.severity === 'high').length,
    medium: vulnerabilities.filter(v => v.severity === 'medium').length,
    low: vulnerabilities.filter(v => v.severity === 'low').length
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">Security Vulnerabilities</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{stats.total}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Open</p>
                  <p className="text-2xl font-bold text-red-600">{stats.open}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vulnerabilities List */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Vulnerabilities</h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {filteredVulns.map((vuln) => (
                    <div
                      key={vuln.id}
                      onClick={() => setSelectedVuln(vuln)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedVuln?.id === vuln.id
                          ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-600'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(vuln.status)} flex items-center gap-1`}>
                          {getStatusIcon(vuln.status)}
                          {vuln.status}
                        </span>
                      </div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                        {vuln.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        CVE Score: {vuln.cveScore}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        {vuln.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vulnerability Details */}
            <div className="lg:col-span-2">
              {selectedVuln ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {selectedVuln.title}
                      </h2>
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getSeverityColor(selectedVuln.severity)}`}>
                          {selectedVuln.severity.toUpperCase()} SEVERITY
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedVuln.status)} flex items-center gap-1`}>
                          {getStatusIcon(selectedVuln.status)}
                          {selectedVuln.status.toUpperCase()}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          CVE Score: {selectedVuln.cveScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Description
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        {selectedVuln.description}
                      </p>
                    </div>

                    {/* Impact */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Potential Impact
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                        {selectedVuln.impact}
                      </p>
                    </div>

                    {/* Affected Components */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        Affected Components
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedVuln.affectedComponents.map((component, index) => (
                          <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{component}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Recommendation
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                        {selectedVuln.recommendation}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                        Mark as In Progress
                      </button>
                      <button className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                        Generate Fix Report
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center text-center">
                  <Shield className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Select a Vulnerability
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Choose a vulnerability from the list to view detailed information and recommendations.
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

export default Vulnerabilities; 