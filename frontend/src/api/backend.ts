import axios from 'axios'
import { useUserSettingsStore } from '@/stores/userSettings'

export async function updateUserData() {
  const store = useUserSettingsStore()

  try {
    const apiKeyRequest = axios.post(
      `${import.meta.env.APP_BACKEND_URL}/api/users/me/hdev_api_key`,
      {
        hdev_api_key: store.apiKey,
      },
      {
        withCredentials: true,
      },
    )

    const riotIdRequest = axios.post(
      `${import.meta.env.APP_BACKEND_URL}/api/users/me/riotid`,
      {
        riot_id: store.riotID,
      },
      {
        withCredentials: true,
      },
    )

    const [apiKeyResponse, riotIdResponse] = await Promise.all([apiKeyRequest, riotIdRequest])

    if (apiKeyResponse.status !== 200 || riotIdResponse.status !== 200) {
      console.log('API Key not updated:', apiKeyResponse.data)
      console.log('Riot ID not updated:', riotIdResponse.data)
    }

    return {
      success: true,
      apiKeyResponse: apiKeyResponse.data,
      riotIdResponse: riotIdResponse.data,
    }
  } catch (error) {
    console.error('Error updating user data:', error)

    return {
      success: false,
      error: error.message,
    }
  }
}
