/**
 * @fileoverview API client configuration for Valorant API requests
 */

/**
 * @module apiClient
 */

import {useUserSettingsStore} from '@/stores/userSettings'
import axios from 'axios'
import {storeToRefs} from 'pinia'

/**
 * Instance of user settings store
 * @constant
 */
const userSettingsStore = useUserSettingsStore()

/**
 * API key extracted from user settings
 * @constant
 */
const { apiKey } = storeToRefs(userSettingsStore)

/**
 * Configured axios instance for API requests
 * @constant
 */
export const apiClient = axios.create({
  baseURL: 'https://beta.api.henrikdev.xyz/valorant',
  timeout: 10000,
  headers: {
    accept: 'application/json',
  },
})

/**
 * Request interceptor to inject API key into requests
 * @param {Object} config - Axios request configuration
 * @returns {Object} Modified request configuration
 */
apiClient.interceptors.request.use(
  (config) => {
    if (apiKey.value) {
      config.params = {
        ...config.params,
        api_key: apiKey.value,
      }
    } else {
      console.warn('API Key is not installed in Pinia!')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor to handle API errors
 * @param {Object} response - Axios response object
 * @param {Object} error - Error object if request fails
 * @returns {Object} Response data or rejected promise
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  },
)

export default apiClient
