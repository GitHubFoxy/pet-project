import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import { pgTable, serial, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const db = drizzle(sql);

// Enums
export const orderStatus = pgEnum('orderStatus', ['PENDING', 'SUCCEEDED', 'CANCELLED']);
export const userRole = pgEnum('userRole', ['USER', 'ADMIN']);

// User
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('fullName').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: userRole('role').default('USER').notNull(),
  verified: timestamp('verified'),
  provider: text('provider'),
  providerId: text('providerId'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  cart: one(cart),
  orders: many(orders),
  verificationCode: one(verificationCode),
}));

// Category
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Product
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('imageUrl').notNull(),
  categoryId: integer('categoryId').notNull().references(() => categories.id),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const productsRelations = relations(products, ({ many }) => ({
  ingredients: many(ingredients),
  items: many(productItems),
}));

// ProductItem
export const productItems = pgTable('productItems', {
  id: serial('id').primaryKey(),
  price: integer('price').notNull(),
  size: integer('size'),
  pizzaType: integer('pizzaType'),
  productId: integer('productId').notNull().references(() => products.id),
});

export const productItemsRelations = relations(productItems, ({ many }) => ({
  cartItems: many(cartItems),
}));

// Ingredient
export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  imageUrl: text('imageUrl').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  products: many(products),
  cartItems: many(cartItems),
}));

// Cart
export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: integer('userId').references(() => users.id).unique(),
  token: text('token').notNull(),
  totalAmount: integer('totalAmount').default(0).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const cartRelations = relations(cart, ({ many }) => ({
  items: many(cartItems),
}));

// CartItem
export const cartItems = pgTable('cartItems', {
  id: serial('id').primaryKey(),
  cartId: integer('cartId').notNull().references(() => cart.id),
  productItemId: integer('productItemId').notNull().references(() => productItems.id),
  quantity: integer('quantity').default(1).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const cartItemsRelations = relations(cartItems, ({ many }) => ({
  ingredients: many(ingredients),
}));

// Order
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('userId').references(() => users.id),
  token: text('token').notNull(),
  totalAmount: integer('totalAmount').notNull(),
  status: orderStatus('status').notNull(),
  paymentId: text('paymentId'),
  items: text('items').notNull(), // JSON stored as text
  fullName: text('fullName').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  comment: text('comment'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

// VerificationCode
export const verificationCode = pgTable('verificationCode', {
  id: serial('id').primaryKey(),
  userId: integer('userId').notNull().references(() => users.id).unique(),
  code: text('code').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// Story
export const stories = pgTable('stories', {
  id: serial('id').primaryKey(),
  previewImageUrl: text('previewImageUrl').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const storiesRelations = relations(stories, ({ many }) => ({
  items: many(storyItems),
}));

// StoryItem
export const storyItems = pgTable('storyItems', {
  id: serial('id').primaryKey(),
  storyId: integer('storyId').notNull().references(() => stories.id),
  sourceUrl: text('sourceUrl').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});