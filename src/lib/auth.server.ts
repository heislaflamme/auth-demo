import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '#/db/index.server';
import { sendPasswordResetEmail, sendVerificationEmail } from '#/serverFns/serverFn';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),

  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({url, user}) => {
      await sendPasswordResetEmail({data: {url: url, email: user.email, name: user.name}})
    }
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({url, user}) => {
      await sendVerificationEmail({data: {url: url, email: user.email, name: user.name}})
    }
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    }
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },

  plugins: [tanstackStartCookies()],
})
