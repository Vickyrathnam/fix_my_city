import React from 'react';

const IssueCard = ({ issue, onStatusUpdate, userRole }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-tertiary-container text-tertiary border-tertiary';
      case 'in_progress':
        return 'bg-primary-container text-primary border-primary';
      case 'resolved':
        return 'bg-secondary-container text-secondary border-secondary';
      default:
        return 'bg-surface-container text-on-surface border-outline-variant';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pothole':
        return 'pit';
      case 'streetlight':
        return 'lightbulb';
      case 'water_leakage':
        return 'water_drop';
      case 'garbage_overflow':
        return 'delete';
      case 'public_property':
        return 'domain';
      default:
        return 'warning';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'pothole':
        return 'Pothole';
      case 'streetlight':
        return 'Streetlight';
      case 'water_leakage':
        return 'Water Leakage';
      case 'garbage_overflow':
        return 'Garbage Overflow';
      case 'public_property':
        return 'Public Property';
      default:
        return 'Other';
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-outline-variant/30">
      {/* Image Header */}
      <div className="relative h-48 bg-surface-container">
        {issue.imageUrl ? (
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl mb-2">broken_image</span>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(issue.status)}`}>
            {issue.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Type Icon */}
        <div className="absolute top-3 left-3">
          <div className="w-10 h-10 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-xl">{getTypeIcon(issue.type)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Type */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-on-surface line-clamp-2">
            {issue.title}
          </h3>
        </div>

        {/* Type Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface">
            <span className="material-symbols-outlined text-sm mr-1">{getTypeIcon(issue.type)}</span> {getTypeLabel(issue.type)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {issue.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{issue.location?.address || 'Address not available'}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{issue.reportedBy?.name || 'Anonymous'}</span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date(issue.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Admin Actions */}
        {userRole === 'admin' && issue.status !== 'resolved' && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex space-x-2">
              {issue.status === 'pending' && (
                <button
                  onClick={() => onStatusUpdate(issue._id, 'in_progress')}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Work
                </button>
              )}
              <button
                onClick={() => onStatusUpdate(issue._id, 'resolved')}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
