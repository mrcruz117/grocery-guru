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
  await db.insert(ingredients).values(ingredientData);
}

async function seedUnits(db: DbType) {
  await db.insert(ingredientMeasureUnits).values(unitData);
}

async function seedRecipes(db: DbType) {
  await db.insert(recipes).values(recipeData);
}

async function seedRecipeIngredients(db: DbType) {
  await db.insert(recipeIngredients).values(recipeItems);
}

async function resetTable(db: DbType, table: Table) {
  console.log(`Resetting table ${getTableName(table)}`);

  const query = `TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`;
  console.log("query:", query);

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
}

await seed().catch(console.error);
