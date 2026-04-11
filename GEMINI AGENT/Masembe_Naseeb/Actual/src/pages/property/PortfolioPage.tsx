import { motion, useScroll, useTransform } from 'motion/react';
import { properties as staticProperties } from '../../data/properties';
import type { Property } from '../../data/properties';
import { useRef, useState } from 'react';
import { useFirestoreCollection } from '../../hooks/useFirestore';
import Modal from '../../components/Modal';
import Slideshow from '../../components/Slideshow';
import PropertyModalContent from '../../components/PropertyModalContent';

// Helper to simulate fetching all images from the folder
const allNewReImages = [
  '/assets/new_re/IMG-20260408-WA0007.jpg',
  '/assets/new_re/IMG-20260408-WA0010.jpg',
  '/assets/new_re/IMG-20260408-WA0011.jpg',
  '/assets/new_re/IMG-20260408-WA0012.jpg',
  '/assets/new_re/IMG-20260408-WA0012(1).jpg',
  '/assets/new_re/IMG-20260408-WA0013.jpg',
  '/assets/new_re/IMG-20260408-WA0014.jpg',
  '/assets/new_re/IMG-20260408-WA0014(1).jpg',
  '/assets/new_re/IMG-20260408-WA0015.jpg',
  '/assets/new_re/IMG-20260408-WA0024.jpg',
  '/assets/new_re/IMG-20260408-WA0025.jpg',
  '/assets/new_re/IMG-20260408-WA0026.jpg'
];

export default function PortfolioPage() {
  const { data: firestoreProperties } = useFirestoreCollection<Property>('properties');
  
  const properties = firestoreProperties.length > 0 ? firestoreProperties : staticProperties;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<{ type: 'property', data: any } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (type: 'property', data: any) => {
    setSelectedItem({ type, data });
    setIsModalOpen(true);
  };

  return (
    <div ref={pageRef} className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-re-bg text-re-text">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedItem?.type === 'property' && <PropertyModalContent property={selectedItem.data} />}
      </Modal>

      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: yTitle }}
          className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12"
        >
          Portfolio
        </motion.h1>
        {/* Slideshow under hero */}
        <div className="my-12">
          <Slideshow delay={3500} />
        </div>

        <div className="mb-12">
          <input
            type="text"
            placeholder="Search portfolio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 bg-transparent border-b border-re-text/20 pb-2 focus:outline-none focus:border-re-accent transition-colors text-re-text placeholder-gray-500"
          />
        </div>

        {/* Real Estate Section */}
        {filteredProperties.length > 0 && (
          <>
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-re-accent">Real Estate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 pb-12 mb-16">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-[500px] overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => handleItemClick('property', property)}
                >
                  <div className="absolute inset-0 bg-black/40 md:bg-black/40 md:group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                  />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <div className="translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-re-accent text-sm font-bold tracking-widest uppercase mb-2">{property.location}</p>
                      <h3 className="text-2xl font-bold text-white mb-4">{property.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Portfolio Images */}
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-re-accent">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allNewReImages.map((src, index) => (
                    <motion.img
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        src={src}
                        alt={`Portfolio item ${index}`}
                        className="w-full h-48 object-cover rounded-sm"
                    />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
