import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CompetitionTab({ competitorAnalysis }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Competitive Landscape</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={competitorAnalysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="strength" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {competitorAnalysis.map((competitor, index) => (
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
  );
}
