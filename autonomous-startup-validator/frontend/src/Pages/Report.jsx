// src/pages/Report.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Report = () => {
  const { ideaId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [analysis, setAnalysis] = useState(null);
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (ideaId) {
      fetchReportData();
    }
  }, [ideaId]);

  const fetchReportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [analysisRes, ideaRes] = await Promise.all([
        axios.get(`/api/analysis/idea/${ideaId}`, config),
        axios.get(`/api/ideas/${ideaId}`, config)
      ]);

      setAnalysis(analysisRes.data);
      setIdea(ideaRes.data);
    } catch (error) {
      setError('Failed to load report data');
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (format = 'pdf') => {
    try {
      setDownloading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`/api/reports/${ideaId}/download?format=${format}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `startup-analysis-${ideaId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your analysis report...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Report not found'}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'];

  const scoreData = [
    { name: 'Market Potential', value: analysis.scores.marketPotential, color: '#10B981' },
    { name: 'Competition', value: analysis.scores.competition, color: '#F59E0B' },
    { name: 'Technical Feasibility', value: analysis.scores.technicalFeasibility, color: '#3B82F6' },
    { name: 'Business Model', value: analysis.scores.businessModel, color: '#8B5CF6' }
  ];

  const marketSizeData = [
    { name: 'TAM', value: analysis.marketAnalysis.tam, label: 'Total Addressable Market' },
    { name: 'SAM', value: analysis.marketAnalysis.sam, label: 'Serviceable Addressable Market' },
    { name: 'SOM', value: analysis.marketAnalysis.som, label: 'Serviceable Obtainable Market' }
  ];

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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => downloadReport('pdf')}
                disabled={downloading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {downloading ? '⏳ Downloading...' : '📥 Download Report'}
              </button>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Header */}
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

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'market', label: 'Market Analysis', icon: '🎯' },
                { id: 'competition', label: 'Competition', icon: '⚔️' },
                { id: 'mvp', label: 'MVP Roadmap', icon: '🛣️' },
                { id: 'pitch', label: 'Pitch Deck', icon: '🎤' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Score Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
                    <div className="space-y-4">
                      {scoreData.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{item.name}</span>
                            <span className="text-sm text-gray-600">{item.value}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ width: `${item.value}%`, backgroundColor: item.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                    <div className="space-y-3">
                      {analysis.marketAnalysis.insights.map((insight, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-sm">{insight}</span>
                        </div>
                      ))}
                      {analysis.vulnerabilities.map((vulnerability, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">❌</span>
                          <span className="text-sm">{vulnerability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
                  <div className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">💡</span>
                        <span className="text-sm text-gray-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Market Analysis Tab */}
            {activeTab === 'market' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Market Size Analysis</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={marketSizeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}M`, 'Market Size']} />
                        <Bar dataKey="value" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Market Trends</h3>
                    <div className="space-y-4">
                      {analysis.marketAnalysis.trends.map((trend, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium">{trend}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Competition Tab */}
            {activeTab === 'competition' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Competitive Landscape</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analysis.competitorAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="strength" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {analysis.competitorAnalysis.map((competitor, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-2">{competitor.name}</h4>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Strength Score</span>
                        <span className="font-medium">{competitor.strength}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${competitor.strength}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Key Weakness:</strong> {competitor.weakness}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MVP Roadmap Tab */}
            {activeTab === 'mvp' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-6">MVP Development Roadmap</h3>
                  <div className="space-y-6">
                    {analysis.mvpRoadmap.map((phase, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-6">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                          <span className="ml-2 text-sm text-gray-600">- {phase.title}</span>
                          <span className="ml-auto text-sm text-blue-600">{phase.timeline}</span>
                        </div>
                        <div className="space-y-1">
                          {phase.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center text-sm text-gray-600">
                              <span className="mr-2">•</span>
                              {task}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pitch Deck Tab */}
            {activeTab === 'pitch' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">AI-Generated Pitch Deck Outline</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.pitchDeck.map((slide, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                            Slide {slide.slide}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{slide.title}</h4>
                        <p className="text-sm text-gray-600">{slide.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
