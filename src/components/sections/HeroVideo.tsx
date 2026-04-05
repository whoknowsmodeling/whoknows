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
          preload="none"
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
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl flex flex-col items-center"
        >
          {slide?.title && (
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-md">
              {slide.title}
            </h1>
          )}
          {slide?.subtitle && (
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-xl mx-auto drop-shadow-md pb-2">
              {slide.subtitle}
            </p>
          )}
          {slide?.link && (
            <Link
              href={slide.link}
              className="inline-block px-8 py-3 bg-white text-black font-medium text-sm w-max uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-lg"
            >
              Discover More
            </Link>
          )}
        </motion.div>
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
