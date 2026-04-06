import { motion, useScroll, useTransform } from 'motion/react';
import { cars } from '@/data/cars';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const filteredCars = cars.filter(car =>
    car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={pageRef} className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-auto-bg text-auto-text">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: yTitle }}
          className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12"
        >
          Inventory
        </motion.h1>

        <div className="mb-12">
          <input
            type="text"
            placeholder="Search by make or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 bg-transparent border-b border-auto-text/20 pb-2 focus:outline-none focus:border-auto-accent transition-colors text-auto-text placeholder-gray-500"
          />
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:mx-0 md:px-0">
          {filteredCars.map((car, index) => (
            <Link key={car.id} to={`/cars/inventory/${car.id}`} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-50 rounded-xl p-6 h-[400px] flex flex-col justify-between overflow-visible cursor-pointer transition-all duration-500 hover:shadow-2xl hover:bg-gray-100"
              >
                <div className="z-10">
                  <h3 className="text-xl font-bold uppercase">{car.make}</h3>
                  <p className="text-gray-500 font-medium">{car.model}</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img 
                    src={car.image} 
                    alt={car.model} 
                    className="w-[90%] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-5 drop-shadow-xl group-hover:drop-shadow-2xl"
                  />
                </div>

                <div className="z-10 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Price</p>
                    <p className="font-mono text-lg font-bold text-auto-accent">{car.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Power</p>
                    <p className="font-mono text-lg font-bold">{car.hp} HP</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg uppercase tracking-widest font-bold">No matching vehicles found.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-auto-accent font-bold uppercase tracking-widest text-sm hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
