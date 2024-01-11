import {
  mysqlTable,
  primaryKey,
  unique,
  varchar,
  tinyint,
  index,
  int,
} from 'drizzle-orm/mysql-core';

export const analytics = mysqlTable(
  'analytics',
  {
    id: int('id', { unsigned: true }).autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    picked: tinyint('picked').notNull(),
  },
  (table) => {
    return {
      analyticsId: primaryKey({ columns: [table.id], name: 'analytics_id' }),
      analyticsIdKey: unique('analytics_id_key').on(table.id),
    };
  },
);

export const favorite = mysqlTable(
  'favorite',
  {
    id: int('id', { unsigned: true }).notNull(),
    user: varchar('user', { length: 191 }).notNull(),
  },
  (table) => {
    return {
      user: index('user').on(table.user),
      favoriteId: primaryKey({ columns: [table.id], name: 'favorite_id' }),
    };
  },
);

export const food = mysqlTable(
  'food',
  {
    id: int('id', { unsigned: true }).autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    image: varchar('image', { length: 1000 }).default('').notNull(),
    cheeseometer: int('cheeseometer', { unsigned: true }).notNull(),
    deliverable: tinyint('deliverable').notNull(),
    tags: varchar('tags', { length: 191 }),
    effort: int('effort', { unsigned: true }).notNull(),
  },
  (table) => {
    return {
      foodId: primaryKey({ columns: [table.id], name: 'food_id' }),
      foodIdKey: unique('food_id_key').on(table.id),
      foodNameKey: unique('food_name_key').on(table.name),
    };
  },
);
