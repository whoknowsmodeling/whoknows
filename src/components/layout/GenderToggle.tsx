'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenderToggleProps {
  currentGender: 'women' | 'men' | 'all';
}

export function GenderToggle({ currentGender }: GenderToggleProps) {
  return (
    <div className="flex items-center gap-3">
      {currentGender !== 'women' && (
        <Link href="/women">
          <Button 
            variant="ghost" 
            className="group text-sm uppercase tracking-widest text-neutral-500 hover:text-white hover:bg-white/5 px-4"
          >
            <Users className="w-4 h-4 mr-2" />
            Women
          </Button>
        </Link>
      )}
      
      {currentGender !== 'men' && (
        <Link href="/men">
          <Button 
            variant="ghost" 
            className="group text-sm uppercase tracking-widest text-neutral-500 hover:text-white hover:bg-white/5 px-4"
          >
            <Users className="w-4 h-4 mr-2" />
            Men
          </Button>
        </Link>
      )}

      {currentGender !== 'all' && (
        <Link href="/models">
          <Button 
            variant="ghost" 
            className="group text-sm uppercase tracking-widest text-neutral-500 hover:text-white hover:bg-white/5 px-4"
          >
            All Talent
          </Button>
        </Link>
      )}
    </div>
  );
}
