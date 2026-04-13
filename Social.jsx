import React from 'react';

const Social = ({ posts }) => {
  // AC #4: Fallback logic (simulated by checking if posts exists)
  if (!posts || posts.length === 0) {
    return (
      <div className="pt-40 text-center px-4">
        <div className="bg-white/5 border border-dashed border-white/20 p-10 rounded-3xl">
          <p className="text-gray-400 mb-4">Oops! We couldn't fetch the social feed.</p>
          <a href="https://twitter.com/RCBTweets" target="_blank" className="text-red-600 font-black uppercase underline tracking-widest">
            Visit Official @RCBTweets →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-black italic uppercase mb-12">Social <span className="text-red-600">Feed</span></h2>
      
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-black">R</div>
                  <div>
                    <p className="text-sm font-black tracking-tight">{post.handle}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{post.platform} • {post.timestamp}</p>
                  </div>
                </div>
                <div className="text-gray-600">
                   {post.platform === 'X' ? '𝕏' : '📸'}
                </div>
              </div>

              <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                {post.content}
              </p>

              <div className="flex gap-6 pt-4 border-t border-white/5">
                <span className="text-[10px] font-black uppercase text-gray-500">❤️ {post.likes}</span>
                <span className="text-[10px] font-black uppercase text-gray-500">
                  {post.platform === 'X' ? `🔁 ${post.retweets}` : `💬 ${post.comments}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Social;