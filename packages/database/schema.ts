import { pgTable, text, integer, timestamp, serial } from "drizzle-orm/pg-core";

// Таблица пользователей
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  phone_number: text("phone_number"),
  avatar_url: text("avatar_url"),
  bio: text("bio"),
  locale: text("locale").default("en-US"),
  timezone: text("timezone").default("UTC"),
  is_active: integer("is_active").default(1).notNull(),
  is_verified: integer("is_verified").default(0).notNull(),
  role: text("role").default("user").notNull(),
  last_login: timestamp("last_login"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Таблица питомцев
export const petsTable = pgTable("pets", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  name: text("name").notNull(),
  species: text("species").notNull(),
  breed: text("breed"),
  age: integer("age"),
  weight: integer("weight"),
  gender: text("gender"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Таблица услуг
export const servicesTable = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Таблица специалистов
export const specialistsTable = pgTable("specialists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Таблица записей на услуги
export const appointmentsTable = pgTable("appointments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  pet_id: integer("pet_id")
    .notNull()
    .references(() => petsTable.id),
  service_id: integer("service_id")
    .notNull()
    .references(() => servicesTable.id),
  specialist_id: integer("specialist_id")
    .notNull()
    .references(() => specialistsTable.id),
  appointment_date: timestamp("appointment_date").notNull(),
  status: text("status").default("pending"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Таблица отзывов
export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  specialist_id: integer("specialist_id").references(() => specialistsTable.id),
  service_id: integer("service_id").references(() => servicesTable.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Таблица уведомлений
export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  message: text("message").notNull(),
  is_read: integer("is_read").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Таблица платежей
export const paymentsTable = pgTable("payments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  appointment_id: integer("appointment_id")
    .notNull()
    .references(() => appointmentsTable.id),
  amount: integer("amount").notNull(),
  status: text("status").default("pending"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
