// prisma style
// generator
// datasource
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { integer, json, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB


export const userRole = pgEnum("userRole", ["ADMIN", "USER"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRole("userRole").notNull().default("USER"),
  provider: text("provider"),
  providerId: text("providerId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  orders: many(orders),
  verificationCode: one(verificationCode),
  cart: one(cart)
}));

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
  categoryId: integer("categoryId").references(() => categories.id)
});

export const productsRelations = relations(products, ({ many, one }) => ({
  variants: many(productVariants),
  ingredients: many(ingredients),
  category: one(categories, { fields: [products.categoryId], references: [categories.id] })
}));

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products)
}));

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  products: many(products),
  cartItems: many(cartItem)
}));

export const productVariants = pgTable("productVariants", {
  id: serial("id").primaryKey(),
  price: integer("price").notNull(),
  size: integer("size"),
  pizzaType: integer("pizzaType"),
  productId: integer("productId").references(() => products.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(), 
});

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
  cartItems: many(cartItem)
}));

export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  totalPrice: integer("totalPrice").notNull().default(0),
  token: text("tokenId").notNull(),
  userId: integer("userId").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(users, { fields: [cart.userId], references: [users.id] }),
  cartItems: many(cartItem)
}));

export const cartItem = pgTable("cartItem", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull().default(1),
  cartId: integer("cartId").references(() => cart.id),
  productVariantId: integer("productVariantId").references(() => productVariants.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const cartItemRelations = relations(cartItem, ({ one, many }) => ({
  cart: one(cart, { fields: [cartItem.cartId], references: [cart.id] }),
  productVariant: one(productVariants, { fields: [cartItem.productVariantId], references: [productVariants.id] }),
  ingredients: many(ingredients)
}));

export const statusEnum = pgEnum("status", ["PENDING", "SUCCEEDED", "CANCELLED"]);
const date = new Date();
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  token: text("tokenId").notNull(),
  totalPrice: integer("totalPrice").notNull(),
  status: statusEnum("status").notNull(),
  paymentIntentId: text("paymentIntentId"),
  items: json("items"),
  fullname: text("fullname").notNull(),
  address: text("address").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  deliveryTime: text("deliveryTime").notNull().default((`${date.getHours() + 1} ${date.getMinutes()}`).toString()),
  comment: text("comment"),
  userId: integer("userId").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ).notNull().defaultNow(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] })
}));

export const verificationCode = pgTable("verificationCode", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  userId: integer("userId").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const verificationCodeRelations = relations(verificationCode, ({ one }) => ({
  user: one(users, { fields: [verificationCode.userId], references: [users.id] })
}));









export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof products.$inferInsert;
export type SelectPost = typeof products.$inferSelect;
