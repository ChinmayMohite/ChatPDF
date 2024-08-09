import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Define your tables here
export const userSystemEnum = pgEnum("userSystemEnum", ["user", "system"]);

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdfName").notNull(),
  pdfUrl: text("pdfURL").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  userId: varchar("userId", { length: 256 }).notNull(),
  fileKey: text("fileKey").notNull(),
});

export type DrizzleChat = typeof chats.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chatId")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  role: userSystemEnum("role").notNull(),
});
