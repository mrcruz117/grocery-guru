// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { number, string } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `g-g_${name}`);

export const recipes = createTable(
  "recipes",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    description: varchar("description", { length: 1024 }),

    // userId from Clerk
    // user_x7x7x7x7x7x7x7x7x7x7x7x7x7x
    created_by: varchar("created_by", { length: 64 }),
    private: boolean("private"),
  },
  // (example) => ({
  //   nameUnique: unique("name_unique").on(example.name),
  // }),
);

export const ingredients = createTable(
  "ingredients",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },

  // how to add an index
  // (example) => ({
  //   nameIndex: index("name_idx").on(example.name),
  // }),
);

export const ingredientMeasureUnits = createTable("ingredient_measure_units", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const recipeIngredients = createTable("recipe_items", {
  recipeId: integer("recipe_id").references(() => recipes.id),
  ingredientId: integer("ingredient_id").references(() => ingredients.id),
  amount: integer("amount"),
  unitType: integer("unit_type").references(() => ingredientMeasureUnits.id),
});
