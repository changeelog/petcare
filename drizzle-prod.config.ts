import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './server/db/migrations/production',
  schema: './server/db/schema',
  dialect: 'sqlite',
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL_PRODUCTION!,
  },
})
