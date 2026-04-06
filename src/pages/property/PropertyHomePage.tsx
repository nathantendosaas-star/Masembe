import { properties } from '@/data/properties';
import ParallaxShowroom from '@/components/ParallaxShowroom';
import type { ShowroomItem } from '@/components/ParallaxShowroom';
import PropertyModalContent from '@/components/PropertyModalContent';

export default function PropertyHomePage() {
  const items: ShowroomItem[] = properties.map(property => ({
    id: property.id,
    title: property.name,
    watermark: property.watermarkText,
    image: property.image,
    stats: [
      { label: 'Project', value: property.name },
      { label: 'Location', value: property.location },
      { label: 'Specs', value: `${property.bedrooms} Beds • ${property.area}` },
      { label: 'Status', value: property.completionDate }
    ],
    detailComponent: <PropertyModalContent property={property} />
  }));

  return <ParallaxShowroom items={items} theme="re" />;
}
