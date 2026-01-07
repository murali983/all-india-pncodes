
import React, { useState, useEffect, useRef } from 'react';
import { searchPostOffices } from '../services/dataService';
import { PostOffice } from '../types';

interface SearchSectionProps {
  onSelect: (po: PostOffice) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostOffice[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 3) {
      setIsSearching(true);
      const filtered = searchPostOffices(query);
      setResults(filtered);
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto relative px-4">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter PIN Code, Area, or Post Office Name..."
          className="w-full h-16 px-6 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-lg group-hover:border-slate-300"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {isSearching && (
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          )}
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-96 overflow-y-auto z-40 animate-in fade-in slide-in-from-top-4">
          {results.map((po) => (
            <button
              key={po.id}
              onClick={() => onSelect(po)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-slate-800">{po.name} - {po.pincode}</p>
                <p className="text-sm text-slate-500">{po.taluk}, {po.district}, {po.state}</p>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
                {po.officeType}
              </span>
            </button>
          ))}
        </div>
      )}

      {query.length >= 3 && results.length === 0 && !isSearching && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-8 text-center z-40">
          <p className="text-slate-500">No results found for "{query}".</p>
          <p className="text-xs text-slate-400 mt-2">Try searching by state or district instead.</p>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
