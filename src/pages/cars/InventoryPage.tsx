import { motion, useScroll, useTransform } from 'motion/react';
import { cars as staticCars } from '../../data/cars';
import type { Car } from '../../data/cars';
import { useRef, useState } from 'react';
import { useFirestoreCollection } from '../../hooks/useFirestore';
import Modal from '../../components/Modal';
import CarModalContent from '../../components/CarModalContent';

export default function InventoryPage() {
  const { data: firestoreCars } = useFirestoreCollection<Car>('cars');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const cars = firestoreCars.length > 0 ? firestoreCars : staticCars;

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const filteredCars = cars.filter(car =>
    car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <div ref={pageRef} className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-auto-bg text-auto-text">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCar && <CarModalContent car={selectedCar} />}
      </Modal>

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

        {/* Updated grid with better spacing and vertical stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 pb-12">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-50 rounded-xl p-8 h-[450px] flex flex-col justify-between overflow-visible cursor-pointer transition-all duration-500 hover:shadow-2xl hover:bg-gray-100"
              onClick={() => handleCarClick(car)}
            >
              <div className="z-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight">{car.make}</h3>
                <p className="text-gray-500 font-medium text-lg">{car.model}</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
                <img 
                  src={car.image} 
                  alt={car.model} 
                  className="w-full max-h-[250px] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-8 drop-shadow-2xl"
                />
              </div>

              <div className="z-10 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Price</p>
                  <p className="font-mono text-xl font-bold text-auto-accent">{car.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Power</p>
                  <p className="font-mono text-xl font-bold">{car.hp} HP</p>
                </div>
              </div>
            </motion.div>
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
