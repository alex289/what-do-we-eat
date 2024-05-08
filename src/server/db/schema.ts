import { sql } from 'drizzle-orm';
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
    id: integer('id')
      .default(sql`nextval('food_id_seq'::regclass)`)
      .primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    image: varchar('image', { length: 1000 }).default(''),
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
  id: integer('id')
    .default(sql`nextval('analytics_id_seq'::regclass)`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  picked: boolean('picked').default(false),
});
