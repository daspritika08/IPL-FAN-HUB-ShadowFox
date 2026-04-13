import { Link } from 'react-router-dom';

const MatchSchedule = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return (
      <div className="p-10 text-center bg-red-900/20 border border-red-600 rounded-xl">
        <p className="text-red-500 font-bold">⚠️ Match data currently unavailable. Please check back later.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20" id="schedule">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-4xl font-black italic uppercase">Match <span className="text-red-600">Center</span></h2>
      </div>

      <div className="grid gap-6">
        {matches.map((match) => (
          <div key={match.id} className={`relative overflow-hidden p-6 rounded-2xl border transition-all ${
            match.status === 'LIVE' ? 'border-red-600 bg-red-600/5 ring-1 ring-red-600' : 'border-white/5 bg-white/5'
          }`}>
            
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                match.status === 'LIVE' ? 'bg-red-600 animate-pulse' : 
                match.status === 'COMPLETED' ? 'bg-gray-700' : 'bg-[#C1A05B] text-black'
              }`}>
                {match.status}
              </span>
              <span className="text-xs text-gray-500 font-bold">{match.date}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Teams & Score */}
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  RCB <span className="text-red-600 italic text-lg">vs</span> {match.opponent}
                </h3>
                {match.score && (
                  <p className="text-xl font-mono font-bold text-white mt-1">{match.score}</p>
                )}
              </div>

              
              <div className="text-right">
                {match.status === 'COMPLETED' ? (
                  <p className="text-[#C1A05B] font-bold italic uppercase text-sm">{match.result}</p>
                ) : (
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-loose">
                    {match.venue} <br/>
                    <span className="text-white">{match.time && `@ ${match.time} IST`}</span>
                  </div>
                )}
              </div>
<Link 
  to={`/match/${match.id}`} 
  className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors text-center"
>
  {match.status === 'COMPLETED' ? 'View Summary' : 'Match Details'}
</Link>
                
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatchSchedule;