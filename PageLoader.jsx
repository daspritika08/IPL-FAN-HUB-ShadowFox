import React from 'react';

const PageLoader = () => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0b]"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-white/10 border-t-red-600 rounded-full animate-spin" />
      <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Loading…</p>
    </div>
  </div>
);

export default PageLoader;
