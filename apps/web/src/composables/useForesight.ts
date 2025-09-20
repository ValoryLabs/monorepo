import { ForesightManager } from 'js.foresight'
import { onUnmounted, ref } from 'vue'

export function useForesight() {
  const registeredElements = ref(new Set())

  const register = ({ element, callback, ...options }) => {
    if (!element) return

    const registration = ForesightManager.instance.register({
      element,
      callback,
      unregisterOnCallback: false,
      ...options,
    })

    registeredElements.value.add({ element, registration })
    return registration
  }

  const unregister = (element) => {
    for (const item of registeredElements.value) {
      if (item.element === element) {
        ForesightManager.instance.unregister(element)
        registeredElements.value.delete(item)
        break
      }
    }
  }

  onUnmounted(() => {
    registeredElements.value.forEach((item) => {
      ForesightManager.instance.unregister(item.element)
    })
    registeredElements.value.clear()
  })

  return { register, unregister }
}
