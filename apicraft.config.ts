import { apicraft } from '@siberiacancode/apicraft'

export default apicraft([
  {
    input: Bun.env.OPENAPI_URL,
    output: 'generated/api',
    instance: {
      name: 'fetches',
      runtimeInstancePath: './src/lib/fetches.ts',
    },
    baseUrl: '/api',
    nameBy: 'path',
    plugins: ['tanstack'],
  },
])
