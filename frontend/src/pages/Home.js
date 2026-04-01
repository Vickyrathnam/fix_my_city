import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-600">CivicWatch</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Community Infrastructure Monitoring System - Report and track local issues together
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            <div className="pt-6">
              <Link 
                to={user ? "/report-issue" : "/login"}
                className="flow-root rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg group-hover:bg-blue-600 transition-colors">
                      <span className="material-symbols-outlined text-white text-2xl">report_problem</span>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">Report Issues</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Easily report infrastructure problems in your neighborhood with photos and location details.
                  </p>
                  <div className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    {user ? "Report an Issue →" : "Sign in to Report →"}
                  </div>
                </div>
              </Link>
            </div>

            <div className="pt-6">
              <Link 
                to={user ? "/map" : "/login"}
                className="flow-root rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg group-hover:bg-green-600 transition-colors">
                      <span className="material-symbols-outlined text-white text-2xl">map</span>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-green-600 transition-colors">Track Progress</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Monitor the status of reported issues and see when they get resolved by authorities.
                  </p>
                  <div className="mt-4 text-sm font-medium text-green-600 group-hover:text-green-700">
                    {user ? "View Map →" : "Sign in to View →"}
                  </div>
                </div>
              </Link>
            </div>

            <div className="pt-6">
              <Link 
                to={user ? "/dashboard" : "/login"}
                className="flow-root rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg group-hover:bg-purple-600 transition-colors">
                      <span className="material-symbols-outlined text-white text-2xl">analytics</span>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-purple-600 transition-colors">View Analytics</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Get insights into infrastructure patterns and trends in your community.
                  </p>
                  <div className="mt-4 text-sm font-medium text-purple-600 group-hover:text-purple-700">
                    {user ? "View Dashboard →" : "Sign in to View →"}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          {!user ? (
            <div className="space-y-4">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Sign In to Get Started
              </Link>
              <div className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
              <div className="text-sm text-gray-600">
                Welcome back, {user.name}!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
