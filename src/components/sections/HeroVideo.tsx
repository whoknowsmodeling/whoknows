'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Volume2, VolumeX } from 'lucide-react';
import type { HeroSlide } from '@/types';

interface HeroVideoProps {
  slide?: HeroSlide;
  videoSrc: string;
}

export function HeroVideo({ slide, videoSrc }: HeroVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Try to sync audio play with video
        if (videoRef.current) {
          audioRef.current.currentTime = videoRef.current.currentTime;
        }
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <section className="relative h-[70vh] lg:h-[100vh] overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/Hero-poster.webp"
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Background Audio */}
        <audio
          ref={audioRef}
          src="/Hero.mp3"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      {/* Absolute Bottom-Left Navigation */}
      <div className="absolute bottom-14 lg:bottom-18 left-10 lg:left-24 z-20">
        <motion.nav 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-1 lg:gap-2"
        >
          <Link href="/models" prefetch={true} className="text-white text-2xl lg:text-2xl font-bold uppercase tracking-tight hover:text-neutral-400 transition-colors">
            Models
          </Link>
          <Link href="/men" prefetch={true} className="text-white text-2xl lg:text-2xl font-bold uppercase tracking-tight hover:text-neutral-400 transition-colors">
            Men
          </Link>
          <Link href="/women" prefetch={true} className="text-white text-2xl lg:text-2xl font-bold uppercase tracking-tight hover:text-neutral-400 transition-colors">
            Women
          </Link>
          <Link href="/contact" prefetch={true} className="text-white text-2xl lg:text-2xl font-bold uppercase tracking-tight hover:text-neutral-400 transition-colors">
            Contact
          </Link>
          <Link href="/apply" prefetch={true} className="text-white text-2xl lg:text-2xl font-bold uppercase tracking-tight hover:text-neutral-400 transition-colors">
            Become a Model
          </Link>
        </motion.nav>
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-black/60 transition-colors group cursor-pointer"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        )}
      </button>
    </section>
  );
}
