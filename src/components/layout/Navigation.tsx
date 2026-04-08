'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/men' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Apply', href: '/apply' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  if (!isMounted || pathname.startsWith('/admin')) return null;

  const isHome = pathname === '/';
  const showWhiteText = isHome && !isScrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="relative z-10 flex items-center h-12 lg:h-14 w-56 lg:w-64"
            >
              <Image 
                src={showWhiteText ? "/whoknows.webp" : "/whoknowsBlack.webp"} 
                alt="WhoKnows Models Logo" 
                fill
                priority
                className="object-contain transition-all duration-300"
              />
            </Link>

            {/* Desktop Navigation - Hidden on Home to emphasize Hero Nav */}
            {pathname !== '/' && (
              <ul className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:text-black',
                        pathname === item.href
                          ? 'text-black'
                          : 'text-neutral-600'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Desktop Login - Only show on desktop nav area */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/admin/login"
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  showWhiteText ? "text-white hover:text-white/80" : "text-neutral-600 hover:text-black"
                )}
                aria-label="Admin Login"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu & Login Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/admin/login"
                className={cn(
                  "p-2 transition-all duration-300",
                  showWhiteText ? "text-white" : "text-neutral-600"
                )}
                aria-label="Admin Login"
              >
                <User className="w-6 h-6" />
              </Link>
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
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full">
              <ul className="flex flex-col items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'text-2xl font-medium tracking-wide uppercase',
                        pathname === item.href
                          ? 'text-black'
                          : 'text-neutral-500'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
