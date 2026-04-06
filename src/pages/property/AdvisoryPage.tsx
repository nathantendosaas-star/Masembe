import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function AdvisoryPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div ref={pageRef} className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-re-bg text-re-text">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: yTitle }}
          className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-center"
        >
          Private Advisory
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-re-gray mb-16 text-center"
        >
          Exclusive investment consulting for high-net-worth individuals.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold tracking-widest text-re-gray uppercase mb-2">Full Name</label>
              <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-re-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest text-re-gray uppercase mb-2">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-re-accent transition-colors" />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold tracking-widest text-re-gray uppercase mb-4">Investment Horizon</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="horizon" className="accent-re-accent" />
                <span className="text-sm">Immediate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="horizon" className="accent-re-accent" />
                <span className="text-sm">3-6 Months</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="horizon" className="accent-re-accent" />
                <span className="text-sm">1 Year+</span>
              </label>
            </div>
          </div>

          <div className="mb-12">
            <label className="block text-xs font-bold tracking-widest text-re-gray uppercase mb-2">Message</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-re-accent transition-colors resize-none"></textarea>
          </div>

          <button className="w-full py-4 bg-re-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Request Consultation
          </button>
        </motion.form>
      </div>
    </div>
  );
}
