import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ShareButtons from './ShareButtons';

const NewsDetail = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) return <div className="pt-40 text-center">Article not found.</div>;

  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4">
      <Link to="/news" className="text-red-600 font-bold text-xs uppercase mb-8 inline-block">← Back to Newsroom</Link>
      <ShareButtons title={article.title} url={window.location.href} />
      
      <article>
        <img src={article.image} alt={article.title} className="w-full h-80 object-cover rounded-3xl mb-8" />
        <span className="bg-red-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter">{article.category}</span>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase mt-4 leading-tight">{article.title}</h1>
        
        <div className="flex gap-4 mt-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-6">
          <span>By {article.author}</span>
          <span>•</span>
          <span>Published: {article.date}</span>
        </div>

        <div className="mt-8 text-gray-300 leading-relaxed text-lg italic">
          {article.content}
        </div>
      </article>
    </div>
    
  );
};

export default NewsDetail;