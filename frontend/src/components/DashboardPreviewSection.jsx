import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const pieData = [
  { name: 'Processed', value: 60 },
  { name: 'Pending', value: 30 },
  { name: 'Failed', value: 10 },
];
const COLORS = ['#34d399', '#fbbf24', '#f87171'];

const DashboardPreviewSection = () => (
  <section className="py-16 bg-gradient-to-br from-orange-50 to-slate-100 dark:from-orange-900 dark:to-slate-900">
    <div className="container-custom mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">See Your AI Dashboard in Action</h2>
        <p className="mb-6 text-lg text-slate-700 dark:text-slate-300 max-w-xl">
          Get instant insights, track your validation scores, spot vulnerabilities, and receive smart AI recommendations—all in one beautiful dashboard. Here's a sneak peek of what you'll get as a user!
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 w-80">
          <PieChart width={220} height={180}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-4 text-center">
            <span className="block text-lg font-semibold text-slate-800 dark:text-slate-200">AI Processed Data</span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">Interactive, insightful, and always up-to-date.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPreviewSection; 