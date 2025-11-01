import React from 'react';

const Metrics: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Points', value: '1,247' },
          { label: 'Training Hours', value: '156' },
          { label: 'Challenges Won', value: '23' },
          { label: 'Current Streak', value: '12 days' },
        ].map((metric, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
            <p className="text-3xl font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Performance Chart</h2>
        <div className="w-full h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization area</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
