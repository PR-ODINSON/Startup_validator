import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Download, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Zap, Target, BarChart3, Shield, Globe, Code, Users2 } from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';
import { ThemeToggle } from '../components';

// Latest validation score data for pie chart
const validationScoreData = [
  { name: 'Technical Feasibility', value: 35, color: '#34d399' },
  { name: 'Market Potential', value: 28, color: '#fbbf24' },
  { name: 'Security Score', value: 22, color: '#f87171' },
  { name: 'User Experience', value: 15, color: '#60a5fa' }
];

// AI Validation Metrics data
const validationMetricsData = [
  { category: 'Technical', score: 87, icon: Code, color: '#34d399' },
  { category: 'Market', score: 92, icon: Globe, color: '#fbbf24' },
  { category: 'Security', score: 78, icon: Shield, color: '#f87171' },
  { category: 'UX/UI', score: 85, icon: Users2, color: '#60a5fa' },
  { category: 'Scalability', score: 89, icon: TrendingUp, color: '#a855f7' },
  { category: 'Innovation', score: 94, icon: Zap, color: '#f59e0b' }
];

// Data processing insights
const dataProcessingInsights = {
  totalDataPoints: 1247,
  processedSuccessfully: 1189,
  failedProcessing: 58,
  processingTime: '2.3 seconds',
  accuracy: 95.3,
  keyFindings: [
    'Strong market demand identified in target segments',
    'Technical architecture validated with minor concerns',
    'Security vulnerabilities detected and categorized',
    'User engagement metrics exceed industry benchmarks',
    'Scalability potential confirmed for growth phases'
  ],
  recommendations: [
    'Implement enhanced data encryption protocols',
    'Consider microservices architecture for scalability',
    'Add comprehensive API authentication',
    'Develop strategic partnerships for market expansion'
  ]
};

const vulnerabilities = [
  { id: 1, title: 'Sensitive Data Exposure', detail: 'AI detected possible exposure of sensitive user data in your idea.' },
  { id: 2, title: 'Insecure API', detail: 'API endpoints lack authentication checks.' },
];

const insights = [
  'Your idea is trending in the AI startup space! Consider adding more security features.',
  'AI suggests integrating with third-party APIs for faster MVP.',
  'Potential for high user engagement based on current analysis.'
];

const Dashboard = () => {
  const { navigateToPage, currentPage } = useComingSoon();
  const [activeVul, setActiveVul] = useState(null);

  const handleDownloadReport = () => {
    // Simulate download functionality
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'AI_Validation_Report_Q4_2024.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      {/* Dashboard Navigation */}
      <div className="bg-white dark:bg-slate-900 shadow-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - click to go home */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigateToPage('home')}
            >
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Startup<span className="text-orange-500">X</span>
              </span>
            </div>
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
              <button
                onClick={() => navigateToPage('profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 'profile'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Profile
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Latest Score</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">95</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Data Processed</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{dataProcessingInsights.totalDataPoints}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Success Rate</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{dataProcessingInsights.accuracy}%</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Processing Time</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{dataProcessingInsights.processingTime}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Latest Validation Score Pie Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Latest Validation Score Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={validationScoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {validationScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1e293b', 
                      color: '#fff', 
                      borderRadius: '8px',
                      border: 'none'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {validationScoreData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Validation Metrics */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-200">AI Validation Metrics</h2>
              <div className="space-y-4">
                {validationMetricsData.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${metric.color}20` }}
                        >
                          <IconComponent 
                            className="w-5 h-5" 
                            style={{ color: metric.color }}
                          />
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {metric.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${metric.score}%`,
                              backgroundColor: metric.color
                            }}
                          ></div>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 min-w-[2rem]">
                          {metric.score}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Overall Score:</span> 87.5/100 - Excellent validation results across all categories
                </p>
              </div>
            </div>
          </div>

          {/* Insights on Latest Submission */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Insights on Latest Submission</h2>
              <button
                onClick={handleDownloadReport}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                For Final Report Download Click Here
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Findings */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Key Findings
                </h3>
                <div className="space-y-3">
                  {dataProcessingInsights.keyFindings.map((finding, index) => (
                    <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <p className="text-slate-700 dark:text-slate-300">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  Recommendations
                </h3>
                <div className="space-y-3">
                  {dataProcessingInsights.recommendations.map((rec, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <p className="text-slate-700 dark:text-slate-300">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Processing Summary */}
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Data Processing Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{dataProcessingInsights.processedSuccessfully}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Successfully Processed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{dataProcessingInsights.failedProcessing}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Failed Processing</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{dataProcessingInsights.accuracy}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Overall Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 