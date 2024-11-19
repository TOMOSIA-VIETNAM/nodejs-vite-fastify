import envSchema from 'env-schema'
import { Type, Static } from '@sinclair/typebox'

const schema = Type.Object({
  NODE_ENV: Type.String({
    default: 'development',
    enum: ['development', 'production', 'test']
  }),
  PORT: Type.Number({
    default: 3000
  }),
  HOST: Type.String({
    default: '0.0.0.0'
  }),
  DATABASE_URL: Type.String(),
  JWT_SECRET: Type.String(),
  RATE_LIMIT: Type.Number({
    default: 100
  }),
  RATE_LIMIT_TIMEWINDOW: Type.Number({
    default: 60 * 1000 // 1 minute
  })
})

type Env = Static<typeof schema>

export const env = envSchema<Env>({
  schema,
  dotenv: true
})
