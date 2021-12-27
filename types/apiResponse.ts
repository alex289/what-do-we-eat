import { Food } from './food';

export type ApiResponse = {
  status: string;
  data: Food[];
};
