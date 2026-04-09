'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GlobalLoader component provides real-time feedback for page transitions.
 * It appears at the center-top of the viewport IMMEDIATELLY on click.
 */
export function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Reactive hide on route change completion
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // 2. Proactive show on ANY internal link click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;

      const href = link.getAttribute('href');
      const targetAttr = link.getAttribute('target');

      // Only trigger for internal links that don't open in new tabs
      if (
        href && 
        href.startsWith('/') && 
        !href.startsWith('/#') && 
        targetAttr !== '_blank'
      ) {
        setIsLoading(true);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <>
      {/* Top progress line */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ width: 0, opacity: 1 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed top-0 left-0 h-[2px] bg-black z-[9999]"
          />
        )}
      </AnimatePresence>

      {/* Center-Top Minimalist Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%', scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.8 }}
            className="fixed top-4 left-1/2 z-[9999] flex items-center justify-center pointer-events-none"
          >
            <div className="w-6 h-6 border-2 border-neutral-100 border-t-black rounded-full animate-spin shadow-md bg-white/50 backdrop-blur-sm p-0.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
