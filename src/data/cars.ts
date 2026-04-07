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
    model: 'AMG G 63',
    year: 2026,
    hp: 577,
    price: '$210,000',
    status: 'Available',
    watermarkText: 'AMG',
    image: '/assets/cars/g63-amg.jpg',
    gallery: ['/assets/cars/g63-amg-gallery.jpg']
  },
  {
    id: 'bmw-m4',
    make: 'BMW',
    model: 'M4',
    year: 2026,
    hp: 503,
    price: '$90,000',
    status: 'Available',
    watermarkText: 'M4',
    image: '/assets/cars/bmw-m4.jpg',
    gallery: []
  },
  {
    id: 'maybach-s',
    make: 'Mercedes-Maybach',
    model: 'S-Class',
    year: 2026,
    hp: 496,
    price: '$205,000',
    status: 'Available',
    watermarkText: 'MAYBACH',
    image: '/assets/cars/maybach-s.jpg',
    gallery: []
  },
  {
    id: 'range-rover',
    make: 'Land Rover',
    model: 'Range Rover',
    year: 2026,
    hp: 523,
    price: '$145,000',
    status: 'Available',
    watermarkText: 'RANGE',
    image: '/assets/cars/range-rover.jpg',
    gallery: []
  }
];
