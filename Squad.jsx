import React from 'react';
import PlayerCard from './Playercard';

const Squad = ({ players }) => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-5xl font-black italic uppercase mb-10">
        The <span className="text-red-600">Squad</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {players.map(player => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>
    </div>
  );
};

export default Squad;