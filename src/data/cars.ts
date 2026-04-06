export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  hp: number;
  price: string;
  status: 'Available' | 'Sold' | 'In Transit';
  watermarkText: string;
  image: string;
  gallery: string[];
}

export const cars: Car[] = [
  {
    id: 'g63-amg',
    make: 'Mercedes-Benz',
    model: 'G63 AMG',
    year: 2024,
    hp: 577,
    price: '$250,000',
    status: 'Available',
    watermarkText: 'G-CLASS',
    // Using a transparent PNG of a car for the floating effect
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1000&auto=format&fit=crop', 
    gallery: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621135802920-133df287f2a7?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: '911-gt3-rs',
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    hp: 518,
    price: '$223,800',
    status: 'Available',
    watermarkText: 'GT3 RS',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'range-rover',
    make: 'Land Rover',
    model: 'Range Rover',
    year: 2024,
    hp: 523,
    price: '$180,000',
    status: 'In Transit',
    watermarkText: 'RANGE',
    image: 'https://images.unsplash.com/photo-1606148664166-79684b397078?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'cullinan',
    make: 'Rolls-Royce',
    model: 'Cullinan',
    year: 2024,
    hp: 563,
    price: '$450,000',
    status: 'Available',
    watermarkText: 'CULLINAN',
    image: 'https://images.unsplash.com/photo-1638843048527-5755107d391f?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1631214524020-5e1839a3f971?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631214524020-5e1839a3f971?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631214524020-5e1839a3f971?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'urus',
    make: 'Lamborghini',
    model: 'Urus Performante',
    year: 2024,
    hp: 657,
    price: '$320,000',
    status: 'In Transit',
    watermarkText: 'URUS',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'sf90',
    make: 'Ferrari',
    model: 'SF90 Stradale',
    year: 2024,
    hp: 986,
    price: '$550,000',
    status: 'Available',
    watermarkText: 'SF90',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800&auto=format&fit=crop',
    ]
  }
];
