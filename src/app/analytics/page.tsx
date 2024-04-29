import { db } from '@/server/db';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Analytics } from '@/server/db/types';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const items = await db.query.analytics.findMany();
  const uniqueAnalytics: Analytics[] = [];

  for (const currentAnalytics of items) {
    const existingAnalytics = uniqueAnalytics.find(
      (a) => a.name === currentAnalytics.name,
    );

    if (!existingAnalytics) {
      uniqueAnalytics.push(currentAnalytics);
    }
  }

  const data = uniqueAnalytics.map((item) => {
    return {
      name: item.name,
      picked: items.filter((v) => v.name === item.name && v.picked).length,
      notPicked: items.filter((v) => v.name === item.name && !v.picked).length,
    };
  });

  return (
    <div className="relative mx-auto max-w-5xl overflow-x-auto shadow-md sm:rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Food</TableHead>
            <TableHead>Picked</TableHead>
            <TableHead>Not picked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.picked}</TableCell>
                <TableCell>{item.notPicked}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              {data.reduce((acc, item) => acc + item.picked, 0)}
            </TableCell>
            <TableCell>
              {data.reduce((acc, item) => acc + item.notPicked, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
