import { useUserSettingsStore } from '@/stores/userSettings';
import axios from 'axios';
import { storeToRefs } from 'pinia';

const userSettingsStore = useUserSettingsStore()
const { apiKey } = storeToRefs(userSettingsStore)

export const apiClient = axios.create({
  baseURL: 'https://api.henrikdev.xyz/valorant',
  timeout: 10000,
  headers: {
    accept: 'application/json',
  },
})

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  },
)

export default apiClient
