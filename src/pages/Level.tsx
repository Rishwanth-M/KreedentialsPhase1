import React from 'react';

const Level: React.FC = () => {
  const currentLevel = 7;
  const progress = 65;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Level</h1>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">Current Level: {currentLevel}</h2>
          <span className="text-[#d4ff00] text-xl font-bold">{progress}% to next level</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-[#d4ff00] h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { level: 8, locked: false, points: 450 },
          { level: 9, locked: true, points: 650 },
          { level: 10, locked: true, points: 900 },
        ].map((item) => (
          <div
            key={item.level}
            className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 ${
              item.locked ? 'opacity-50' : ''
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-2">Level {item.level}</h3>
            <p className="text-gray-400 mb-4">{item.points} points required</p>
            <div className={`px-4 py-2 rounded-lg text-center ${
              item.locked ? 'bg-gray-700 text-gray-400' : 'bg-[#d4ff00] text-black font-semibold'
            }`}>
              {item.locked ? 'Locked' : 'Next'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level;
