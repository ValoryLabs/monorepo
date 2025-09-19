import { updateUserData } from '@/services/backend.ts'
import { useValorantStore } from '@/stores'
import type { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { apiClient } from '..'

interface ValidationResult {
  success: boolean
  message: string
}

interface ApiErrorDetail {
  message: string
  code: number
  details: string
}

interface RiotAccountData {
  puuid: string
  region: string
  account_level: number
  name: string
  tag: string
  card: string
  title: string
  platforms: string[]
  updated_at: string
}

interface RiotAccountResponse {
  status: number
  data?: RiotAccountData
  errors?: ApiErrorDetail[]
}

const PATTERNS = {
  riotId: /^[\p{L}\p{N}]+(?: [\p{L}\p{N}]+)*#[\p{L}\p{N}]{3,5}$/u,
  apiKey: /^HDEV-[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/i,
}

const ERROR_MESSAGES = {
  401: 'toasts.dataVerifying.invalidApiKey',
  404: 'toasts.dataVerifying.userNotFound',
  429: 'toasts.dataVerifying.rateLimit',
  default: 'toasts.dataVerifying.networkError',
}

export const UserValidator = {
  async validate(): Promise<ValidationResult> {
    const valorantStore = useValorantStore()
    const { riotID, apiKey, puuid, region } = storeToRefs(valorantStore)

    try {
      if (!PATTERNS.apiKey.test(apiKey.value)) {
        return {
          success: false,
          message: 'toasts.dataVerifying.validateApiKey.pattern',
        }
      }

      await this.checkApiKey()

      if (!PATTERNS.riotId.test(riotID.value)) {
        puuid.value = ''
        region.value = ''
        return {
          success: false,
          message: 'toasts.dataVerifying.validateRiotId.pattern',
        }
      }

      const accountData = await this.fetchAccountData(riotID.value)

      if (accountData?.puuid) {
        puuid.value = accountData.puuid
      } else {
        puuid.value = ''
      }

      if (accountData?.region) {
        region.value = accountData.region
      } else {
        region.value = ''
      }

      const result = await updateUserData()

      if (!result.success) {
        console.error('Error:', result.error)
      }

      return {
        success: true,
        message: 'toasts.dataVerifying.validationSuccess',
      }
    } catch (error) {
      return this.handleError(error as AxiosError)
    }
  },

  async checkApiKey(): Promise<void> {
    const response = await apiClient.get('/v1/version/eu')

    if (response.status !== 200) {
      throw new Error('Invalid API key')
    }
  },

  async fetchAccountData(riotId: string): Promise<RiotAccountData | null> {
    const [name, tag] = riotId.split('#')

    if (!name || !tag) {
      throw new Error('Invalid Riot ID format')
    }

    const response = await apiClient.get<RiotAccountResponse>(
      `/v2/account/${encodeURIComponent(name)}/${encodeURIComponent(tag)}?force=true`,
    )

    if (response.data.status !== 200 || !response.data.data) {
      throw new Error('User not found')
    }

    return response.data.data
  },

  handleError(error: AxiosError): ValidationResult {
    const statusCode = error.response?.status

    return {
      success: false,
      message: statusCode
        ? ERROR_MESSAGES[statusCode.toString() as keyof typeof ERROR_MESSAGES] ||
          ERROR_MESSAGES.default
        : ERROR_MESSAGES.default,
    }
  },
}
