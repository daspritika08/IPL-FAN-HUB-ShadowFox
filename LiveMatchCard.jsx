import React from 'react';

const LiveMatchCard = ({ match }) => {
  if (!match) return null;

  // AC #6: Fallback if data is missing
  if (match.error) {
    return (
      <div className="bg-red-900/20 border border-red-600 p-4 rounded-xl text-center">
        <p className="text-red-500 text-xs font-bold uppercase">Live updates temporarily unavailable. Last Score: {match.runs}/{match.wickets}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-red-600/30 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header with Live Indicator (AC #4) */}
      <div className="bg-red-600 px-6 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Match</span>
        </div>
        <span className="text-[10px] font-bold text-white/80 uppercase">IPL 2026 • Wankhede</span>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-black italic">RCB</h3>
            <p className="text-4xl font-mono font-bold mt-2">
              {match.runs}/{match.wickets} <span className="text-gray-500 text-lg">({match.overs})</span>
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-3xl font-black italic text-gray-600">{match.opponent}</h3>
            <p className="text-xs font-bold text-[#C1A05B] mt-2 uppercase">RR: {match.nrr}</p>
          </div>
        </div>

        {/* AC #2: Batter and Bowler Figures */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Batting</p>
            <p className="text-sm font-bold">{match.batter}*</p>
            <p className="text-xl font-black text-red-500">{match.batterRuns}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Bowling</p>
            <p className="text-sm font-bold">{match.bowler}</p>
            <p className="text-xl font-black text-gray-300">2/24 (3.0)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatchCard;