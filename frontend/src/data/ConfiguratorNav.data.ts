import { Spotify, Valorant } from '@/components/icons'
import { Bell, House, MessageSquare } from 'lucide-vue-next'

interface ConfiguratorLink {
  label: string
  link?: string
  color?: string
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
        color: '#4A90E2',
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.overlays',
    links: [
      {
        label: 'sidebar.navigation.links.valorant',
        link: 'configurator-valorant',
        icon: Valorant,
        color: '#F53A2D',
      },
      {
        label: 'sidebar.navigation.links.spotify',
        icon: Spotify,
        color: '#1DB954',
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
        color: '#FF6F61',
        disabled: true,
      },
      {
        label: 'sidebar.navigation.links.notification',
        icon: Bell,
        color: '#FF9F00',
        disabled: true,
      },
    ],
  },
]
