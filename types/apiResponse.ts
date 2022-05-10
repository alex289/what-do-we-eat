import { food } from '@prisma/client';

export type ApiResponse = {
  status: string;
  data: food[];
};
