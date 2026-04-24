'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home',           href: '/' },
  { label: 'Men',            href: '/men' },
  { label: 'Women',          href: '/women' },
  { label: 'About Us',       href: '/about' },
  { label: 'Become a Model', href: '/apply' },
  { label: 'Contact',        href: '/contact' },
];

const HIDDEN_LINKS = [
  { label: 'Jobs',     href: '/jobs' },
  { label: 'Models',   href: '/models' },
  { label: 'Sitemap',  href: '/sitemap' },
  { label: 'Terms',    href: '/terms' },
  { label: 'Privacy',  href: '/privacy' },
  { label: 'Under 18', href: '/under-18' },
];

export function SectionMiniNav() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/models?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative border-b border-neutral-200 bg-white">
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Left — hamburger */}
        <button
          onClick={() => { setMenuOpen(v => !v); setSearchOpen(false); }}
          className="w-8 h-8 flex items-center justify-center text-black hover:opacity-60 transition-opacity"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Center — WhoKnows logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/whoknowsBlack.webp"
            alt="WhoKnows Models"
            width={120}
            height={32}
            className="h-7 w-auto"
            loading="lazy"
          />
        </Link>

        {/* Right — search */}
        <button
          onClick={() => { setSearchOpen(v => !v); setMenuOpen(false); }}
          className="w-8 h-8 flex items-center justify-center text-black hover:opacity-60 transition-opacity"
          aria-label="Search"
        >
          {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav links row */}
      <div className="hidden lg:flex items-center justify-center gap-8 pb-3">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-black transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile nav links */}
      <div className="flex lg:hidden items-center justify-center gap-4 pb-3 overflow-x-auto scrollbar-none px-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-sans text-[9px] uppercase tracking-[0.15em] text-neutral-600 hover:text-black transition-colors whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border-b border-neutral-200 px-4 py-4 shadow-sm">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models, campaigns..."
              className="flex-1 border-b border-black bg-transparent font-sans text-sm outline-none py-1 placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="font-sans text-[10px] uppercase tracking-widest text-black hover:opacity-60 transition-opacity px-2"
            >
              Go
            </button>
          </form>
        </div>
      )}

      {/* Hidden menu panel */}
      {menuOpen && (
        <div className="absolute top-full left-0 z-50 bg-white border border-neutral-200 shadow-md w-48 py-2">
          {HIDDEN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.15em] text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
