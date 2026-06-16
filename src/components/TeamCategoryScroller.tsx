'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './TeamCategoryScroller.css';

interface Category {
  id: string;
  name: string;
}

interface TeamCategorySelectorProps {
  categories: Category[];
  activeIndex: number;
  onCategoryChange: (index: number) => void;
  isMobile?: boolean;
}

const TeamCategoryScroller = ({ 
  categories, 
  activeIndex, 
  onCategoryChange,
  isMobile = false
}: TeamCategorySelectorProps) => {
  const scrollerVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
  };

  const itemVariants = {
    inactive: (index: number) => ({
      scale: 0.85,
      opacity: 0.4,
      filter: 'blur(0.5px)',
      x: 0,
    }),
    active: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
    },
  };

  return (
    <motion.div 
      className={`team-category-scroller ${isMobile ? 'mobile' : 'desktop'}`}
      variants={scrollerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category, index) => {
        const isActive = index === activeIndex;
        
        return (
          <motion.button
            key={category.id}
            className={`team-category-item ${isActive ? 'active' : ''}`}
            onClick={() => onCategoryChange(index)}
            custom={index}
            variants={itemVariants}
            animate={isActive ? 'active' : 'inactive'}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
            whileHover={!isMobile ? { scale: 0.9, opacity: 0.7 } : undefined}
            whileTap={{ scale: 0.95 }}
          >
            <span className="category-label">{category.name}</span>
            {isActive && (
              <motion.div 
                className="category-indicator"
                layoutId="category-indicator"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default TeamCategoryScroller;
