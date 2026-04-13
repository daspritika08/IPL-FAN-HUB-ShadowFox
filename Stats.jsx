import React from 'react';

const Stats = ({ stats }) => {
  if (!stats) return <div className="pt-40 text-center text-red-500">Failed to load statistics. <button className="underline">Retry</button></div>;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      {/* AC #1: Current Season Overview */}
      <h2 className="text-4xl font-black italic uppercase mb-8">Season <span className="text-red-600">2026 Overview</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
        {[
          { label: "Position", val: `#${stats.currentSeason.position}` },
          { label: "Played", val: stats.currentSeason.played },
          { label: "Wins", val: stats.currentSeason.wins },
          { label: "Losses", val: stats.currentSeason.losses },
          { label: "NRR", val: stats.currentSeason.nrr },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">{item.label}</p>
            <p className="text-3xl font-black text-[#C1A05B]">{item.val}</p>
          </div>
        ))}
      </div>

      {/* AC #2: All-Time Records */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-black italic uppercase mb-6">Hall of <span className="text-red-600">Records</span></h3>
          <div className="space-y-4">
            {stats.allTimeRecords.map((rec) => (
              <div key={rec.label} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border-l-4 border-red-600">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">{rec.label}</p>
                  <p className="text-xl font-black uppercase">{rec.player || rec.vs}</p>
                </div>
                <p className="text-2xl font-black text-[#C1A05B]">{rec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AC #4: Head to Head */}
        <div>
          <h3 className="text-2xl font-black italic uppercase mb-6">Head <span className="text-red-600">to Head</span></h3>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/10 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="p-4">Opponent</th>
                  <th className="p-4">Wins</th>
                  <th className="p-4">Losses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.headToHead.map((h2h) => (
                  <tr key={h2h.opponent} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold">{h2h.opponent}</td>
                    <td className="p-4 text-green-500 font-bold">{h2h.wins}</td>
                    <td className="p-4 text-red-500 font-bold">{h2h.losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;