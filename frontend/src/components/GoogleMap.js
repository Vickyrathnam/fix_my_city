import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ issues, userLocation, onMapClick }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps) {
      if (window.googleMapsReady === false) {
        setError('Google Maps API failed to load. Please check your API key or internet connection.');
      } else {
        setError('Google Maps API is still loading. Please wait a moment and refresh.');
        // Retry after a delay
        const retryTimer = setTimeout(() => {
          if (window.google && window.google.maps) {
            setError('');
          } else {
            setError('Google Maps API failed to load. Using fallback map.');
          }
        }, 3000);
        return () => clearTimeout(retryTimer);
      }
      return;
    }

    // Calculate center based on issues if no user location
    let mapCenter = userLocation || { lat: 20.5937, lng: 78.9629 }; // Default to India center
    let mapZoom = userLocation ? 15 : 5;

    // If no user location but we have issues, center on the issues
    if (!userLocation && issues.length > 0) {
      const validIssues = issues.filter(issue => 
        issue.location && 
        issue.location.coordinates && 
        issue.location.coordinates.length >= 2
      );
      
      if (validIssues.length > 0) {
        const lats = validIssues.map(issue => issue.location.coordinates[1]);
        const lngs = validIssues.map(issue => issue.location.coordinates[0]);
        
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        
        mapCenter = {
          lat: (minLat + maxLat) / 2,
          lng: (minLng + maxLng) / 2
        };
        mapZoom = 10; // Moderate zoom to show all issues
      }
    }

    const mapOptions = {
      center: mapCenter,
      zoom: mapZoom,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      gestureHandling: 'cooperative',
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };

    if (mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      
      // Add zoom control to better see issues
      newMap.addListener('zoom_changed', () => {
        console.log('Map zoom level:', newMap.getZoom());
      });
    }
  }, [userLocation, map, issues]);

  useEffect(() => {
    if (map && issues.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      const newMarkers = [];
      
      // Add issue markers
      issues.forEach(issue => {
        if (issue.location && issue.location.coordinates && issue.location.coordinates.length >= 2) {
          const lat = issue.location.coordinates[1];
          const lng = issue.location.coordinates[0];
          
          // Validate coordinates
          if (typeof lat === 'number' && typeof lng === 'number' && 
              lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            
            const marker = new window.google.maps.Marker({
              position: { lat, lng },
              map,
              title: issue.title,
              animation: window.google.maps.Animation.DROP,
              icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="${
                      issue.status === 'pending' ? '#FCD34D' :
                      issue.status === 'in_progress' ? '#60A5FA' :
                      '#34D399'
                    }" stroke="white" stroke-width="2"/>
                    <text x="16" y="20" text-anchor="middle" font-size="14">${
                      issue.type === 'pothole' ? '🕳️' :
                      issue.type === 'streetlight' ? '💡' :
                      issue.type === 'water_leakage' ? '💧' :
                      issue.type === 'garbage_overflow' ? '🗑️' :
                      issue.type === 'public_property' ? '🏛️' :
                      '⚠️'
                    }</text>
                  </svg>
                `)}`,
                scaledSize: new window.google.maps.Size(32, 32)
              }
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; max-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-weight: bold;">${issue.title}</h3>
                  <p style="margin: 0 0 4px 0; font-size: 12px;">${issue.description}</p>
                  <p style="margin: 0 0 4px 0; font-size: 11px; color: #666;">
                    📍 ${issue.location.address || 'Address not available'}
                  </p>
                  <p style="margin: 0 0 4px 0; font-size: 11px; color: #666;">
                    👤 ${issue.reportedBy?.name || 'Anonymous'}
                  </p>
                  <p style="margin: 0; font-size: 11px; font-weight: bold; color: ${
                    issue.status === 'pending' ? '#D97706' :
                    issue.status === 'in_progress' ? '#2563EB' :
                    '#059669'
                  };">
                    Status: ${issue.status.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            newMarkers.push(marker);
          } else {
            console.warn('Invalid coordinates for issue:', issue._id, issue.location.coordinates);
          }
        } else {
          console.warn('Issue missing location coordinates:', issue._id);
        }
      });

      // Add user location marker
      if (userLocation) {
        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          map,
          title: 'Your Location',
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="3"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(24, 24)
          }
        });
        newMarkers.push(userMarker);
      }

      setMarkers(newMarkers);

      // Add click handler
      if (onMapClick) {
        map.addListener('click', (e) => {
          onMapClick(e.latLng);
        });
      }
    }
  }, [map, issues, userLocation, onMapClick]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center p-6 max-w-md">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Google Maps Unavailable</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Possible solutions:
            </p>
            <ul className="text-sm text-gray-500 text-left">
              <li>• Check your internet connection</li>
              <li>• Refresh the page</li>
              <li>• Try using the fallback map</li>
              <li>• Contact support if the issue persists</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
      className="border-0"
    />
  );
};

export default GoogleMap;
