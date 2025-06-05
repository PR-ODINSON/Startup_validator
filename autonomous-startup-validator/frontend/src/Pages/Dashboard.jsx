import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip as RechartTooltip, ResponsiveContainer } from 'recharts';
import ReactTooltip from 'react-tooltip';

const Dashboard = () => {
  const [processingData, setProcessingData] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [previousIdeas, setPreviousIdeas] = useState([]);

  useEffect(() => {
    // Mock API calls — replace with real API endpoints
    axios.get('/api/processing-data').then(res => setProcessingData(res.data));
    axios.get('/api/submissions').then(res => setSubmissions(res.data));
    axios.get('/api/vulnerabilities').then(res => setVulnerabilities(res.data));
    axios.get('/api/previous-ideas').then(res => setPreviousIdeas(res.data));
  }, []);

  const COLORS = ['#00C49F', '#0088FE', '#FFBB28'];

  const pieData = [
    { name: 'Text Analysis', value: processingData.textAnalysis || 0 },
    { name: 'Code Review', value: processingData.codeReview || 0 },
    { name: 'Data Validation', value: processingData.dataValidation || 0 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-3xl font-semibold mb-4">AI Analysis Dashboard</h2>
      <p className="mb-6 text-gray-500">Monitor AI agent processing and submission analytics</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* AI Processing Data */}
        <div className="bg-yellow-100 rounded-2xl p-4 shadow">
          <h3 className="text-xl font-bold mb-2">AI Processing Data</h3>
          <p className="text-green-600 font-semibold">● Live</p>
          <h4 className="text-3xl font-bold mt-4">{processingData.total || 0}</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Submissions */}
        <div className="bg-yellow-100 rounded-2xl p-4 shadow relative">
          <h3 className="text-xl font-bold mb-4">Recent Submissions</h3>
          {submissions.map((item, i) => (
            <div
              key={i}
              className="mb-3 p-3 bg-white rounded-xl shadow hover:bg-gray-100 transition-all delay-[2000ms]"
              data-tip={`Score: ${item.score}`}
              data-for={`hoverTip-${i}`}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{item.title}</span>
                <span className="text-green-700 font-bold">{item.score}</span>
              </div>
              <p className="text-sm text-gray-500">{item.category}</p>
              <ReactTooltip id={`hoverTip-${i}`} delayShow={2000} />
            </div>
          ))}
        </div>

        {/* Vulnerabilities */}
        <div className="bg-yellow-100 rounded-2xl p-4 shadow">
          <h3 className="text-xl font-bold mb-4">Vulnerabilities</h3>
          {vulnerabilities.length === 0 ? (
            <div className="text-center text-green-700">
              <div className="text-4xl mb-2">✅</div>
              <p>No vulnerabilities detected</p>
              <p className="text-sm text-gray-500">All submissions are secure</p>
            </div>
          ) : (
            <ul className="list-disc pl-5 text-red-600">
              {vulnerabilities.map((vuln, i) => (
                <li key={i}>{vuln.description}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Previous Ideas */}
        <div className="bg-yellow-100 rounded-2xl p-4 shadow">
          <h3 className="text-xl font-bold mb-4">Previous Ideas</h3>
          {previousIdeas.map((file, i) => (
            <a
              key={i}
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow p-3 mb-2 hover:bg-gray-100 transition-all"
            >
              <div className="flex justify-between">
                <span>{file.name}</span>
                <span className="text-sm text-gray-500">{file.size}</span>
              </div>
              <p className="text-sm text-gray-400">{file.date}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
