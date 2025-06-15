import React from 'react';

export default function MVPRoadmapTab({ mvpRoadmap }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">MVP Development Roadmap</h3>
        <div className="space-y-6">
          {mvpRoadmap.map((phase, index) => (
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
  );
}
