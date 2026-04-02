import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from '../components/GoogleMap';
import FallbackMap from '../components/FallbackMap';

const MapView = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [mapError, setMapError] = useState('');
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    fetchIssues();
    getUserLocation();
  }, []);

  const fetchIssues = async () => {
    try {
      console.log('Fetching issues from backend...');
      const response = await axios.get('https://fix-my-city-udyu.onrender.com/api/issues');
      console.log('Issues fetched successfully:', response.data);
      setIssues(response.data.issues);
      
      // Log coordinate information for debugging
      response.data.issues.forEach((issue, index) => {
        console.log(`Issue ${index + 1}:`, {
          id: issue._id,
          title: issue.title,
          hasLocation: !!issue.location,
          coordinates: issue.location?.coordinates,
          address: issue.location?.address
        });
      });
    } catch (error) {
      console.error('Error fetching issues:', error);
      setMapError('Failed to load issues from backend. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          console.log('User location obtained:', location);
        },
        (error) => {
          console.error('Error getting location:', error);
          let errorMessage = 'Unable to get your location. ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access denied. Please enable location permissions.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'Unknown error occurred.';
              break;
          }
          setMapError(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setMapError('Geolocation is not supported by your browser.');
    }

    // Check if Google Maps API is available and handle loading
    const checkMapsApi = () => {
      if (window.googleMapsReady === false) {
        console.log('Google Maps API failed to load, using fallback');
        setUseFallback(true);
        setMapError('Google Maps API unavailable. Using fallback map view.');
      } else if (window.google && window.google.maps) {
        console.log('Google Maps API is available');
      } else {
        // API might still be loading, check again after delay
        setTimeout(checkMapsApi, 1000);
      }
    };
    
    setTimeout(checkMapsApi, 1000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pothole':
        return '🕳️';
      case 'streetlight':
        return '💡';
      case 'water_leakage':
        return '💧';
      case 'garbage_overflow':
        return '🗑️';
      case 'public_property':
        return '🏛️';
      default:
        return '⚠️';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FCD34D'; // yellow
      case 'in_progress':
        return '#60A5FA'; // blue
      case 'resolved':
        return '#34D399'; // green
      default:
        return '#9CA3AF'; // gray
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Infrastructure Issues Map</h1>
        
        {mapError && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-2">warning</span>
                {mapError}
              </div>
              <button
                onClick={getUserLocation}
                className="ml-4 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded text-sm font-medium"
              >
                Retry Location
              </button>
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {userLocation && (
              <div className="text-sm text-gray-600">
                📍 Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            )}
            <button
              onClick={getUserLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
            >
              🔄 Refresh Location
            </button>
            {userLocation && (
              <button
                onClick={() => {
                  // This will be handled by the GoogleMap component
                  console.log('Centering on user location');
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium"
              >
                🎯 Center on Me
              </button>
            )}
          </div>
          <button
            onClick={() => setUseFallback(!useFallback)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {useFallback ? '🗺️ Try Google Maps' : '🎯 Use Fallback Map'}
          </button>
        </div>

        {/* Map Container */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="relative h-96 md:h-[600px]">
            {useFallback ? (
              <FallbackMap
                issues={issues}
                userLocation={userLocation}
              />
            ) : (
              <GoogleMap
                issues={issues}
                userLocation={userLocation}
                onMapClick={(latLng) => {
                  console.log('Map clicked:', latLng);
                }}
                onError={() => setUseFallback(true)}
              />
            )}
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reported Issues ({issues.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues.map((issue) => (
              <div key={issue._id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  >
                    {getTypeIcon(issue.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{issue.title}</h3>
                    <p className="text-xs text-gray-500">{issue.location.address}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        issue.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {issues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No issues reported yet</div>
            <p className="text-gray-400 mt-2">Be the first to report an infrastructure issue!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
