export interface Property {
  id: string;
  name: string;
  location: string;
  type: 'Villa' | 'Apartment' | 'Commercial';
  price: string;
  bedrooms: number;
  area: string;
  completionDate: string;
  watermarkText: string;
  image: string;
  gallery: string[];
}

export const properties: Property[] = [
  {
    id: 'plaza-one',
    name: 'Naseeb Commercial Plaza',
    location: 'Kampala Central',
    type: 'Commercial',
    price: '$5,000,000',
    bedrooms: 0,
    area: '15,000 sqft',
    completionDate: 'Completed',
    watermarkText: 'PLAZA',
    image: '/assets/realestate/naseeb.masembe_7618342743051390216.webp',
    gallery: [
      '/assets/realestate/naseeb.masembe_7618342743051390216.webp',
      '/assets/realestate/naseeb.masembe_7618342743051390216 (1).webp',
      '/assets/realestate/naseeb.masembe_7618342743051390216 (2).webp',
    ]
  },
  {
    id: 'mall-two',
    name: 'City Heights Mall',
    location: 'Kampala',
    type: 'Commercial',
    price: '$8,500,000',
    bedrooms: 0,
    area: '25,000 sqft',
    completionDate: 'Q3 2026',
    watermarkText: 'MALL',
    image: '/assets/realestate/naseeb.masembe_7618342743051390216 (3).webp',
    gallery: [
      '/assets/realestate/naseeb.masembe_7618342743051390216 (3).webp',
      '/assets/realestate/naseeb.masembe_7618342743051390216 (4).webp',
      '/assets/realestate/657848169_17952956025119167_7489451637527224063_n..jpg',
    ]
  }
];
