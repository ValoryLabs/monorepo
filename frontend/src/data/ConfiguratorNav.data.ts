import { Riot, Spotify } from '@/components/icons'
import { Bell, House, MessageSquare } from 'lucide-vue-next'

interface ConfiguratorLink {
  label: string
  link?: string
  icon: any
  disabled?: boolean
}

interface ConfiguratorSection {
  title: string
  links: ConfiguratorLink[]
}

export const CONFIGURATOR_NAV_DATA: ConfiguratorSection[] = [
  {
    title: 'sidebar.navigation.title.start',
    links: [
      {
        label: 'sidebar.navigation.links.home',
        link: 'configurator-home',
        icon: House,
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.overlays',
    links: [
      {
        label: 'sidebar.navigation.links.valorant',
        link: 'configurator-valorant',
        icon: Riot,
      },
      {
        label: 'sidebar.navigation.links.spotify',
        icon: Spotify,
        disabled: true,
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.bots',
    links: [
      {
        label: 'sidebar.navigation.links.chat',
        icon: MessageSquare,
        disabled: true,
      },
      {
        label: 'sidebar.navigation.links.notification',
        icon: Bell,
        disabled: true,
      },
    ],
  },
]
