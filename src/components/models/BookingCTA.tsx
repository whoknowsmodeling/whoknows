'use client';

import * as React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/models/BookingModal';

interface BookingCTAProps {
  modelName: string;
}

export function BookingCTA({ modelName }: BookingCTAProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Status Badge */}
        <div 
          className="flex items-center gap-2 pt-4 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500 group-hover:text-black transition-colors">
            Available for Booking
          </span>
        </div>

        {/* Booking Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-black hover:bg-neutral-800 text-white py-8 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
          Book {modelName.split(' ')[0]}
        </Button>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        modelName={modelName} 
      />
    </>
  );
}
