import { Button } from '@/components/ui/button';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { db } from '@/lib/db';

export default async function Dashboard() {
  const foodList = await db.query.food.findMany();
  return (
    <>
      <div className="mb-4 ml-4 flex items-center gap-4">
        <Button className="bg-blue-500 px-4 py-2 text-white">
          Random Food
        </Button>
        <Button className="bg-blue-500 px-4 py-2 text-white">
          Filter Dialog
        </Button>
        <input
          aria-label="Search"
          className="rounded-md border-2 border-gray-200 px-2 py-1"
          placeholder="Search food..."
          type="search"
        />
      </div>
      <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {foodList.map((food) => (
          <Card className="col-span-full sm:col-span-1" key={food.id}>
            <CardContent className="flex flex-col items-center gap-2">
              <Image
                alt={food.name}
                src={food.image}
                width={564}
                height={564}
                loading="lazy"
                className="inset-0 h-64 w-full rounded-tl-lg rounded-tr-lg object-cover xl:h-48"
              />
              <CardHeader>
                <CardTitle>{food.name}</CardTitle>
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
        ))}
      </main>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
