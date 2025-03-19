
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import LocationHierarchySelector from '@/components/LocationHierarchySelector';

const Index = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-12 text-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
                Location Hierarchy
              </div>
            </motion.div>
            
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Find Your Perfect Location
            </motion.h1>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Explore our hierarchical location selector with intuitive design and seamless experience. Search and select locations with precise geographical context.
            </motion.p>
          </div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 p-6 border border-gray-100 dark:border-gray-700"
          >
            <LocationHierarchySelector />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            <p>
              Select a location from the dropdown above to see its hierarchical details.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
