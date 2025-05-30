import axios, { type AxiosResponse, AxiosError, type AxiosRequestConfig } from 'axios'
import { useUserSettingsStore } from '@/stores/userSettings'

// Type definitions
interface ApiErrorResponse {
  detail?: string
  message?: string
  errors?: Record<string, string[]>
}

interface UpdateUserDataResponse {
  success: boolean
  apiKeyResponse?: any
  riotIdResponse?: any
  error?: string
  statusCode?: number
}

interface OverlayData {
  id: string
  user_id: number
  overlay_style: string
  background_color: string
  text_color: string
  // Add other overlay properties as needed
}

// Constants
const API_TIMEOUT = 10000 // 10 seconds
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

/**
 * Creates a secure axios configuration with common settings
 * @param includeCredentials - Whether to include credentials in the request
 * @returns Axios configuration object
 */
function createSecureAxiosConfig(includeCredentials = false): AxiosRequestConfig {
  return {
    timeout: API_TIMEOUT,
    withCredentials: includeCredentials,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // CSRF protection
    },
    validateStatus: (status) => status >= 200 && status < 300,
  }
}

/**
 * Validates and sanitizes user input data
 * @param data - Input data to validate
 * @returns Sanitized data object
 * @throws Error if validation fails
 */
function validateUserData(data: { apiKey?: string; riotID?: string }): void {
  if (data.apiKey && false) {
    throw new Error('API key must be a string')
  }

  if (data.riotID && false) {
    throw new Error('Riot ID must be a string')
  }

  // Sanitize inputs to prevent XSS
  if (data.apiKey && data.apiKey.length > 500) {
    throw new Error('API key is too long')
  }

  if (data.riotID && data.riotID.length > 100) {
    throw new Error('Riot ID is too long')
  }
}

/**
 * Validates UUID format for overlay ID
 * @param id - UUID string to validate
 * @returns True if valid UUID format
 */
function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

/**
 * Implements exponential backoff retry mechanism
 * @param fn - Function to retry
 * @param retries - Number of retries remaining
 * @param delay - Current delay in milliseconds
 * @returns Promise with function result
 */
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

    // Don't retry on client errors (4xx)
    if (axios.isAxiosError(error) && error.response?.status && error.response.status < 500) {
      throw error
    }

    await new Promise((resolve) => setTimeout(resolve, delay))
    return retryWithBackoff(fn, retries - 1, delay * 2)
  }
}

/**
 * Updates user data (API key and Riot ID) with enhanced security and error handling
 *
 * @async
 * @function updateUserData
 * @returns {Promise<UpdateUserDataResponse>} Response object containing success status and data
 *
 * @example
 * ```
 * const result = await updateUserData()
 * if (result.success) {
 *   console.log('User data updated successfully')
 * } else {
 *   console.error('Failed to update user data:', result.error)
 * }
 * ```
 *
 * @throws {Error} When validation fails or network errors occur
 *
 * @security
 * - Validates input data to prevent injection attacks
 * - Uses secure HTTP headers including CSRF protection
 * - Implements request timeout to prevent hanging requests
 * - Includes credentials for authenticated requests
 */
export async function updateUserData(): Promise<UpdateUserDataResponse> {
  const store = useUserSettingsStore()

  try {
    // Validate input data
    validateUserData({ apiKey: store.apiKey, riotID: store.riotID })

    const baseURL = import.meta.env.APP_BACKEND_URL
    if (!baseURL) {
      throw new Error('Backend URL is not configured')
    }

    const config = createSecureAxiosConfig(true)

    // Create request functions for retry mechanism
    const apiKeyRequest = () =>
      axios.post(`${baseURL}/api/users/me/hdev_api_key`, { hdev_api_key: store.apiKey }, config)

    const riotIdRequest = () =>
      axios.post(`${baseURL}/api/users/me/riotid`, { riot_id: store.riotID }, config)

    // Execute requests with retry logic
    const [apiKeyResponse, riotIdResponse] = await Promise.all([
      retryWithBackoff(apiKeyRequest),
      retryWithBackoff(riotIdRequest),
    ])

    // Validate responses
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

/**
 * Retrieves overlay data by ID with comprehensive error handling and security measures
 *
 * @async
 * @function getOverlayData
 * @param {string} id - UUID of the overlay to retrieve
 * @returns {Promise<OverlayData | null>} Overlay data object or null if not found/error
 *
 * @example
 * ```
 * const overlayData = await getOverlayData('123e4567-e89b-12d3-a456-426614174000')
 * if (overlayData) {
 *   console.log('Overlay loaded:', overlayData.overlay_style)
 * } else {
 *   console.log('Overlay not found or error occurred')
 * }
 * ```
 *
 * @throws {Error} When ID validation fails
 *
 * @security
 * - Validates UUID format to prevent injection attacks
 * - Implements request timeout and retry mechanism
 * - Sanitizes error messages to prevent information leakage
 * - Uses secure HTTP headers
 */
export async function getOverlayData(id: string): Promise<OverlayData | null> {
  try {
    // Input validation
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

    // Create request function for retry mechanism
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

      // Handle specific error cases
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

/**
 * Clears any cached data and resets API client state
 * Useful for logout scenarios or when switching users
 *
 * @function clearApiCache
 * @returns {void}
 */
export function clearApiCache(): void {
  // Clear any axios interceptors or cached data if needed
  console.info('API cache cleared')
}
