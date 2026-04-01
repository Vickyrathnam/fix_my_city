import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* TopAppBar Component */}
      <header className="bg-[#fbf9f8] fixed top-0 w-full z-50 transition-opacity">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#1A73E8]" style={{fontSize: '28px'}}>gavel</span>
            <h1 className="font-headline font-extrabold text-2xl tracking-tighter text-[#1A73E8]">CivicWatch</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:opacity-80 transition-opacity active:scale-95 duration-150">
              <span className="material-symbols-outlined text-gray-500">notifications</span>
            </button>
            <div className="hidden md:flex gap-6 items-center">
              <Link className="font-body font-medium text-[#1A73E8]" to="/">Home</Link>
              <Link className="font-body font-medium text-gray-500 hover:opacity-80" to="/map">Map</Link>
              <Link className="font-body font-medium text-gray-500 hover:opacity-80" to="/report-issue">Report</Link>
              <Link className="font-body font-medium text-gray-500 hover:opacity-80" to="/login">Account</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Hero / Asymmetric Welcome Section */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <div className="md:col-span-2">
            <h2 className="font-headline font-extrabold text-5xl md:text-6xl tracking-tight text-on-surface mb-4">
              Your city, <br/><span className="text-primary">transparently</span> managed.
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl">
              CivicWatch connects you directly with local maintenance teams. Track reports, see health metrics, and build a better neighborhood together.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Live Status</p>
              <div className="flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </div>
                <span className="font-semibold text-on-surface">12 active reports in your zone</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
          {/* Area Health Score Card */}
          <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between group hover:shadow-[0_20px_40px_rgba(0,91,192,0.06)] transition-all duration-300 border border-outline-variant/30">
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-headline font-bold text-2xl mb-1">Area Health Score</h3>
                  <p className="text-on-surface-variant text-sm">Downtown District • Updated 2m ago</p>
                </div>
                <div className="bg-secondary-container px-4 py-2 rounded-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                  <span className="font-bold text-on-secondary-container">Optimal</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-7xl font-extrabold tracking-tighter text-on-surface">84</span>
                <span className="text-2xl font-bold text-on-surface-variant">/100</span>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden mb-8">
                <div className="bg-secondary h-full w-[84%]"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <p className="text-xs text-on-surface-variant font-medium mb-1 uppercase">Pothole Repair Time</p>
                <p className="text-xl font-bold">3.2 Days</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <p className="text-xs text-on-surface-variant font-medium mb-1 uppercase">Public Lighting</p>
                <p className="text-xl font-bold">98% Up</p>
              </div>
            </div>
          </div>

          {/* Quick Action: Map Peek */}
          <div className="md:col-span-2 bg-surface-container-high rounded-xl relative overflow-hidden h-64 md:h-auto group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl text-primary mb-4">map</span>
                <h3 className="text-xl font-bold text-on-surface">Interactive Map</h3>
                <p className="text-on-surface-variant text-sm">View all reported issues</p>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <span className="text-on-surface font-bold text-xl">Interactive Map</span>
              <Link 
                to="/map"
                className="bg-white/20 backdrop-blur-md text-on-surface px-4 py-2 rounded-xl font-semibold border border-white/30"
              >
                Explore Area
              </Link>
            </div>
          </div>

          {/* Mini Stat: Community Engagement */}
          <div className="bg-tertiary-fixed rounded-xl p-6 flex flex-col justify-center">
            <span className="material-symbols-outlined text-tertiary text-4xl mb-3">groups</span>
            <p className="text-on-tertiary-fixed font-bold text-2xl">1,240</p>
            <p className="text-on-tertiary-fixed-variant text-xs font-medium uppercase tracking-wider">Active Neighbors</p>
          </div>

          {/* Mini Stat: Resolved This Month */}
          <div className="bg-primary-fixed rounded-xl p-6 flex flex-col justify-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-3">task_alt</span>
            <p className="text-on-primary-fixed font-bold text-2xl">48</p>
            <p className="text-on-primary-fixed-variant text-xs font-medium uppercase tracking-wider">Issues Fixed</p>
          </div>
        </div>

        {/* Recent Issues Section */}
        <section className="mt-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="font-headline font-bold text-3xl mb-1">Recent Issues Near You</h3>
              <p className="text-on-surface-variant">Stay informed about your local environment</p>
            </div>
            <Link to="/dashboard" className="text-primary font-bold flex items-center gap-1 group">
              View All <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Issue Item 1 */}
            <div className="bg-surface-container-low hover:bg-surface-container-lowest transition-all p-5 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 group cursor-pointer border border-transparent hover:border-outline-variant/20 shadow-sm">
              <div className="w-full md:w-24 h-48 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-gray-600">broken_image</span>
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded">Infrastructure</span>
                  <span className="text-on-surface-variant text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> 15m ago
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-1">Severe Pothole on 5th Ave</h4>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">Corner of 5th and Main, near the park entrance. Multiple vehicles affected by the deep crater.</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                    <span className="material-symbols-outlined text-base">forum</span> 4 comments
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                    <span className="material-symbols-outlined text-base">thumb_up</span> 24 votes
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-3 md:pt-0 md:pl-6">
                <span className="text-xs font-bold text-on-error-container bg-error-container px-3 py-1.5 rounded-full">Urgent</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Reported</span>
              </div>
            </div>

            {/* Issue Item 2 */}
            <div className="bg-surface-container-low hover:bg-surface-container-lowest transition-all p-5 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 group cursor-pointer border border-transparent hover:border-outline-variant/20 shadow-sm">
              <div className="w-full md:w-24 h-48 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-yellow-700">lightbulb</span>
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-fixed px-2 py-0.5 rounded">Public Lighting</span>
                  <span className="text-on-surface-variant text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> 2h ago
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-1">Damaged Street Lamp</h4>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">Lamp ID #2041 is leaning precariously after last night's windstorm. Safety hazard for pedestrians.</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                    <span className="material-symbols-outlined text-base">forum</span> 12 comments
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                    <span className="material-symbols-outlined text-base">thumb_up</span> 89 votes
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-3 md:pt-0 md:pl-6">
                <span className="text-xs font-bold text-on-secondary-container bg-secondary-container px-3 py-1.5 rounded-full">Investigating</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">In Progress</span>
              </div>
            </div>

            {/* Issue Item 3 */}
            <div className="bg-surface-container-low hover:bg-surface-container-lowest transition-all p-5 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 group cursor-pointer border border-transparent hover:border-outline-variant/20 shadow-sm">
              <div className="w-full md:w-24 h-48 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-green-700">delete</span>
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary-fixed-dim px-2 py-0.5 rounded">Sanitation</span>
                  <span className="text-on-surface-variant text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> 5h ago
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-1">Missed Recycling Collection</h4>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">Central Park bins are overflowing after the weekend festival. Needs immediate pickup.</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                    <span className="material-symbols-outlined text-base">forum</span> 2 comments
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                    <span className="material-symbols-outlined text-base">thumb_up</span> 15 votes
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-3 md:pt-0 md:pl-6">
                <span className="text-xs font-bold text-on-primary-container bg-primary-container px-3 py-1.5 rounded-full">Received</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Queued</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-surface-container-lowest mt-12 mb-24 md:mb-0 border-t border-outline-variant/20 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{fontSize: '32px'}}>gavel</span>
              <h2 className="font-headline font-extrabold text-2xl tracking-tighter text-primary">CivicWatch</h2>
            </div>
            <p className="text-on-surface-variant max-w-sm mb-6">Empowering communities to build better neighborhoods through transparency, accountability, and direct action.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-bold text-lg mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/dashboard">About</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/dashboard">Our Impact</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/dashboard">Case Studies</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/dashboard">Mobile App</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/login">Contact</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/login">Privacy Policy</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/login">Terms of Service</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/login">Community Guidelines</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <p>© 2024 CivicWatch. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Built for the community</span>
            <span>Version 2.4.0</span>
          </div>
        </div>
      </footer>

      {/* FAB: Report New Issue */}
      <Link
        to="/report-issue"
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 primary-gradient text-white flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,91,192,0.3)] hover:scale-105 active:scale-90 transition-all duration-200 z-[60]"
      >
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_circle</span>
        <span className="font-bold tracking-tight">Report New Issue</span>
      </Link>

      {/* BottomNavBar Component */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/60 backdrop-blur-md z-[70] rounded-t-[1.5rem] border-t border-[#c1c6d6]/20 shadow-[0_-10px_40px_rgba(0,91,192,0.06)]">
        <Link className="flex flex-col items-center justify-center bg-[#1A73E8] text-white rounded-xl px-4 py-1 active:scale-90 duration-200" to="/">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
          <span className="font-body text-xs font-medium">Home</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 duration-200" to="/map">
          <span className="material-symbols-outlined">map</span>
          <span className="font-body text-xs font-medium">Map</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 duration-200" to="/report-issue">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="font-body text-xs font-medium">Report</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 duration-200" to="/login">
          <span className="material-symbols-outlined">person</span>
          <span className="font-body text-xs font-medium">Account</span>
        </Link>
      </nav>
    </div>
  );
};

export default Landing;
