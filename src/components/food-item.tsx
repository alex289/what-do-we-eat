import { StarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import type { food } from '@/lib/schema';
import Image from 'next/image';

export function FoodItem({ foodItem }: { foodItem: typeof food.$inferSelect }) {
  return (
    <Card
      className="col-span-full border dark:border-gray-700 dark:bg-gray-800 sm:col-span-1"
      key={foodItem.id}>
      <CardContent className="flex flex-col items-center gap-2 px-0">
        <Image
          alt={foodItem.name}
          src={foodItem.image}
          width={564}
          height={564}
          loading="lazy"
          className="inset-0 h-64 w-full rounded-tl-lg rounded-tr-lg object-cover xl:h-48"
        />
        <CardHeader>
          <CardTitle>
            <a
              className="hover:underline"
              href={`https://www.chefkoch.de/rs/s0/${foodItem.name.replace(
                / /g,
                '+',
              )}/Rezepte.html`}
              target="_blank"
              rel="noreferrer noopener">
              {foodItem.name}
            </a>
          </CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
          <StarIcon className="h-6 w-6" />
          <div className="flex flex-col">
            <Badge className="h-6 px-2 py-1">Deliverable</Badge>
            <Badge className="h-6 px-2 py-1">Effort: 7/10</Badge>
            <Badge className="h-6 px-2 py-1">Veggie</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
