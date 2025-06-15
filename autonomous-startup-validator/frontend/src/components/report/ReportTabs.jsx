import React from 'react';

export default function ReportTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'market', label: 'Market Analysis', icon: '🎯' },
    { id: 'competition', label: 'Competition', icon: '⚔️' },
    { id: 'mvp', label: 'MVP Roadmap', icon: '🛣️' },
    { id: 'pitch', label: 'Pitch Deck', icon: '🎤' }
  ];
  return (
    <nav className="flex space-x-8 px-6 border-b border-gray-200">
      {tabs.map((tab) => (
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
  );
}
