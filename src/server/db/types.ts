import type { analytics, favorite, food } from './schema';

export type Food = typeof food.$inferSelect;
export type Favorite = typeof favorite.$inferSelect;
export type Analytics = typeof analytics.$inferSelect;
