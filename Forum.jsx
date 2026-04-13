import React, { useState } from 'react';

const Forum = ({ initialThreads, isLoggedIn }) => {
  const [threads, setThreads] = useState(initialThreads);
  const [searchQuery, setSearchQuery] = useState("");
  const [newThread, setNewThread] = useState({ title: "", content: "", category: "General RCB Chat" });

  // AC #5: Search Logic
  const filteredThreads = threads.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePostThread = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert("Please login to post!");
    
    // AC #6: Validation
    if (!newThread.title.trim() || !newThread.content.trim()) {
      return alert("Thread title and content cannot be empty!");
    }

    const threadObj = {
      id: Date.now(),
      ...newThread,
      author: "Pritika_Das", // Simulated from login
      timestamp: new Date().toLocaleString(),
      replies: []
    };

    setThreads([threadObj, ...threads]);
    setNewThread({ title: "", content: "", category: "General RCB Chat" });
  };

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-4xl font-black italic uppercase italic">Fan <span className="text-red-600">Forum</span></h2>
        
        {/* AC #5: Search Bar */}
        <input 
          type="text" 
          placeholder="Search discussions..." 
          className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm w-full md:w-64 focus:border-red-600 outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* New Thread Form (AC #2) */}
      {isLoggedIn && (
        <form onSubmit={handlePostThread} className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-12">
          <h3 className="text-sm font-black uppercase mb-4 text-red-600">Start a Discussion</h3>
          <div className="grid gap-4">
            <input 
              type="text" placeholder="Thread Title" 
              className="bg-black border border-white/10 p-3 rounded text-sm"
              value={newThread.title}
              onChange={(e) => setNewThread({...newThread, title: e.target.value})}
            />
            <select 
              className="bg-black border border-white/10 p-3 rounded text-sm text-gray-400"
              value={newThread.category}
              onChange={(e) => setNewThread({...newThread, category: e.target.value})}
            >
              <option>Match Discussion</option>
              <option>Player Talk</option>
              <option>General RCB Chat</option>
            </select>
            <textarea 
              placeholder="What's on your mind?" 
              className="bg-black border border-white/10 p-3 rounded text-sm h-24"
              value={newThread.content}
              onChange={(e) => setNewThread({...newThread, content: e.target.value})}
            ></textarea>
            <button className="bg-red-600 hover:bg-red-700 py-2 rounded font-bold uppercase text-xs tracking-widest transition-colors">
              Post Thread
            </button>
          </div>
        </form>
      )}

      {/* AC #1 & #4: Thread List */}
      <div className="space-y-6">
        {filteredThreads.map(thread => (
          <div key={thread.id} className="bg-[#121212] p-6 rounded-2xl border border-white/5 hover:border-red-600/30 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-[#C1A05B] uppercase tracking-widest">{thread.category}</span>
              <span className="text-[10px] text-gray-500">{thread.timestamp}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{thread.title}</h3>
            <p className="text-gray-400 text-sm mb-4">Post by <span className="text-white font-bold">{thread.author}</span></p>
            <p className="text-gray-300 text-sm italic border-l-2 border-red-600 pl-4 mb-6">{thread.content}</p>
            
            {/* AC #3: Replies Section */}
            <div className="bg-black/40 p-4 rounded-xl">
              <p className="text-[10px] font-black uppercase text-gray-600 mb-4">{thread.replies.length} Replies</p>
              {thread.replies.map(reply => (
                <div key={reply.id} className="border-t border-white/5 py-3 first:border-0">
                  <p className="text-xs text-gray-400 mb-1"><span className="text-white font-bold">{reply.author}</span> • {reply.timestamp}</p>
                  <p className="text-sm text-gray-300">{reply.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;