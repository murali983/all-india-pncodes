
import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              <div className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
                IndiaPIN Finder
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onNavigate('home')}
                className={`${currentView === 'home' ? 'text-indigo-600 font-semibold' : 'text-slate-600'} hover:text-indigo-600 transition-colors`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('browse-state')}
                className={`${currentView === 'browse-state' ? 'text-indigo-600 font-semibold' : 'text-slate-600'} hover:text-indigo-600 transition-colors`}
              >
                Browse States
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`${currentView === 'about' ? 'text-indigo-600 font-semibold' : 'text-slate-600'} hover:text-indigo-600 transition-colors`}
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className={`${currentView === 'contact' ? 'text-indigo-600 font-semibold' : 'text-slate-600'} hover:text-indigo-600 transition-colors`}
              >
                Contact
              </button>
            </nav>
            <div className="md:hidden">
              {/* Mobile Menu Toggle could go here */}
              <button className="p-2 text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold text-white mb-4 block">IndiaPIN Finder</span>
              <p className="max-w-md text-slate-400">
                Providing accurate and up-to-date PIN code and Post Office information for every corner of India. 
                Fast, free, and designed for common users and professionals alike.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('home')} className="hover:text-white">Search PIN</button></li>
                <li><button onClick={() => onNavigate('browse-state')} className="hover:text-white">Browse States</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white">About Us</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-white">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-white">Disclaimer</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2024 IndiaPIN Finder. Not affiliated with India Post.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
