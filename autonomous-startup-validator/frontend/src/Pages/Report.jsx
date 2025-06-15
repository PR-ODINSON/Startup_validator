// src/pages/Report.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReportHeader from '../components/report/ReportHeader';
import ReportTabs from '../components/report/ReportTabs';
import OverviewTab from '../components/report/OverviewTab';
import MarketTab from '../components/report/MarketTab';
import CompetitionTab from '../components/report/CompetitionTab';
import MVPRoadmapTab from '../components/report/MVPRoadmapTab';
import PitchDeckTab from '../components/report/PitchDeckTab';

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
    // eslint-disable-next-line
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
        <ReportHeader idea={idea} analysis={analysis} />
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="p-6">
            {activeTab === 'overview' && (
              <OverviewTab scoreData={scoreData} analysis={analysis} />
            )}
            {activeTab === 'market' && (
              <MarketTab marketSizeData={marketSizeData} analysis={analysis} />
            )}
            {activeTab === 'competition' && (
              <CompetitionTab competitorAnalysis={analysis.competitorAnalysis} />
            )}
            {activeTab === 'mvp' && (
              <MVPRoadmapTab mvpRoadmap={analysis.mvpRoadmap} />
            )}
            {activeTab === 'pitch' && (
              <PitchDeckTab pitchDeck={analysis.pitchDeck} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
