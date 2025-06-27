import { Spotify, Valorant } from '@/components/icons'
import { Bell, House, MessageSquare } from 'lucide-vue-next'

interface ConfiguratorLink {
  label: string
  link?: string
  color?: string
  description: string
  status?: 'process' | 'disabled' | 'release'
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
        description: 'Home configuration page',
        link: 'configurator-home',
        icon: House,
        color: '#4A90E2',
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.overlays',
    links: [
      {
        label: 'sidebar.navigation.links.valorant',
        description: 'Valorant overlay',
        link: 'configurator-valorant',
        icon: Valorant,
        color: '#F53A2D',
        status: 'release',
      },
      {
        label: 'sidebar.navigation.links.spotify',
        description: 'Spotify overlay',
        icon: Spotify,
        color: '#1DB954',
        disabled: true,
        status: 'process',
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.bots',
    links: [
      {
        label: 'sidebar.navigation.links.chat',
        description: 'Twitch Chat bot',
        icon: MessageSquare,
        color: '#FF6F61',
        disabled: true,
        status: 'process',
      },
      {
        label: 'sidebar.navigation.links.notification',
        description: 'Twitch Stream Notification',
        icon: Bell,
        color: '#FF9F00',
        disabled: true,
        status: 'process',
      },
    ],
  },
]
