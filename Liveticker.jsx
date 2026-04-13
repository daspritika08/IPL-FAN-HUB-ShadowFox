import React from 'react';

const Liveticker = () => {
  return (
    <div className="bg-[#EE2127] text-white py-2 overflow-hidden whitespace-nowrap border-b border-black/20">
      <div className="inline-block animate-marquee flex items-center gap-12" style={{animationPlayState: 'running'}} onMouseEnter={e => e.currentTarget.style.animationPlayState='paused'} onMouseLeave={e => e.currentTarget.style.animationPlayState='running'}>
        <span className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
          LIVE: RCB 182/4 (18.2) vs MI — Kohli 84*(52)
        </span>
        <span className="text-xs font-medium opacity-80 uppercase tracking-widest">
          • Next Match: RCB vs KKR | April 14, 20:00 IST • M. Chinnaswamy Stadium, Bengaluru •
        </span>
        <span className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
          LIVE: RCB 182/4 (18.2) vs MI — Kohli 84*(52)
        </span>
        <span className="text-xs font-medium opacity-80 uppercase tracking-widest">
          • Tickets for Home Games now available on the official app •
        </span>
      </div>
    </div>
  );
};

export default Liveticker;