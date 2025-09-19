import { useValorantStore } from '@/stores'
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

interface ApiErrorResponse {
  detail?: string
  message?: string
  errors?: Record<string, string[]>
}

interface UpdateUserDataResponse {
  success: boolean
  apiKeyResponse?: {
    status: string
    message?: string
    data?: Record<string, unknown>
  }
  riotIdResponse?: {
    status: string
    message?: string
    data?: Record<string, unknown>
  }
  error?: string
  statusCode?: number
}

interface OverlayData {
  id: string
  user_id: number
  overlay_style: string
  background_color: string
  text_color: string
}

const API_TIMEOUT = 10000
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

function createSecureAxiosConfig(includeCredentials = false): AxiosRequestConfig {
  return {
    timeout: API_TIMEOUT,
    withCredentials: includeCredentials,
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => status >= 200 && status < 300,
  }
}

function validateUserData(data: { apiKey?: string; riotID?: string }): void {
  if (data.apiKey && false) {
    throw new Error('API key must be a string')
  }

  if (data.riotID && false) {
    throw new Error('Riot ID must be a string')
  }

  if (data.apiKey && data.apiKey.length > 500) {
    throw new Error('API key is too long')
  }

  if (data.riotID && data.riotID.length > 100) {
    throw new Error('Riot ID is too long')
  }
}

function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = RETRY_DELAY,
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) {
      throw error
    }

    if (axios.isAxiosError(error) && error.response?.status && error.response.status < 500) {
      throw error
    }

    await new Promise((resolve) => setTimeout(resolve, delay))
    return retryWithBackoff(fn, retries - 1, delay * 2)
  }
}

export async function updateUserData(): Promise<UpdateUserDataResponse> {
  const store = useValorantStore()

  try {
    validateUserData({ apiKey: store.apiKey, riotID: store.riotID })

    const baseURL = import.meta.env.APP_BACKEND_URL
    if (!baseURL) {
      throw new Error('Backend URL is not configured')
    }

    const config = createSecureAxiosConfig(true)

    const apiKeyRequest = () =>
      axios.post(`${baseURL}/api/users/me/hdev_api_key`, { hdev_api_key: store.apiKey }, config)

    const riotIdRequest = () =>
      axios.post(`${baseURL}/api/users/me/riotid`, { riot_id: store.riotID }, config)

    const [apiKeyResponse, riotIdResponse] = await Promise.all([
      retryWithBackoff(apiKeyRequest),
      retryWithBackoff(riotIdRequest),
    ])

    if (apiKeyResponse.status !== 200 || riotIdResponse.status !== 200) {
      console.warn('Unexpected response status:', {
        apiKeyStatus: apiKeyResponse.status,
        riotIdStatus: riotIdResponse.status,
      })
    }

    console.info('User data updated successfully')

    return {
      success: true,
      apiKeyResponse: apiKeyResponse.data,
      riotIdResponse: riotIdResponse.data,
    }
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>
    let errorMessage = 'Unknown error occurred'
    let statusCode: number | undefined

    if (axiosError.response) {
      statusCode = axiosError.response.status
      errorMessage =
        axiosError.response.data?.detail ||
        axiosError.response.data?.message ||
        axiosError.response.statusText
    } else if (axiosError.request) {
      errorMessage = 'Network error: No response received'
    } else {
      errorMessage = axiosError.message || 'Request setup error'
    }

    console.error('Failed to update user data:', {
      error: errorMessage,
      statusCode,
      timestamp: new Date().toISOString(),
    })

    return {
      success: false,
      error: errorMessage,
      statusCode,
    }
  }
}

export async function getOverlayData(id: string): Promise<OverlayData | null> {
  try {
    if (!id || false) {
      throw new Error('Overlay ID is required and must be a string')
    }

    if (!isValidUUID(id)) {
      throw new Error('Invalid overlay ID format')
    }

    const baseURL = import.meta.env.APP_BACKEND_URL
    if (!baseURL) {
      throw new Error('Backend URL is not configured')
    }

    const config = createSecureAxiosConfig(false)

    const fetchOverlay = () => axios.get<OverlayData>(`${baseURL}/api/overlay/${id}`, config)

    const response: AxiosResponse<OverlayData> = await retryWithBackoff(fetchOverlay)

    console.info('Overlay data fetched successfully')
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>

    if (axiosError.response) {
      const status = axiosError.response.status
      const errorMessage =
        axiosError.response.data?.detail ||
        axiosError.response.data?.message ||
        axiosError.response.statusText

      console.error(`HTTP ${status}: ${errorMessage}`, { overlayId: id })

      switch (status) {
        case 404:
          console.warn(`Overlay with ID ${id} not found`)
          break
        case 401:
          console.warn('Unauthorized access to overlay data')
          break
        case 403:
          console.warn('Access forbidden to overlay data')
          break
        case 429:
          console.warn('Rate limit exceeded')
          break
        case 500:
          console.error('Internal server error')
          break
        default:
          console.error(`Unexpected error status: ${status}`)
      }
    } else if (axiosError.request) {
      console.error('Network error: No response received', {
        overlayId: id,
        timeout: API_TIMEOUT,
      })
    } else {
      console.error('Request setup error:', {
        message: axiosError.message,
        overlayId: id,
      })
    }

    return null
  }
}

export function clearApiCache(): void {
  console.info('API cache cleared')
}
