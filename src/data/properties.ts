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
}

export const properties: Property[] = [
  {
    id: 'nakasero-heights',
    name: 'The Nakasero Heights',
    location: 'Nakasero, Kampala',
    type: 'Apartment',
    price: '$450,000',
    bedrooms: 4,
    area: '3,200 sqft',
    completionDate: 'Q4 2025',
    watermarkText: 'NAKASERO',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'munyonyo-lakeview',
    name: 'Munyonyo Lakeview Villa',
    location: 'Munyonyo, Kampala',
    type: 'Villa',
    price: '$1,200,000',
    bedrooms: 6,
    area: '8,500 sqft',
    completionDate: 'Ready',
    watermarkText: 'MUNYONYO',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'kololo-mansions',
    name: 'Kololo Summit Mansions',
    location: 'Kololo, Kampala',
    type: 'Villa',
    price: '$2,500,000',
    bedrooms: 7,
    area: '12,000 sqft',
    completionDate: 'Q2 2026',
    watermarkText: 'KOLOLO',
    image: 'https://images.unsplash.com/photo-1600607687940-4e2303b9a7d1?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'bugolobi-terraces',
    name: 'Bugolobi Terraces',
    location: 'Bugolobi, Kampala',
    type: 'Apartment',
    price: '$350,000',
    bedrooms: 3,
    area: '2,800 sqft',
    completionDate: 'Ready',
    watermarkText: 'BUGOLOBI',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0bcd2a6c4?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'entebbe-marina',
    name: 'Entebbe Marina Residences',
    location: 'Entebbe',
    type: 'Villa',
    price: '$850,000',
    bedrooms: 5,
    area: '6,000 sqft',
    completionDate: 'Q1 2027',
    watermarkText: 'ENTEBBE',
    image: 'https://images.unsplash.com/photo-1600585154526-990dcea464dd?q=80&w=1000&auto=format&fit=crop',
  }
];
