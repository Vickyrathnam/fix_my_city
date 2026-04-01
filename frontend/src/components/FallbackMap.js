import React from 'react';

const FallbackMap = ({ issues, userLocation }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'pothole': return '🕳️';
      case 'streetlight': return '💡';
      case 'water_leakage': return '💧';
      case 'garbage_overflow': return '🗑️';
      case 'public_property': return '🏛️';
      default: return '⚠️';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-300"></div>
          ))}
        </div>
      </div>

      {/* Issues as positioned markers */}
      {issues.map((issue, index) => {
        // Use actual coordinates if available, otherwise use random positions
        let position;
        if (issue.location && issue.location.coordinates && issue.location.coordinates.length >= 2) {
          // Convert coordinates to percentage positions
          // This is a simple projection - in real app you'd use proper map projection
          const lng = issue.location.coordinates[0];
          const lat = issue.location.coordinates[1];
          
          // Simple linear approximation for demo (assuming issues are in reasonable geographic range)
          const left = ((lng + 180) / 360) * 100; // Convert longitude to 0-100%
          const top = ((90 - lat) / 180) * 100; // Convert latitude to 0-100%
          
          position = {
            left: `${Math.max(5, Math.min(95, left))}%`, // Keep within bounds
            top: `${Math.max(5, Math.min(95, top))}%`
          };
        } else {
          // Fallback to random positions
          position = {
            left: `${15 + (index * 15) % 70}%`,
            top: `${20 + (index * 12) % 60}%`
          };
        }

        return (
          <div
            key={issue._id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            style={position}
            title={`${issue.title} - ${issue.status}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-white ${getStatusColor(issue.status)}`}
            >
              {getTypeIcon(issue.type)}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20">
              <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                <div className="font-semibold mb-1">{issue.title}</div>
                <div className="text-gray-300 mb-1">{issue.description.substring(0, 50)}...</div>
                <div className="text-gray-400 text-xs">
                  📍 {issue.location?.address || 'No address'}
                </div>
                <div className="text-gray-400 text-xs">
                  👤 {issue.reportedBy?.name || 'Anonymous'}
                </div>
                <div className="font-semibold text-xs mt-1">
                  Status: {issue.status.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* User Location */}
      {userLocation && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${((userLocation.lng + 180) / 360) * 100}%`,
            top: `${((90 - userLocation.lat) / 180) * 100}%`
          }}
          title="Your Location"
        >
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute inset-0 bg-blue-400 rounded-full opacity-50 animate-ping"></div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20">
        <h3 className="font-semibold text-sm mb-2">Legend</h3>
        <div className="space-y-1">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span>Resolved</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Your Location</span>
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20 max-w-xs">
        <div className="flex items-center">
          <div className="text-2xl mr-2">🗺️</div>
          <div>
            <h3 className="font-semibold text-sm">Interactive Map View</h3>
            <p className="text-xs text-gray-600">
              Showing {issues.length} issue{issues.length !== 1 ? 's' : ''} with real coordinates
            </p>
            {userLocation && (
              <p className="text-xs text-green-600 mt-1">
                📍 Your location detected
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackMap;
