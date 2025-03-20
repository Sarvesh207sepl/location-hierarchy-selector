
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LocationType } from '@/services/locationService';

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
    <AnimatePresence>
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-4 border rounded-xl bg-secondary/40 backdrop-blur-sm"
        >
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
              Selected Hierarchy
            </div>
            <div className="space-y-2">
              {hierarchyPath.map((item, index, arr) => (
                <motion.div 
                  key={item.id.toString()}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex items-center",
                    index === arr.length - 1 && "text-primary font-medium"
                  )}
                  style={{ paddingLeft: `${index * 12}px` }}
                >
                  {index > 0 && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M3 9L7 5L3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span className="text-muted-foreground mr-1.5">{item.locCategoryName}:</span>
                  <span className="font-medium">{item.displayName}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t border-border">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
              Location Details
            </div>
            <div className="grid grid-cols-2 gap-2">
              {hierarchyPath.map((item, index) => (
                <motion.div
                  key={item.id.toString() + "-detail"}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-2 rounded-md bg-background text-xs"
                >
                  <div className="font-medium">{item.locCategoryName}</div>
                  <div className="text-muted-foreground mt-1">
                    <div>Name: {item.displayName}</div>
                    <div>Code: {item.locCode}</div>
                    <div>ID: {item.id}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectedLocationDetails;
