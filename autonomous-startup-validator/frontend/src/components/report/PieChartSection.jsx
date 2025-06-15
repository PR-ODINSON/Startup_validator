import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'];

export default function PieChartSection({ data, title = 'Score Distribution' }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}/100`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
