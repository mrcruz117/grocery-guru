import ingredientData from "./data/ingredients.json";
import unitData from "./data/ingredient_measure_units.json";
import recipeData from "./data/recipes.json";
import recipeItems from "./data/recipe_items.json";
import {
  ingredients,
  ingredientMeasureUnits,
  recipes,
  recipeIngredients,
} from "../schema";
import { type Table, getTableName, sql } from "drizzle-orm";
import { db, type DbType } from "../index";

import dotenv from "dotenv";
dotenv.config();

async function seedIngredients(db: DbType) {
  console.log("Seeding Ingredients...");
  await db.insert(ingredients).values(ingredientData);
}

async function seedUnits(db: DbType) {
  console.log("Seeding Units...");
  await db.insert(ingredientMeasureUnits).values(unitData);
}

async function seedRecipes(db: DbType) {
  console.log("Seeding Recipes...");
  await db.insert(recipes).values(recipeData);
}

async function seedRecipeIngredients(db: DbType) {
  console.log("Seeding Recipe Ingredients...");
  await db.insert(recipeIngredients).values(recipeItems);
}

async function resetTable(db: DbType, table: Table) {
  console.log(`Resetting table ${getTableName(table)}`);

  const query = `TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`;
  return db.execute(sql.raw(query));
}

async function seed() {
  for (const table of [
    ingredients,
    ingredientMeasureUnits,
    recipes,
    recipeIngredients,
  ]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seedIngredients(db);
  await seedUnits(db);
  await seedRecipes(db);
  await seedRecipeIngredients(db);
}

await seed().catch(console.error);
