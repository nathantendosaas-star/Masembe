import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function IdentitySwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuto = location.pathname.startsWith('/cars');
  const isRe = location.pathname.startsWith('/property');
  const isHome = location.pathname === '/';
  const [transitionTarget, setTransitionTarget] = useState<'auto' | 're' | null>(null);

  const handleSwitch = (target: 'auto' | 're') => {
    if ((target === 'auto' && isAuto) || (target === 're' && isRe)) return;
    
    setTransitionTarget(target);
    
    setTimeout(() => {
      navigate(target === 'auto' ? '/cars' : '/property');
      setTimeout(() => setTransitionTarget(null), 100);
    }, 600);
  };

  return (
    <>
      <div className="flex items-center bg-black/90 backdrop-blur-2xl rounded-full p-1.5 border border-white/10 relative z-50 shadow-2xl">
        <div className="relative flex">
          <button
            onClick={() => handleSwitch('auto')}
            className={cn(
              "relative px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors z-10 w-32 text-center",
              isAuto ? "text-white" : "text-white/40 hover:text-white"
            )}
          >
            Grid Motors
          </button>
          <button
            onClick={() => handleSwitch('re')}
            className={cn(
              "relative px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors z-10 w-32 text-center",
              isRe ? "text-black" : "text-white/40 hover:text-white"
            )}
          >
            Masembe RE
          </button>
          
          {!isHome && (
            <motion.div
              className={cn(
                "absolute top-0 bottom-0 w-32 rounded-full z-0",
                isAuto ? "bg-[#dc2626] left-0" : "bg-[#d4af37] left-32"
              )}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {transitionTarget && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, originY: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed inset-0 z-[100] origin-bottom",
              transitionTarget === 're' ? "bg-re-bg" : "bg-auto-bg"
            )}
          />
        )}
      </AnimatePresence>
    </>
  );
}
