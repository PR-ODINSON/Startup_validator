import React from 'react';
import PieChartSection from './PieChartSection';

export default function OverviewTab({ scoreData, analysis }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Score Breakdown */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
          <PieChartSection data={scoreData} />
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
  );
}
