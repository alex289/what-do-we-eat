import { Ban, CircleCheck, Dumbbell, Star } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import DeleteFood from './deleteFood';
import Favorite from './Favorite';
import { UpsertFood } from './upsert-food';

import type { Favorite as FavoriteType, Food } from '@/server/db/types';

interface Props {
  food: Food;
  favorite: FavoriteType[] | undefined;
  emailAddresses: string[] | undefined;
  isAdmin: boolean;
}

export function FoodCard({ food, favorite, emailAddresses, isAdmin }: Props) {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden">
      <Image
        alt={food.name}
        className="w-full h-48 object-cover"
        src={food.image ?? '/static/food-placeholder.svg'}
        width={564}
        height={564}
        loading="lazy"
      />
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium truncate">
            <a
              className="hover:underline"
              href={`https://www.chefkoch.de/rs/s0/${food.name.replace(
                / /g,
                '+',
              )}/Rezepte.html`}
              target="_blank"
              rel="noreferrer noopener">
              {food.name}
            </a>
          </h3>
          <div className="flex items-center gap-1">
            <Star
              className={
                'w-5 h-5 ' +
                (food.cheeseometer >= 1
                  ? 'fill-primary'
                  : 'fill-muted stroke-muted-foreground')
              }
            />
            <Star
              className={
                'w-5 h-5 ' +
                (food.cheeseometer >= 2
                  ? 'fill-primary'
                  : 'fill-muted stroke-muted-foreground')
              }
            />
            <Star
              className={
                'w-5 h-5 ' +
                (food.cheeseometer >= 3
                  ? 'fill-primary'
                  : 'fill-muted stroke-muted-foreground')
              }
            />
            <Star
              className={
                'w-5 h-5 ' +
                (food.cheeseometer >= 4
                  ? 'fill-primary'
                  : 'fill-muted stroke-muted-foreground')
              }
            />
            <Star
              className={
                'w-5 h-5 ' +
                (food.cheeseometer >= 5
                  ? 'fill-primary'
                  : 'fill-muted stroke-muted-foreground')
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Deliverable
            </span>
            {food.deliverable ? (
              <CircleCheck className="w-5 h-5 fill-green-500" />
            ) : (
              <Ban className="w-5 h-5 fill-red-500" />
            )}
          </div>
          {food.tags !== '' &&
            food.tags !== '-' &&
            food.tags?.split(',').map((tag) => (
              <Badge className="px-2 py-1" variant="outline" key={tag}>
                {tag}
              </Badge>
            ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Favorite
              foodId={food.id}
              emailAddresses={emailAddresses}
              favorite={favorite}
            />
          </div>
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 fill-yellow-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {food.effort}
            </span>
          </div>
        </div>
        {isAdmin ? (
          <div className="flex items-center justify-between mt-4 pt-2">
            <UpsertFood existingFood={food} />
            <DeleteFood food={food} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
