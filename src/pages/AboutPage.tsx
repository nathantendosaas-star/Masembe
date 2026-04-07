import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current && scrollRef.current) {
        const sections = gsap.utils.toArray('.timeline-section');
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + (scrollRef.current?.offsetWidth || 0)
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-[#0C0C0C] text-[#f5f5dc] overflow-hidden">
      {/* Noise Texture */}
      <div 
        className="fixed inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
      
      {/* Bright Theme Gradient */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-300/30 to-orange-400/30 blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Intro */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6"
          >
            The Legacy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-80"
          >
            Naseeb Masembe
          </motion.p>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-[1px] bg-[#f5f5dc] mt-12 opacity-50"
          />
        </div>

        {/* Horizontal Timeline */}
        <div ref={containerRef} className="h-screen flex items-center">
          <div ref={scrollRef} className="flex w-[300vw] h-full">
            
            <div className="timeline-section w-screen h-full flex items-center justify-center px-12 md:px-24">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">The Vision</h2>
                <p className="text-xl leading-relaxed opacity-80">
                  Founded on the principles of excellence and uncompromising quality, Masembe Group began as a vision to redefine luxury in East Africa.
                </p>
              </div>
            </div>

            <div className="timeline-section w-screen h-full flex items-center justify-center px-12 md:px-24">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">Grid Motors</h2>
                <p className="text-xl leading-relaxed opacity-80">
                  Establishing the premier destination for luxury automotive. Curating the world's finest vehicles for a discerning clientele in Kampala.
                </p>
              </div>
            </div>

            <div className="timeline-section w-screen h-full flex items-center justify-center px-12 md:px-24">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">Real Estate</h2>
                <p className="text-xl leading-relaxed opacity-80">
                  Expanding the portfolio into landmark developments. Creating spaces that inspire and endure, shaping the skyline of tomorrow.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
