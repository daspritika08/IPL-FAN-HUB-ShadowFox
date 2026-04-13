import React from 'react';
import { useParams, Link } from 'react-router-dom';

const MatchDetail = ({ matches }) => {
  const { id } = useParams();
  
  // Find the specific match from our data array using the URL ID
  const match = matches.find(m => m.id === parseInt(id));

  if (!match) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-2xl font-bold">Match Not Found</h2>
        <Link to="/schedule" className="text-red-600 underline">Return to Schedule</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      {/* Navigation Back */}
      <Link to="/schedule" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors mb-8 inline-block">
        ← Back to Match Center
      </Link>

      <div className="bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-900/20 to-black p-10 text-center border-b border-white/10">
          <p className="text-[#C1A05B] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            {match.venue} • {match.date}
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <h1 className="text-4xl md:text-6xl font-black italic">RCB</h1>
            <span className="text-red-600 font-black italic text-2xl">VS</span>
            <h1 className="text-4xl md:text-6xl font-black italic">{match.opponent}</h1>
          </div>
          <p className="mt-6 text-3xl font-mono font-bold text-white">
            {match.score || "Upcoming Match"}
          </p>
          <p className="mt-2 text-[#C1A05B] font-bold italic uppercase text-sm">
            {match.result}
          </p>
        </div>

        {/* Detailed Stats Grid (AC #3) */}
        <div className="p-8 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">Toss Info</h3>
            <p className="text-sm">RCB won the toss and elected to <span className="text-red-600 font-bold">Bat First</span>.</p>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">Playing XI</h3>
            <div className="grid grid-cols-2 gap-2 text-[13px] text-gray-400">
              <p>Virat Kohli (C)</p>
              <p>Faf du Plessis</p>
              <p>Glenn Maxwell</p>
              <p>Rajat Patidar</p>
              <p>Dinesh Karthik (WK)</p>
              <p>Mahipal Lomror</p>
              <p>Saurav Chauhan</p>
              <p>Mohammed Siraj</p>
              <p>Reece Topley</p>
              <p>Vijaykumar Vyshak</p>
              <p>Yash Dayal</p>
            </div>
          </div>
        </div>

        {/* Summary (AC #3) */}
        <div className="p-8 bg-white/5 mx-8 mb-8 rounded-2xl">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 text-center">Match Summary</h3>
          <p className="text-gray-300 italic text-sm text-center leading-relaxed">
            "A sensational performance at the Chinnaswamy! The captain led from the front with a blistering half-century, while the bowling unit defended the total with clinical precision in the death overs."
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;