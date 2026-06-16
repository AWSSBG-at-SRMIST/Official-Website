'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamCategoryScroller from '@/components/TeamCategoryScroller';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  presidiumAndDirectors,
  technicalCategory,
  corporateCategory,
  creativesCategory,
  TeamMember,
  OrgNode
} from '@/data/teamStructure';

const ExpandedCardContext = createContext<{
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
} | null>(null);

const TeamCard = ({ member, level }: { member: TeamMember; level?: string }) => {
  const context = useContext(ExpandedCardContext);
  const isExpanded = context ? context.expandedId === member.id : false;
  const setIsExpanded = (val: boolean) => {
    if (context) {
      context.setExpandedId(val ? member.id : null);
    }
  };

  const isPresidium = level === 'presidium';
  const isDirector = level === 'director';
  const isManager = level === 'manager';

  let cardClasses = 'relative group';
  let hoverHeight = 'hover:h-[210px]';
  let initialHeight = 'h-[88px]';
  let borderColor = 'var(--brand-primary-light)';
  let imageSize = 'w-10 h-10';
  let expandedImageSize = 'w-14 h-14';
  let zIndex = 'z-20';
  let cardPadding = 'p-3 sm:p-4';
  let maxDomains = 2;

  if (isPresidium) {
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-64';
    hoverHeight = 'hover:h-[300px]';
    initialHeight = 'h-[116px]';
    borderColor = 'var(--brand-primary)';
    imageSize = 'w-14 h-14';
    expandedImageSize = 'w-20 h-20';
    zIndex = 'z-30';
    maxDomains = 4;
    cardPadding = 'p-4';
  } else if (isDirector) {
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-56';
    hoverHeight = 'hover:h-[260px]';
    initialHeight = 'h-[100px]';
    borderColor = 'var(--brand-primary-light)';
    imageSize = 'w-12 h-12';
    expandedImageSize = 'w-16 h-16';
    zIndex = 'z-20';
    maxDomains = 3;
    cardPadding = 'p-3 sm:p-4';
  } else if (isManager) {
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-48';
    hoverHeight = 'hover:h-[220px]';
    initialHeight = 'h-[92px]';
    borderColor = 'var(--brand-primary-light)';
    imageSize = 'w-10 h-10';
    expandedImageSize = 'w-14 h-14';
    zIndex = 'z-10';
    maxDomains = 2;
    cardPadding = 'p-3 sm:p-4';
  } else {
    // associate
    cardClasses += ' w-full max-w-xs sm:max-w-sm md:w-44';
    hoverHeight = 'hover:h-[210px]';
    initialHeight = 'h-[88px]';
    borderColor = 'var(--brand-primary-light)';
    imageSize = 'w-10 h-10';
    expandedImageSize = 'w-14 h-14';
    zIndex = 'z-10';
    maxDomains = 2;
    cardPadding = 'p-3 sm:p-4';
  }

  const visibleDomains = member.domains?.slice(0, maxDomains) ?? [];
  const extraDomains = (member.domains?.length ?? 0) - visibleDomains.length;

  let expandedHeight = 'h-[210px]';
  if (isPresidium) expandedHeight = 'h-[300px]';
  else if (isDirector) expandedHeight = 'h-[260px]';
  else if (isManager) expandedHeight = 'h-[220px]';

  const currentHeightClass = isExpanded ? expandedHeight : `${initialHeight} ${hoverHeight}`;

  return (
    <motion.div
      className={`${cardClasses} ${currentHeightClass} transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${zIndex} cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
      }}
    >
      <div
        className={`absolute inset-0 rounded-xl ${cardPadding} overflow-hidden bg-surface-container-lowest transition-all duration-500 ${isExpanded ? 'shadow-lg' : 'group-hover:shadow-lg'} border-2`}
        style={{ borderColor }}
      >
        {/* COLLAPSED state */}
        <div className={`absolute inset-0 flex items-center gap-4 px-4 sm:px-5 transition-opacity duration-200 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100 group-hover:opacity-0'}`}>
          {member.image ? (
            <img
              alt={member.imageAlt}
              className={`${imageSize} rounded-full object-cover shrink-0 border-2 border-surface-container-highest`}
              src={member.image}
            />
          ) : (
            <div
              className={`${imageSize} rounded-full flex items-center justify-center font-bold text-sm shrink-0`}
              style={{ backgroundColor: 'var(--brand-primary-light)', color: 'white' }}
            >
              {member.initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-body-md font-semibold text-on-surface leading-tight mb-1 text-sm truncate">
              {member.name}
            </h3>
            <p className="text-xs font-medium truncate" style={{ color: 'var(--brand-slate)' }}>
              {member.role}
            </p>
          </div>
        </div>

        {/* EXPANDED state */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:delay-150'}`}>
          {member.image ? (
            <img
              alt={member.imageAlt}
              className={`${expandedImageSize} rounded-full object-cover shrink-0 border-2 border-surface-container-highest`}
              src={member.image}
            />
          ) : (
            <div
              className={`${expandedImageSize} rounded-full flex items-center justify-center font-bold text-base shrink-0`}
              style={{ backgroundColor: 'var(--brand-primary-light)', color: 'white' }}
            >
              {member.initials}
            </div>
          )}

          <h3 className="font-body-md font-semibold text-on-surface leading-tight text-sm truncate w-full">
            {member.name}
          </h3>

          <p className="text-xs font-medium truncate w-full" style={{ color: 'var(--brand-slate)' }}>
            {member.role}
          </p>

          {visibleDomains.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1">
              {visibleDomains.map((domain) => (
                <span
                  key={domain}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full border"
                  style={{ borderColor: 'var(--brand-primary-light)', color: 'var(--brand-slate)' }}
                >
                  {domain}
                </span>
              ))}
              {extraDomains > 0 && (
                <span className="text-[11px] font-medium" style={{ color: 'var(--brand-slate)' }}>
                  +{extraDomains}
                </span>
              )}
            </div>
          )}

          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline mt-1"
              style={{ color: 'var(--brand-primary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              LinkedIn
            </a>
          )}
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
          <div className="w-px h-8 sm:h-10 md:h-12" style={{ backgroundColor: 'var(--brand-slate)' }} />

          {/* Children Container */}
          <div className="flex flex-col md:flex-row md:flex-nowrap justify-center items-center md:items-start relative gap-y-6 md:gap-y-0 gap-x-0 sm:gap-x-4 md:gap-x-6 w-full md:w-auto">
            {node.children.map((child, idx) => (
              <div key={`${child.member.id}-${idx}`} className="flex flex-col items-center relative w-full md:w-auto px-1 sm:px-2 md:px-3">
                {/* Horizontal Sibling Line */}
                {node.children!.length > 1 && (
                  <div className="hidden md:flex absolute top-0 left-0 right-0">
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: idx === 0 ? 'transparent' : 'var(--brand-slate)' }}
                    />
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: idx === node.children!.length - 1 ? 'transparent' : 'var(--brand-slate)' }}
                    />
                  </div>
                )}

                {/* Vertical Drop */}
                <div className="w-px h-6 sm:h-8" style={{ backgroundColor: 'var(--brand-slate)' }} />

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
      <div className="flex flex-col md:flex-row justify-center items-center gap-y-6 md:gap-y-0 gap-x-10 md:gap-x-16 relative w-full px-4 sm:px-8">
        <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:w-64 relative">
          <TeamCard member={president} level="presidium" />
          <div className="w-px h-8 sm:h-10" style={{ backgroundColor: 'var(--brand-slate)' }} />
        </div>
        <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:w-64 relative">
          <TeamCard member={vp} level="presidium" />
          <div className="w-px h-8 sm:h-10" style={{ backgroundColor: 'var(--brand-slate)' }} />
        </div>

        {/* Horizontal connector between the two vertical drops */}
        <div
          className="hidden md:block absolute bottom-0 h-px"
          style={{
            left: '25%',
            right: '25%',
            backgroundColor: 'var(--brand-slate)',
          }}
        />
      </div>

      {/* Central drop from horizontal bar */}
      <div className="w-px h-8 sm:h-10" style={{ backgroundColor: 'var(--brand-slate)' }} />

      {/* Directors Row */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start relative gap-y-6 md:gap-y-0 gap-x-4 sm:gap-x-6 md:gap-x-8 w-full">
        {directors.map((directorNode, idx) => (
          <div key={directorNode.member.id} className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:w-56 relative px-2 sm:px-3 md:px-4">
            {/* Horizontal sibling line */}
            {directors.length > 1 && (
              <div className="hidden md:flex absolute top-0 left-0 right-0">
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: idx === 0 ? 'transparent' : 'var(--brand-slate)' }}
                />
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: idx === directors.length - 1 ? 'transparent' : 'var(--brand-slate)' }}
                />
              </div>
            )}
            {/* Vertical drop to director */}
            <div className="w-px h-6 sm:h-8" style={{ backgroundColor: 'var(--brand-slate)' }} />

            {/* Director node and sub-tree */}
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    <ExpandedCardContext.Provider value={{ expandedId, setExpandedId }}>
      <Navbar />
      <main className="pt-32 pb-stack-lg" onClick={() => setExpandedId(null)}>
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
                />
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
            {/* Category Selector */}
            <div className="w-full">
              <TeamCategoryScroller
                categories={categories}
                activeIndex={activeCategory}
                onCategoryChange={setActiveCategory}
                isMobile={isMobile}
              />
            </div>

            {/* Organization Tree */}
            <div className="w-full overflow-x-auto pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={categories[activeCategory].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center items-start w-full md:min-w-max p-6"
                >
                  {categories[activeCategory].id === 'presidium' ? (
                    <PresidiumTreeNodes />
                  ) : (
                    <div className="flex flex-col items-center w-full gap-8">
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
    </ExpandedCardContext.Provider>
  );
}