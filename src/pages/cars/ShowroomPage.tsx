import { cars } from '@/data/cars';
import ParallaxShowroom from '@/components/ParallaxShowroom';
import type { ShowroomItem } from '@/components/ParallaxShowroom';
import CarModalContent from '@/components/CarModalContent';

export default function ShowroomPage() {
  const items: ShowroomItem[] = cars.map(car => ({
    id: car.id,
    title: `${car.make} ${car.model}`,
    watermark: car.watermarkText,
    image: car.image,
    stats: [
      { label: 'Make', value: car.make },
      { label: 'Model', value: car.model },
      { label: 'Power', value: car.hp, suffix: ' HP' },
      { label: 'Price', value: car.price }
    ],
    detailComponent: <CarModalContent car={car} />
  }));

  return <ParallaxShowroom items={items} theme="auto" />;
}
