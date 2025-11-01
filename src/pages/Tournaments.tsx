import React from 'react';

const Tournaments: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Tournaments</h1>
      <div className="space-y-6">
        {[
          { name: 'Summer Championship', date: 'July 15-20, 2025', participants: 256, prize: '$10,000' },
          { name: 'Regional Masters', date: 'August 5-8, 2025', participants: 128, prize: '$5,000' },
          { name: 'Skill Showcase', date: 'September 12-14, 2025', participants: 64, prize: '$2,500' },
        ].map((tournament, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{tournament.name}</h3>
                <p className="text-gray-400">{tournament.date}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-gray-400 text-sm">Participants</p>
                  <p className="text-white font-semibold">{tournament.participants}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Prize Pool</p>
                  <p className="text-[#d4ff00] font-bold">{tournament.prize}</p>
                </div>
                <button className="bg-[#d4ff00] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#c4ef00] transition-colors self-center">
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
