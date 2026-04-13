import React from 'react';

const ShareButtons = ({ title, url }) => {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`
  };

  return (
    <div className="flex items-center gap-4 mt-10 p-4 border-t border-white/10">
      <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Share on:</span>
      <a href={shareLinks.twitter} target="_blank" className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-xs transition-all">𝕏 Twitter</a>
      <a href={shareLinks.whatsapp} target="_blank" className="bg-green-600/10 hover:bg-green-600/20 p-2 rounded-lg text-xs text-green-500 transition-all">WhatsApp</a>
    </div>
  );
};

export default ShareButtons;