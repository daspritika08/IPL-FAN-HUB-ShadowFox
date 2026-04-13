import React, { useState } from 'react';

const Polls = ({ pollsData, isLoggedIn }) => {
  const [polls, setPolls] = useState(pollsData);
  const [userVotes, setUserVotes] = useState({}); // Tracking user votes locally

  const handleVote = (pollId, optionId) => {
    if (!isLoggedIn) {
      alert("Please login to participate in the fan polls!");
      return;
    }

    if (userVotes[pollId]) {
      alert("You have already cast your vote for this poll.");
      return;
    }

    // Update the poll results
    const updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(opt => 
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return { ...poll, options: updatedOptions, totalVotes: poll.totalVotes + 1 };
      }
      return poll;
    });

    setPolls(updatedPolls);
    setUserVotes({ ...userVotes, [pollId]: optionId });
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-black italic uppercase mb-12">Fan <span className="text-red-600">Voice</span></h2>
      
      <div className="space-y-10">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-[#121212] border border-white/10 p-8 rounded-3xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className={`px-3 py-1 rounded text-[10px] font-black uppercase ${
                poll.status === 'ACTIVE' ? 'bg-green-600' : 'bg-gray-700'
              }`}>
                {poll.status}
              </span>
              <span className="text-xs text-gray-500 font-bold uppercase">{poll.totalVotes} Votes Cast</span>
            </div>

            <h3 className="text-2xl font-bold mb-8 italic">"{poll.question}"</h3>

            <div className="space-y-4">
              {poll.options.map((option) => {
                const percentage = ((option.votes / poll.totalVotes) * 100).toFixed(1);
                const hasVoted = !!userVotes[poll.id];

                return (
                  <div key={option.id} className="relative">
                    <button
                      disabled={poll.status === 'CLOSED' || hasVoted}
                      onClick={() => handleVote(poll.id, option.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        userVotes[poll.id] === option.id ? 'border-red-600 bg-red-600/10' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {/* AC #2: Visual Percentage Bar */}
                      {(hasVoted || poll.status === 'CLOSED') && (
                        <div 
                          className="absolute left-0 top-0 h-full bg-white/5 transition-all duration-1000" 
                          style={{ width: `${percentage}%` }}
                        />
                      )}

                      <div className="relative flex justify-between items-center">
                        <span className="font-bold">{option.text}</span>
                        {(hasVoted || poll.status === 'CLOSED') && (
                          <span className="text-[#C1A05B] font-black">{percentage}%</span>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {!isLoggedIn && (
              <p className="mt-6 text-center text-xs text-gray-500 uppercase font-bold tracking-widest">
                Log in to cast your vote
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Polls;