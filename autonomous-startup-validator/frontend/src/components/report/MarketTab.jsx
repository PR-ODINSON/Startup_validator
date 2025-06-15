import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarketTab({ marketSizeData, analysis }) {
  return (
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
  );
}
