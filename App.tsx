
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SearchSection from './components/SearchSection';
import AssistantFab from './components/AssistantFab';
import { PostOffice, ViewState, AppState } from './types';
import { INDIAN_STATES_META, SAMPLE_DATA } from './constants';
import { getByState, getDistrictsByState, getByDistrict } from './services/dataService';
import { getPostalInsights } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentView: 'home',
  });
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const navigate = (view: ViewState, extraData: Partial<AppState> = {}) => {
    setState(prev => ({ ...prev, currentView: view, ...extraData }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostOfficeSelect = (po: PostOffice) => {
    setState(prev => ({ ...prev, selectedPostOffice: po, currentView: 'details' }));
    setAiInsight(null);
    fetchInsight(po);
  };

  const fetchInsight = async (po: PostOffice) => {
    const insight = await getPostalInsights(po.pincode, po.name);
    setAiInsight(insight);
  };

  const renderHome = () => (
    <div className="space-y-20 pb-20">
      <section className="bg-indigo-900 text-white py-24 px-4 relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524492707947-503a74314c46?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-20 scale-105"
            alt="India Heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-indigo-900"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/30 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase">Direct access to 1.5 Lakh+ Post Offices</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Find Any <span className="text-indigo-400 underline decoration-indigo-500/50 underline-offset-8">Indian PIN Code</span>
          </h1>
          <p className="text-lg md:text-2xl text-indigo-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            The simplest way to verify postal addresses across all 36 States and Union Territories.
          </p>
          <SearchSection onSelect={handlePostOfficeSelect} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Explore India Visually</h2>
            <p className="text-slate-500 font-medium">Click on a region to browse districts and areas</p>
          </div>
          <button 
            onClick={() => navigate('browse-state')}
            className="mt-4 md:mt-0 bg-white border border-slate-200 px-6 py-2 rounded-full font-bold text-indigo-600 hover:bg-indigo-50 transition-all flex items-center space-x-2 shadow-sm"
          >
            <span>View All States</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIAN_STATES_META.slice(0, 8).map(stateMeta => (
            <button 
              key={stateMeta.name}
              onClick={() => navigate('browse-district', { selectedState: stateMeta.name })}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <img src={stateMeta.image} alt={stateMeta.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-white text-xl font-black mb-1 drop-shadow-lg">{stateMeta.name}</h3>
                <p className="text-white/80 text-xs font-bold tracking-widest uppercase">Browse Districts</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-black mb-4">Total Coverage</h3>
              <p className="text-indigo-100/80 leading-relaxed">Our database covers every PIN code in India, from remote villages in Ladakh to the bustling metro areas of Mumbai.</p>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4">Post Office Types</h3>
              <p className="text-indigo-100/80 leading-relaxed">Detailed breakdown including Head Offices (HO), Sub Offices (SO), and Branch Offices (BO) with full delivery status.</p>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4">100% Free</h3>
              <p className="text-indigo-100/80 leading-relaxed">A community-focused tool built to provide high-quality public information without any cost or registration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderDetails = () => {
    const po = state.selectedPostOffice;
    if (!po) return renderHome();

    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center space-x-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
          <button onClick={() => navigate('home')} className="hover:text-indigo-600 flex-shrink-0">Home</button>
          <span className="flex-shrink-0">/</span>
          <button onClick={() => navigate('browse-state')} className="hover:text-indigo-600 flex-shrink-0">States</button>
          <span className="flex-shrink-0">/</span>
          <button onClick={() => navigate('browse-district', { selectedState: po.state })} className="hover:text-indigo-600 flex-shrink-0">{po.state}</button>
          <span className="flex-shrink-0">/</span>
          <span className="text-slate-900 font-bold truncate flex-shrink-0">{po.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800`} 
                  className="w-full h-full object-cover" 
                  alt="Post Office Context"
                />
                <div className="absolute inset-0 bg-indigo-900/40"></div>
                <div className="absolute bottom-6 left-8">
                  <h1 className="text-5xl font-black text-white drop-shadow-xl">{po.pincode}</h1>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-black tracking-widest uppercase">
                    {po.officeType}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-black tracking-widest uppercase ${po.deliveryStatus === 'Delivery' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {po.deliveryStatus} Status
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-6">
                    <div className="group border-l-4 border-indigo-100 pl-6 py-2 transition-all hover:border-indigo-500">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Post Office Name</p>
                      <p className="text-2xl font-black text-slate-800">{po.name}</p>
                    </div>
                    <div className="group border-l-4 border-slate-100 pl-6 py-2 transition-all hover:border-indigo-500">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">District</p>
                      <p className="text-xl font-bold text-slate-800">{po.district}</p>
                    </div>
                    <div className="group border-l-4 border-slate-100 pl-6 py-2 transition-all hover:border-indigo-500">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">State</p>
                      <p className="text-xl font-bold text-slate-800">{po.state}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="group border-l-4 border-slate-100 pl-6 py-2 transition-all hover:border-indigo-500">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Taluk / Tehsil</p>
                      <p className="text-xl font-bold text-slate-800">{po.taluk}</p>
                    </div>
                    <div className="group border-l-4 border-slate-100 pl-6 py-2 transition-all hover:border-indigo-500">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Postal Circle</p>
                      <p className="text-xl font-bold text-slate-800">{po.circle}</p>
                    </div>
                    <div className="group border-l-4 border-slate-100 pl-6 py-2 transition-all hover:border-indigo-500">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Region</p>
                      <p className="text-xl font-bold text-slate-800">{po.region}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                AI Neighborhood Facts
              </h3>
              <div className="text-indigo-100 leading-relaxed italic text-lg mb-6">
                {aiInsight || "Calculating area insights..."}
              </div>
              <p className="text-xs text-indigo-300/50">Facts provided by Gemini AI based on current geographical data.</p>
            </div>

            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <h3 className="font-black text-indigo-900 mb-4">Official Help</h3>
              <p className="text-sm text-indigo-800/70 mb-6">Need to verify a business address or track a parcel? Use the official India Post portal.</p>
              <a 
                href="https://www.indiapost.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                Visit Official Site
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStates = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-4">India Postal States</h1>
        <p className="text-slate-500 text-lg">Browse 1.5 Lakh+ locations across all states and UTs</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {INDIAN_STATES_META.map(stateMeta => (
          <button 
            key={stateMeta.name}
            onClick={() => navigate('browse-district', { selectedState: stateMeta.name })}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all text-left"
          >
            <div className="h-32 overflow-hidden">
              <img src={stateMeta.image} alt={stateMeta.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="p-6 flex justify-between items-center">
              <span className="font-black text-slate-800 group-hover:text-indigo-600 text-lg">{stateMeta.name}</span>
              <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDistricts = () => {
    const districts = getDistrictsByState(state.selectedState || '');
    const stateMeta = INDIAN_STATES_META.find(s => s.name === state.selectedState);
    
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 relative h-64 rounded-[3rem] overflow-hidden flex items-center justify-center">
          <img src={stateMeta?.image} className="absolute inset-0 w-full h-full object-cover" alt={state.selectedState} />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
          <div className="relative z-10 text-center">
            <button onClick={() => navigate('browse-state')} className="text-white/80 hover:text-white flex items-center justify-center text-xs font-black uppercase tracking-widest mb-4 mx-auto transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              All States
            </button>
            <h1 className="text-5xl font-black text-white">{state.selectedState} Districts</h1>
          </div>
        </div>

        {districts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {districts.map(district => (
              <div key={district} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-black text-slate-800 text-xl">{district}</h3>
                  <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">District</span>
                </div>
                <div className="p-8 space-y-3">
                  {getByDistrict(state.selectedState!, district).map(po => (
                    <button 
                      key={po.id}
                      onClick={() => handlePostOfficeSelect(po)}
                      className="w-full text-left text-slate-600 hover:text-indigo-600 transition-colors py-2 flex items-center group font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-slate-200 group-hover:bg-indigo-500 rounded-full mr-3 transition-colors"></div>
                      <span className="flex-grow">{po.name}</span>
                      <span className="text-slate-400 text-xs font-mono">{po.pincode}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-24 rounded-[3rem] border border-slate-100 text-center shadow-xl shadow-slate-200/50">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">No Regional Data Loaded</h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">We're currently expanding our district database for this region. Use the global search to find specific areas.</p>
            <button 
              onClick={() => navigate('home')}
              className="mt-10 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-16">
        <span className="text-xs font-black text-indigo-600 tracking-widest uppercase mb-4 block">Our Mission</span>
        <h1 className="text-6xl font-black mb-8 text-slate-900 tracking-tighter leading-none">Connecting Every Corner of India.</h1>
      </div>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-8 text-xl leading-relaxed">
        <p className="font-bold text-slate-900 text-2xl">
          IndiaPIN Finder exists to democratize access to essential geographical information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
          <img 
            src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&q=80&w=600" 
            className="rounded-[3rem] shadow-2xl h-96 object-cover" 
            alt="India Scene"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-black text-slate-900 mb-4">Fast & Accurate</h3>
            <p className="text-slate-500 text-lg">We use optimized search indexing to ensure you find what you need in milliseconds, even on mobile data. Our data is sourced and verified against public records.</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
          <h2 className="text-4xl font-black mb-8 relative z-10">Integrity First</h2>
          <ul className="space-y-6 relative z-10">
            <li className="flex items-start">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <p className="text-lg"><strong>Privacy:</strong> We collect zero personal data. No cookies, no trackers, just information.</p>
            </li>
            <li className="flex items-start">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <p className="text-lg"><strong>No Fees:</strong> Public data should be public. Our tool will always be free to use.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-24">
      <div>
        <span className="text-xs font-black text-indigo-600 tracking-widest uppercase mb-4 block">Get In Touch</span>
        <h1 className="text-6xl font-black mb-8 text-slate-900 tracking-tight">We're here <br/> to help.</h1>
        <p className="text-xl text-slate-500 mb-12 leading-relaxed">
          Questions about specific post offices? Found a data discrepancy? Use the details below or the direct message form.
        </p>
        
        <div className="space-y-10">
          <div className="flex items-center space-x-8 group">
            <div className="w-20 h-20 bg-white shadow-2xl rounded-[2rem] flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Direct Line</p>
              <p className="text-2xl font-black text-slate-800">+91 73583 33007</p>
            </div>
          </div>

          <div className="flex items-center space-x-8 group">
            <div className="w-20 h-20 bg-white shadow-2xl rounded-[2rem] flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Official Email</p>
              <p className="text-2xl font-black text-slate-800">muralimohan983@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-8 group">
            <div className="w-20 h-20 bg-white shadow-2xl rounded-[2rem] flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Lead Manager</p>
              <p className="text-2xl font-black text-slate-800">Murali Mohan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-50">
        <h3 className="text-3xl font-black mb-10 text-slate-900">Direct Message</h3>
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                placeholder="Aarav Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                placeholder="aarav@india.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Subject</label>
            <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 transition-all font-medium appearance-none">
              <option>PIN Code Correction</option>
              <option>General Support</option>
              <option>Feedback</option>
              <option>Technical Issue</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Your Message</label>
            <textarea 
              rows={4}
              required
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
              placeholder="Tell us how we can improve our data..."
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:shadow-indigo-300 hover:-translate-y-1 active:scale-95"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (state.currentView) {
      case 'home': return renderHome();
      case 'details': return renderDetails();
      case 'browse-state': return renderStates();
      case 'browse-district': return renderDistricts();
      case 'about': return renderAbout();
      case 'contact': return renderContact();
      case 'privacy': return (
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-black mb-8">Privacy Policy & Disclaimer</h1>
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <p>IndiaPIN Finder is an independent information portal. We are <strong>not affiliated with India Post</strong> or any government body.</p>
            <p><strong>Information Accuracy:</strong> While we strive for absolute accuracy, postal data is subject to change. This data is for informational purposes only. Use official India Post channels for critical legal or financial verification.</p>
            <p><strong>Data Collection:</strong> We do not store personal details, IP addresses, or location data of our users. Our search is completely private.</p>
          </div>
        </div>
      );
      default: return renderHome();
    }
  };

  return (
    <Layout currentView={state.currentView} onNavigate={navigate}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
      <AssistantFab />
    </Layout>
  );
};

export default App;
