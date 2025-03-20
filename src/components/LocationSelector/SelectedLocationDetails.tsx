
import React from 'react';
import { LocationType } from '@/services/locationService';
import './LocationSelector.css';

interface SelectedLocationDetailsProps {
  selectedLocation: LocationType | null;
  buildHierarchyPath: (location: LocationType) => LocationType[];
}

const SelectedLocationDetails: React.FC<SelectedLocationDetailsProps> = ({
  selectedLocation,
  buildHierarchyPath
}) => {
  if (!selectedLocation) return null;
  
  const hierarchyPath = buildHierarchyPath(selectedLocation);
  
  return (
    <div className="selected-details fade-in">
      <div className="hierarchy-section">
        <div className="details-title">
          Selected Hierarchy
        </div>
        <div className="hierarchy-list">
          {hierarchyPath.map((item, index, arr) => (
            <div 
              key={item.id.toString()}
              className={`hierarchy-item ${index === arr.length - 1 ? 'hierarchy-item-selected' : ''}`}
              style={{ paddingLeft: `${index * 12}px` }}
            >
              {index > 0 && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="hierarchy-arrow">
                  <path d="M3 9L7 5L3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span className="hierarchy-category">{item.locCategoryName}:</span>
              <span className="hierarchy-name">{item.displayName}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="details-section">
        <div className="details-title">
          Location Details
        </div>
        <div className="details-grid">
          {hierarchyPath.map((item) => (
            <div
              key={item.id.toString() + "-detail"}
              className="detail-card fade-in"
            >
              <div className="detail-card-title">{item.locCategoryName}</div>
              <div className="detail-card-content">
                <div>Name: {item.displayName}</div>
                <div>Code: {item.locCode}</div>
                <div>ID: {item.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedLocationDetails;
