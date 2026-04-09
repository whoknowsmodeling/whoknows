'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { performSearch, type SearchResult } from '@/lib/search';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Apply', href: '/apply' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        const results = await performSearch(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  if (!isMounted || pathname.startsWith('/admin')) return null;

  const isHome = pathname === '/';
  const showWhiteText = isHome && !isScrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-100'
            : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Stays Left */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="relative z-10 flex items-center h-12 lg:h-20 w-48 lg:w-80"
            >
              <Image 
                src={showWhiteText ? "/whoknows.webp" : "/whoknowsBlack.webp"} 
                alt="WhoKnows Models Logo" 
                fill
                priority
                className="object-contain transition-all duration-300"
              />
            </Link>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Desktop Navigation */}
              <ul className="flex items-center gap-4 lg:gap-8">
                {/* Search Bar - Expanding Style */}
                <li className="relative flex items-center pr-2">
                  <motion.div
                    initial={false}
                    animate={{ width: isSearchOpen ? (typeof window !== 'undefined' && window.innerWidth < 1024 ? 200 : 320) : 40 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className={cn(
                      "flex items-center rounded-full overflow-hidden transition-colors border",
                      isSearchOpen 
                        ? (showWhiteText ? "bg-white/10 border-white/20" : "bg-neutral-100 border-neutral-200") 
                        : "bg-transparent border-transparent"
                    )}
                  >
                    <button 
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                      className={cn(
                        "p-2.5 transition-colors duration-200 flex-shrink-0 z-10",
                        showWhiteText ? "text-white hover:text-white/80" : "text-neutral-600 hover:text-black"
                      )}
                      aria-label="Toggle Search"
                    >
                      {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5 lg:w-6 lg:h-6" />}
                    </button>
                    
                    <AnimatePresence>
                      {isSearchOpen && (
                        <motion.input
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          autoFocus
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search talent..."
                          className={cn(
                            "bg-transparent border-none focus:ring-0 text-sm w-full pr-4 py-2",
                            showWhiteText ? "text-white placeholder:text-white/40" : "text-black placeholder:text-neutral-400"
                          )}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Search Results Mini-Popup */}
                  <AnimatePresence>
                    {isSearchOpen && searchQuery.length >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={cn(
                          "absolute top-full mt-4 right-0 w-80 lg:w-96 rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden z-50",
                          showWhiteText ? "bg-neutral-900/90 border-neutral-800" : "bg-white/95 border-neutral-200"
                        )}
                      >
                        <div className="p-4 max-h-[70vh] overflow-y-auto no-scrollbar">
                          {isSearching ? (
                            <div className="py-8 flex flex-col items-center justify-center gap-3">
                              <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
                              <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">AI Processing...</p>
                            </div>
                          ) : searchResults.length > 0 ? (
                            <div className="space-y-4">
                              {searchResults.map((result, idx) => (
                                <Link 
                                  key={`${result.id}-${idx}`}
                                  href={result.url}
                                  onClick={handleSearchClose}
                                  className="flex items-center gap-4 group p-2 rounded-xl hover:bg-neutral-500/10 transition-colors"
                                >
                                  {result.imageUrl && (
                                    <div className="w-12 h-12 flex-shrink-0 relative overflow-hidden rounded-lg bg-neutral-800">
                                      <Image src={result.imageUrl} alt={result.title} fill className="object-cover" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 mb-0.5">{result.subtitle || result.type}</p>
                                    <h4 className={cn("text-sm font-medium", showWhiteText ? "text-white" : "text-black")}>{result.title}</h4>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="py-4 px-2 text-sm text-neutral-500 font-serif italic text-center">No results found for &ldquo;{searchQuery}&rdquo;</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {/* Conditional Nav Items (Hidden on Home) */}
                {!isHome && navItems.map((item) => {
                  // If we are on home, we don't need a home link in the menu
                  if (isHome && item.href === '/') return null;
                  
                  return (
                    <li key={item.href} className="hidden lg:block">
                      <Link
                        href={item.href}
                        prefetch={true}
                        className={cn(
                          'text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-200',
                          showWhiteText 
                            ? 'text-white/90 hover:text-white' 
                            : 'text-neutral-500 hover:text-black',
                          pathname === item.href && (showWhiteText ? 'text-white' : 'text-black')
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}

                {/* Login Button (Icon Style) */}
                <li>
                  <Link
                    href="/admin/login"
                    className={cn(
                      "p-1 transition-all duration-300 hover:scale-110",
                      showWhiteText ? "text-white hover:text-white/80" : "text-neutral-600 hover:text-black"
                    )}
                    aria-label="Admin Login"
                  >
                    <User className="w-6 h-6 lg:w-7 lg:h-7" />
                  </Link>
                </li>

                {/* Mobile Menu Toggle */}
                {!isHome && (
                  <li className="lg:hidden flex items-center">
                    <button
                      onClick={toggleMobileMenu}
                      className={cn(
                        "relative z-10 p-2 -mr-2 transition-all duration-300",
                        showWhiteText && !isMobileMenuOpen ? "text-white" : "text-black"
                      )}
                      aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                      {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                      ) : (
                        <Menu className="w-6 h-6" />
                      )}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !isHome && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-6">
              <ul className="flex flex-col gap-8">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'text-3xl font-serif tracking-tight uppercase',
                        pathname === item.href
                          ? 'text-black'
                          : 'text-neutral-400'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-auto mb-10"
              >
                <Link
                  href="/admin/login"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center py-5 border-2 border-black text-black font-bold uppercase tracking-widest text-sm"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
