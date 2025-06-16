import { trackEvent, init } from '@aptabase/web'
import type { App } from 'vue'

export interface AptabaseOptions {
  appKey: string
  host?: string
}

export default {
  install(app: App, options: AptabaseOptions) {
    init(options.appKey, {
      host: options.host
    })

    app.config.globalProperties.$track = trackEvent

    app.provide('aptabase', {
      track: trackEvent
    })
  }
}
