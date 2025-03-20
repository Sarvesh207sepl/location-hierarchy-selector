
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import LocationHierarchySelector from '@/components/LocationSelector';
import './index.css';

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
    <div className="page-container">
      <div className="content-container">
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
          className="selector-container"
        >
          <div className="header-section">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="badge">Location Hierarchy</div>
            </motion.div>
            
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="main-title"
            >
              Find Your Perfect Location
            </motion.h1>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="description"
            >
              Explore our hierarchical location selector with intuitive design and seamless experience. 
              Search and select locations with precise geographical context.
            </motion.p>
          </div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="selector-card"
          >
            <LocationHierarchySelector />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="footer-text"
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
