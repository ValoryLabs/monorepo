import { fileURLToPath } from 'node:url'
import { generateApi } from 'swagger-typescript-api'

async function generateBackendSwagger() {
  let tryCount = 0
  while (tryCount < 10) {
    try {
      await generateApi({
        fileName: 'backend-openapi.ts',
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
      console.log('✅ Backend API types generated successfully!')
      break
    } catch (error: any) {
      console.log(`❌ Attempt ${tryCount + 1} failed:`, error.message)
      tryCount++
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}

async function generateHenrikDevSwagger() {
  let tryCount = 0
  while (tryCount < 10) {
    try {
      await generateApi({
        fileName: 'henrikdev-openapi.ts',
        url: 'https://beta.api.henrikdev.xyz/openapi.json',
        output: fileURLToPath(new URL(`./`, import.meta.url)),
        generateClient: true,
        httpClientType: 'fetch',
        singleHttpClient: true,
        extractEnums: true,
        defaultResponseAsSuccess: true,
        patch: true,
        generateResponses: true,
      })
      console.log('✅ HenrikDev API types generated successfully!')
      break
    } catch (error: any) {
      console.log(`❌ Attempt ${tryCount + 1} failed:`, error.message)
      tryCount++
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}

await generateBackendSwagger()
await generateHenrikDevSwagger()
