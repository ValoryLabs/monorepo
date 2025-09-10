import { fileURLToPath } from 'node:url'
import { generateApi } from 'swagger-typescript-api'

async function generateSwagger() {
  let tryCount = 0
  while (tryCount < 10) {
    try {
      await generateApi({
        fileName: 'openapi.ts',
        url: 'https://api.valory.localhost/openapi.json',
        output: fileURLToPath(new URL(`./`, import.meta.url)),
        generateClient: true,
        httpClientType: 'fetch',
        singleHttpClient: true,
        extractEnums: true,
        defaultResponseAsSuccess: true,
        patch: true,
        generateResponses: true,
      })
      console.log('✅ API types generated successfully!')
      break
    } catch (error: any) {
      console.log(`❌ Attempt ${tryCount + 1} failed:`, error.message)
      tryCount++
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}

await generateSwagger()
