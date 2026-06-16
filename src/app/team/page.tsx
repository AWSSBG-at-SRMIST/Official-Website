'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamCategoryScroller from '@/components/TeamCategoryScroller';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  presidiumAndDirectors,
  technicalCategory,
  corporateCategory,
  creativesCategory,
  OrgNode,
  TeamMember,
} from '@/data/teamStructure';

const TeamCard = ({ member, level }: { member: TeamMember; level?: string }) => {
  const isPresidium = level === 'presidium';
  const isDirector = level === 'director';
  const isManager = level === 'manager';

  let cardClasses = 'relative group';
  let hoverHeight = 'hover:h-[240px]';
  let initialHeight = 'h-[88px]';
  let borderColor = 'var(--brand-primary-light)';
  let imageSize = 'w-12 h-12';
  let zIndex = 'z-20';
  let cardPadding = 'p-3 sm:p-4';
  let cardGap = 'gap-3';

  if (isPresidium) {
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-64';
    hoverHeight = 'hover:h-[280px] md:hover:h-[280px]';
    initialHeight = 'h-[104px]';
    borderColor = 'var(--brand-primary)';
    imageSize = 'w-12 sm:w-14 h-12 sm:h-14';
    zIndex = 'z-30';
  } else if (isDirector) {
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-56';
    hoverHeight = 'hover:h-[240px] md:hover:h-[240px]';
    initialHeight = 'h-[88px]';
    borderColor = 'var(--brand-primary-light)';
    imageSize = 'w-10 sm:w-12 h-10 sm:h-12';
    zIndex = 'z-20';
  } else if (isManager) {
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-44';
    hoverHeight = 'hover:h-[200px] md:hover:h-[200px]';
    initialHeight = 'h-[80px]';
    borderColor = 'var(--brand-primary-light)';
    imageSize = 'w-8 h-8';
    zIndex = 'z-10';
    cardPadding = 'p-2 sm:p-3';
    cardGap = 'gap-2';
  } else {
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-40';
    hoverHeight = 'hover:h-[180px] md:hover:h-[180px]';
    initialHeight = 'h-[72px]';
    borderColor = 'var(--brand-primary-light)';
    imageSize = 'w-8 h-8';
    zIndex = 'z-10';
    cardPadding = 'p-2 sm:p-3';
    cardGap = 'gap-2';
  }

  return (
    <motion.div
      className={`${cardClasses} ${initialHeight} transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${hoverHeight} ${zIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`absolute inset-0 rounded-xl ${cardPadding} flex flex-col justify-start overflow-hidden bg-surface-container-lowest transition-all duration-500 group-hover:shadow-lg border-2`}
        style={{ borderColor }}
      >
        <div className={`flex items-center ${cardGap}`}>
          {member.image ? (
            <img
              alt={member.imageAlt}
              className={`${imageSize} rounded-full object-cover shrink-0 border-2 border-surface-container-highest`}
              src={member.image}
            />
          ) : (
            <div
              className={`${imageSize} rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0`}
              style={{ backgroundColor: 'var(--brand-primary-light)', color: 'white' }}
            >
              {member.initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-body-md font-semibold text-on-surface leading-none mb-1 text-xs sm:text-sm truncate">
              {member.name}
            </h3>
            <p className="text-[11px] font-medium truncate" style={{ color: 'var(--brand-slate)' }}>
              {member.role}
            </p>
          </div>
        </div>

        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 overflow-y-auto">
          {member.domains && (
            <>
              <span className="text-xs text-on-surface-variant block mb-2">
                {member.domains.join(', ')}
              </span>
            </>
          )}
          <a
            className="text-xs hover:underline font-semibold"
            style={{ color: 'var(--brand-primary)' }}
            href={member.linkedinUrl || '#'}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Org Tree Node Renderer
const OrgTreeNode = ({
  node,
  level = 0,
}: {
  node: OrgNode;
  level?: number;
}) => {
  const levels = ['presidium', 'director', 'manager', 'associate'];
  const currentLevel = levels[Math.min(level, levels.length - 1)];

  return (
    <div className="flex flex-col items-center w-full md:min-w-max">
      <TeamCard member={node.member} level={currentLevel} />

      {node.children && node.children.length > 0 && (
        <>
          {/* Vertical Connector */}
          <div className="w-px h-6 sm:h-8 md:h-10" style={{ backgroundColor: 'var(--brand-slate)' }} />

          {/* Children Container - responsive column/row with tighter gaps */}
          <div className="flex flex-col md:flex-row md:flex-nowrap justify-center items-center md:items-start relative gap-y-4 md:gap-y-0 gap-x-0 sm:gap-x-2 md:gap-x-3 w-full md:w-auto">
            {node.children.map((child, idx) => (
              <div key={`${child.member.id}-${idx}`} className="flex flex-col items-center relative w-full md:w-auto px-0 sm:px-1">
                {/* Horizontal Sibling Line */}
                {node.children!.length > 1 && (
                  <div className="hidden md:flex absolute top-0 left-0 right-0">
                    <div
                      className={`flex-1 h-px ${idx === 0 ? 'invisible' : 'bg-brand-slate'}`}
                      style={{ backgroundColor: idx === 0 ? 'transparent' : 'var(--brand-slate)' }}
                    />
                    <div
                      className={`flex-1 h-px ${idx === node.children!.length - 1 ? 'invisible' : 'bg-brand-slate'}`}
                      style={{ backgroundColor: idx === node.children!.length - 1 ? 'transparent' : 'var(--brand-slate)' }}
                    />
                  </div>
                )}

                {/* Vertical Drop */}
                <div className="w-px h-4 sm:h-6" style={{ backgroundColor: 'var(--brand-slate)' }} />

                <OrgTreeNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Custom Presidium rendering component
const PresidiumTreeNodes = () => {
  const president = presidiumAndDirectors[0].member;
  const vp = presidiumAndDirectors[1].member;
  const directors = presidiumAndDirectors[0].children || [];

  return (
    <div className="flex flex-col items-center w-full pb-8">
      {/* Root Row: President & VP */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-y-6 md:gap-y-0 gap-x-6 md:gap-x-12 relative w-full px-4 sm:px-8">
        <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:w-64 relative">
          <TeamCard member={president} level="presidium" />
          {/* Vertical Drop from President */}
          <div className="w-px h-6 sm:h-8 bg-brand-slate" style={{ backgroundColor: 'var(--brand-slate)' }} />
        </div>
        <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:w-64 relative">
          <TeamCard member={vp} level="presidium" />
          {/* Vertical Drop from VP */}
          <div className="w-px h-6 sm:h-8 bg-brand-slate" style={{ backgroundColor: 'var(--brand-slate)' }} />
        </div>

        {/* Horizontal connector line linking the President and VP drops */}
        <div
          className="hidden md:block absolute bottom-0 h-px"
          style={{
            left: '25%',
            right: '25%',
            backgroundColor: 'var(--brand-slate)'
          }}
        />
      </div>

      {/* Central drop line from the horizontal bar */}
      <div className="w-px h-6 sm:h-8 bg-brand-slate" style={{ backgroundColor: 'var(--brand-slate)' }} />

      {/* Directors Row */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start relative gap-y-6 md:gap-y-0 gap-x-2 sm:gap-x-3 md:gap-x-4 w-full">
        {directors.map((directorNode, idx) => (
          <div key={directorNode.member.id} className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:w-56 relative px-0 sm:px-1">
            {/* Horizontal Line for sibling connection */}
            {directors.length > 1 && (
              <div className="hidden md:flex absolute top-0 left-0 right-0">
                <div
                  className={`flex-1 h-px ${idx === 0 ? 'invisible' : 'bg-brand-slate'}`}
                  style={{ backgroundColor: idx === 0 ? 'transparent' : 'var(--brand-slate)' }}
                />
                <div
                  className={`flex-1 h-px ${idx === directors.length - 1 ? 'invisible' : 'bg-brand-slate'}`}
                  style={{ backgroundColor: idx === directors.length - 1 ? 'transparent' : 'var(--brand-slate)' }}
                />
              </div>
            )}
            {/* Vertical drop to director */}
            <div className="w-px h-4 sm:h-6 bg-brand-slate" style={{ backgroundColor: 'var(--brand-slate)' }} />

            {/* Director node and its sub-tree */}
            <OrgTreeNode node={directorNode} level={1} />
          </div>
        ))}
      </div>
    </div>
  );
};

const categories = [
  { id: 'presidium', name: 'Presidium & Directors' },
  { id: 'technical', name: 'Technical' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'creatives', name: 'Creatives' },
];

const categoryData: { [key: string]: OrgNode[] } = {
  presidium: presidiumAndDirectors,
  technical: technicalCategory,
  corporate: corporateCategory,
  creatives: creativesCategory,
};

export default function TeamsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentData = categoryData[categories[activeCategory].id];

  return (
    <><Navbar />
      <main className="pt-32 pb-stack-lg">
        {/* Hero Section */}
        <header className="mb-12 md:mb-16">
          <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-gutter items-end">
              <div className="md:col-span-8">
                <h1
                  className="font-display text-2xl sm:text-4xl md:text-[56px] mb-4 tracking-tighter leading-tight font-bold"
                  style={{ color: 'var(--brand-dark)' }}
                >
                  The Builders.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-sm sm:text-base">
                  The minds driving cloud innovation at SRMIST. We are a collective of
                  builders, engineers, and designers pushing the boundaries of what's
                  possible on AWS.
                </p>
              </div>
              <div className="md:col-span-4 flex justify-start md:justify-end pb-4">
                <div
                  className="w-16 h-1"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Organization Section */}
        <section
          className="relative w-full py-8 md:py-12 px-4 sm:px-6 md:px-margin-desktop rounded-3xl shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] mx-auto max-w-container-max"
          style={{ backgroundColor: 'rgba(37, 99, 235, 0.03)' }}
        >
          <div className="flex flex-col gap-8 items-center w-full">
            {/* Category Selector above */}
            <div className="w-full">
              <TeamCategoryScroller
                categories={categories}
                activeIndex={activeCategory}
                onCategoryChange={setActiveCategory}
                isMobile={isMobile}
              />
            </div>

            {/* Right Content - Organization Tree */}
            <div className="w-full overflow-x-auto pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={categories[activeCategory].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center items-start w-full md:min-w-max p-4"
                >
                  {categories[activeCategory].id === 'presidium' ? (
                    <PresidiumTreeNodes />
                  ) : (
                    <div className="flex flex-col items-center w-full">
                      {currentData.map((node, idx) => (
                        <div key={`${node.member.id}-${idx}`} className="w-full flex flex-col items-center">
                          <OrgTreeNode node={node} level={0} />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
