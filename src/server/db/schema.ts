import {
  boolean,
  index,
  integer,
  pgTableCreator,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `wdwe_${name}`);

export const food = createTable(
  'food',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    image: varchar('image', { length: 255 }).default(''),
    cheeseometer: integer('cheeseometer').default(0).notNull(),
    deliverable: boolean('deliverable').default(false).notNull(),
    tags: varchar('tags', { length: 255 }).default(''),
    effort: integer('effort').default(0).notNull(),
  },
  (item) => ({
    nameIndex: index('name_idx').on(item.name),
  }),
);

export const favorite = createTable(
  'favorite',
  {
    id: serial('id').primaryKey(),
    user: varchar('user', { length: 255 }).notNull(),
  },
  (item) => ({
    userIndex: index('favorite_user_idx').on(item.user),
  }),
);

export const analytics = createTable('analytics', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  date: varchar('date', { length: 255 }).notNull(),
  picked: boolean('picked').default(false),
});
