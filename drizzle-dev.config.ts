import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './server/db/migrations/development',
  schema: './server/db/schema',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL_DEVELOPMENT!,
  },
})
