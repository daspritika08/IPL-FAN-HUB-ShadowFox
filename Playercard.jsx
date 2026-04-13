import React from 'react';

const PlayerCard = ({ name, role, image, jerseyNumber }) => {
  const rcbRed = "#EE2127";
  const rcbGold = "#C1A05B";

  return (
    <div className="group relative bg-[#121212] rounded-xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-500 shadow-2xl">
      {/* Background Jersey Number (Big and Faint) */}
      <div className="absolute top-2 left-2 text-7xl font-black text-white/5 select-none group-hover:text-red-600/10 transition-colors">
        {jerseyNumber}
      </div>

      {/* Player Image Area */}
      <div className="h-72 flex items-center justify-center overflow-hidden bg-gradient-to-t from-black to-transparent">
        <img 
          src={image} 
          alt={name} 
          className="h-full object-contain pt-4 group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* Info Section */}
      <div className="p-6 bg-black/40 backdrop-blur-md border-t-2" style={{ borderColor: rcbRed }}>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: rcbGold }}>
          {role}
        </p>
        <h3 className="text-2xl font-black italic uppercase tracking-tighter mt-1">
          {name}
        </h3>
        
        <div className="mt-4 flex gap-2">
          <div className="h-1 w-12 bg-red-600 rounded-full"></div>
          <div className="h-1 w-4 bg-[#C1A05B] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;